// LiquidEther - WebGL Fluid Simulation
// Based on Pavel Dobryakov's WebGL Fluid Simulation
// Adapted for LiquidEther component API

(function() {
'use strict';

class LiquidEther {
    constructor(container, options = {}) {
        this.container = typeof container === 'string' ? document.querySelector(container) : container;
        this.options = {
            colors: options.colors || ['#5227FF', '#FF9FFC', '#B19EEF'],
            mouseForce: options.mouseForce || 20,
            cursorSize: options.cursorSize || 100,
            isViscous: options.isViscous !== undefined ? options.isViscous : true,
            viscous: options.viscous || 30,
            iterationsViscous: options.iterationsViscous || 32,
            iterationsPoisson: options.iterationsPoisson || 20,
            resolution: options.resolution || 0.5,
            isBounce: options.isBounce !== undefined ? options.isBounce : false,
            autoDemo: options.autoDemo !== undefined ? options.autoDemo : false,
            autoSpeed: options.autoSpeed || 0.5,
            autoIntensity: options.autoIntensity || 2.2,
            takeoverDuration: options.takeoverDuration || 0.25,
            autoResumeDelay: options.autoResumeDelay || 3000,
            autoRampDuration: options.autoRampDuration || 0.6,
            color0: options.color0 || options.colors?.[0] || '#5227FF',
            color1: options.color1 || options.colors?.[1] || '#FF9FFC',
            color2: options.color2 || options.colors?.[2] || '#B19EEF'
        };

        this.canvas = null;
        this.gl = null;
        this.ext = null;
        this.width = 0;
        this.height = 0;
        this.pointers = [];
        this.splatStack = [];
        this.autoDemoTime = 0;
        this.autoDemoActive = false;
        this.lastUpdateTime = Date.now();
        this.animationId = null;

        // Fluid simulation buffers
        this.dye = null;
        this.velocity = null;
        this.divergence = null;
        this.curl = null;
        this.pressure = null;

        // Shader programs
        this.programs = {};
        this.materials = {};

        this.init();
    }

    init() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.display = 'block';
        this.container.appendChild(this.canvas);

        const { gl, ext } = this.getWebGLContext(this.canvas);
        if (!gl || !ext) {
            console.error('WebGL not supported');
            return;
        }

        this.gl = gl;
        this.ext = ext;

        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.resizeCanvas();

        this.initShaders();
        this.initFramebuffers();
        this.setupInteraction();
        
        if (this.options.autoDemo) {
            this.startAutoDemo();
        }

        window.addEventListener('resize', () => this.handleResize());
        this.update();
    }

    getWebGLContext(canvas) {
        const params = { alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false };
        let gl = canvas.getContext('webgl2', params);
        const isWebGL2 = !!gl;
        if (!isWebGL2) {
            gl = canvas.getContext('webgl', params) || canvas.getContext('experimental-webgl', params);
        }

        if (!gl) return { gl: null, ext: null };

        let halfFloat;
        let supportLinearFiltering;
        if (isWebGL2) {
            gl.getExtension('EXT_color_buffer_float');
            supportLinearFiltering = gl.getExtension('OES_texture_float_linear');
        } else {
            halfFloat = gl.getExtension('OES_texture_half_float');
            supportLinearFiltering = gl.getExtension('OES_texture_half_float_linear');
        }

        gl.clearColor(0.0, 0.0, 0.0, 1.0);

        const halfFloatTexType = isWebGL2 ? gl.HALF_FLOAT : halfFloat.HALF_FLOAT_OES;
        let formatRGBA = this.getSupportedFormat(gl, isWebGL2 ? gl.RGBA16F : gl.RGBA, gl.RGBA, halfFloatTexType);
        let formatRG = this.getSupportedFormat(gl, isWebGL2 ? gl.RG16F : gl.RGBA, gl.RGBA, halfFloatTexType);
        let formatR = this.getSupportedFormat(gl, isWebGL2 ? gl.R16F : gl.RGBA, gl.RGBA, halfFloatTexType);

        return {
            gl,
            ext: {
                formatRGBA,
                formatRG,
                formatR,
                halfFloatTexType,
                supportLinearFiltering: !!supportLinearFiltering,
                isWebGL2
            }
        };
    }

    getSupportedFormat(gl, internalFormat, format, type) {
        if (!this.supportRenderTextureFormat(gl, internalFormat, format, type)) {
            switch (internalFormat) {
                case gl.R16F:
                    return this.getSupportedFormat(gl, gl.RG16F, gl.RG, type);
                case gl.RG16F:
                    return this.getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);
                default:
                    return null;
            }
        }
        return { internalFormat, format };
    }

    supportRenderTextureFormat(gl, internalFormat, format, type) {
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);

        const fbo = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

        const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
        return status === gl.FRAMEBUFFER_COMPLETE;
    }

    resizeCanvas() {
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for performance
        const containerWidth = this.container.offsetWidth;
        const containerHeight = this.container.offsetHeight;
        
        // Calculate actual pixel dimensions
        const newWidth = Math.floor(containerWidth * pixelRatio);
        const newHeight = Math.floor(containerHeight * pixelRatio);
        
        // Ensure minimum size
        let finalWidth = Math.max(newWidth, 256);
        let finalHeight = Math.max(newHeight, 256);
        
        // Cap maximum size for very large displays (4K+)
        const maxWidth = 3840; // 4K width
        const maxHeight = 2160; // 4K height
        if (finalWidth > maxWidth || finalHeight > maxHeight) {
            const scale = Math.min(maxWidth / finalWidth, maxHeight / finalHeight);
            finalWidth = Math.floor(finalWidth * scale);
            finalHeight = Math.floor(finalHeight * scale);
        }
        
        const sizeChanged = this.width !== finalWidth || this.height !== finalHeight;
        
        this.width = finalWidth;
        this.height = finalHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.width = containerWidth + 'px';
        this.canvas.style.height = containerHeight + 'px';
        
        return sizeChanged;
    }

    initShaders() {
        const gl = this.gl;
        
        // Base vertex shader
        const baseVertexShader = this.compileShader(gl.VERTEX_SHADER, `
            precision highp float;
            attribute vec2 aPosition;
            varying vec2 vUv;
            varying vec2 vL;
            varying vec2 vR;
            varying vec2 vT;
            varying vec2 vB;
            uniform vec2 texelSize;
            void main() {
                vUv = aPosition * 0.5 + 0.5;
                vL = vUv - vec2(texelSize.x, 0.0);
                vR = vUv + vec2(texelSize.x, 0.0);
                vT = vUv + vec2(0.0, texelSize.y);
                vB = vUv - vec2(0.0, texelSize.y);
                gl_Position = vec4(aPosition, 0.0, 1.0);
            }
        `);

        // Shader sources (simplified versions)
        const splatShader = this.compileShader(gl.FRAGMENT_SHADER, `
            precision highp float;
            precision highp sampler2D;
            varying vec2 vUv;
            uniform sampler2D uTarget;
            uniform float aspectRatio;
            uniform vec3 color;
            uniform vec2 point;
            uniform float radius;
            void main() {
                vec2 p = vUv - point.xy;
                p.x *= aspectRatio;
                vec3 splat = exp(-dot(p, p) / radius) * color;
                vec3 base = texture2D(uTarget, vUv).xyz;
                gl_FragColor = vec4(base + splat, 1.0);
            }
        `);

        const advectionShader = this.compileShader(gl.FRAGMENT_SHADER, `
            precision highp float;
            precision highp sampler2D;
            varying vec2 vUv;
            uniform sampler2D uVelocity;
            uniform sampler2D uSource;
            uniform vec2 texelSize;
            uniform float dt;
            uniform float dissipation;
            void main() {
                vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
                vec4 result = texture2D(uSource, coord);
                float decay = 1.0 + dissipation * dt;
                gl_FragColor = result / decay;
            }
        `);

        const divergenceShader = this.compileShader(gl.FRAGMENT_SHADER, `
            precision mediump float;
            precision mediump sampler2D;
            varying highp vec2 vUv;
            varying highp vec2 vL;
            varying highp vec2 vR;
            varying highp vec2 vT;
            varying highp vec2 vB;
            uniform sampler2D uVelocity;
            void main() {
                float L = texture2D(uVelocity, vL).x;
                float R = texture2D(uVelocity, vR).x;
                float T = texture2D(uVelocity, vT).y;
                float B = texture2D(uVelocity, vB).y;
                vec2 C = texture2D(uVelocity, vUv).xy;
                if (vL.x < 0.0) L = -C.x;
                if (vR.x > 1.0) R = -C.x;
                if (vT.y > 1.0) T = -C.y;
                if (vB.y < 0.0) B = -C.y;
                float div = 0.5 * (R - L + T - B);
                gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
            }
        `);

        const curlShader = this.compileShader(gl.FRAGMENT_SHADER, `
            precision mediump float;
            precision mediump sampler2D;
            varying highp vec2 vUv;
            varying highp vec2 vL;
            varying highp vec2 vR;
            varying highp vec2 vT;
            varying highp vec2 vB;
            uniform sampler2D uVelocity;
            void main() {
                float L = texture2D(uVelocity, vL).y;
                float R = texture2D(uVelocity, vR).y;
                float T = texture2D(uVelocity, vT).x;
                float B = texture2D(uVelocity, vB).x;
                float vorticity = R - L - T + B;
                gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
            }
        `);

        const vorticityShader = this.compileShader(gl.FRAGMENT_SHADER, `
            precision highp float;
            precision highp sampler2D;
            varying vec2 vUv;
            varying vec2 vL;
            varying vec2 vR;
            varying vec2 vT;
            varying vec2 vB;
            uniform sampler2D uVelocity;
            uniform sampler2D uCurl;
            uniform float curl;
            uniform float dt;
            void main() {
                float L = texture2D(uCurl, vL).x;
                float R = texture2D(uCurl, vR).x;
                float T = texture2D(uCurl, vT).x;
                float B = texture2D(uCurl, vB).x;
                float C = texture2D(uCurl, vUv).x;
                vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
                force /= length(force) + 0.0001;
                force *= curl * C;
                force.y *= -1.0;
                vec2 velocity = texture2D(uVelocity, vUv).xy;
                velocity += force * dt;
                velocity = min(max(velocity, -1000.0), 1000.0);
                gl_FragColor = vec4(velocity, 0.0, 1.0);
            }
        `);

        const pressureShader = this.compileShader(gl.FRAGMENT_SHADER, `
            precision mediump float;
            precision mediump sampler2D;
            varying highp vec2 vUv;
            varying highp vec2 vL;
            varying highp vec2 vR;
            varying highp vec2 vT;
            varying highp vec2 vB;
            uniform sampler2D uPressure;
            uniform sampler2D uDivergence;
            void main() {
                float L = texture2D(uPressure, vL).x;
                float R = texture2D(uPressure, vR).x;
                float T = texture2D(uPressure, vT).x;
                float B = texture2D(uPressure, vB).x;
                float divergence = texture2D(uDivergence, vUv).x;
                float pressure = (L + R + B + T - divergence) * 0.25;
                gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
            }
        `);

        const gradientSubtractShader = this.compileShader(gl.FRAGMENT_SHADER, `
            precision mediump float;
            precision mediump sampler2D;
            varying highp vec2 vUv;
            varying highp vec2 vL;
            varying highp vec2 vR;
            varying highp vec2 vT;
            varying highp vec2 vB;
            uniform sampler2D uPressure;
            uniform sampler2D uVelocity;
            void main() {
                float L = texture2D(uPressure, vL).x;
                float R = texture2D(uPressure, vR).x;
                float T = texture2D(uPressure, vT).x;
                float B = texture2D(uPressure, vB).x;
                vec2 velocity = texture2D(uVelocity, vUv).xy;
                velocity.xy -= vec2(R - L, T - B);
                gl_FragColor = vec4(velocity, 0.0, 1.0);
            }
        `);

        const displayShader = this.compileShader(gl.FRAGMENT_SHADER, `
            precision highp float;
            precision highp sampler2D;
            varying vec2 vUv;
            varying vec2 vL;
            varying vec2 vR;
            varying vec2 vT;
            varying vec2 vB;
            uniform sampler2D uTexture;
            uniform vec2 texelSize;
            void main() {
                vec3 c = texture2D(uTexture, vUv).rgb;
                vec3 lc = texture2D(uTexture, vL).rgb;
                vec3 rc = texture2D(uTexture, vR).rgb;
                vec3 tc = texture2D(uTexture, vT).rgb;
                vec3 bc = texture2D(uTexture, vB).rgb;
                float dx = length(rc) - length(lc);
                float dy = length(tc) - length(bc);
                vec3 n = normalize(vec3(dx, dy, length(texelSize)));
                vec3 l = vec3(0.0, 0.0, 1.0);
                float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
                c *= diffuse;
                float a = max(c.r, max(c.g, c.b));
                gl_FragColor = vec4(c, a);
            }
        `);

        // Create programs
        this.programs.splat = this.createProgram(baseVertexShader, splatShader);
        this.programs.advection = this.createProgram(baseVertexShader, advectionShader);
        this.programs.divergence = this.createProgram(baseVertexShader, divergenceShader);
        this.programs.curl = this.createProgram(baseVertexShader, curlShader);
        this.programs.vorticity = this.createProgram(baseVertexShader, vorticityShader);
        this.programs.pressure = this.createProgram(baseVertexShader, pressureShader);
        this.programs.gradientSubtract = this.createProgram(baseVertexShader, gradientSubtractShader);
        this.programs.display = this.createProgram(baseVertexShader, displayShader);

        // Setup quad
        this.setupQuad();
    }

    compileShader(type, source) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error('Shader compile error:', this.gl.getShaderInfoLog(shader));
            this.gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    createProgram(vertexShader, fragmentShader) {
        const program = this.gl.createProgram();
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);
        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            console.error('Program link error:', this.gl.getProgramInfoLog(program));
            this.gl.deleteProgram(program);
            return null;
        }
        return {
            program,
            uniforms: this.getUniforms(program)
        };
    }

    getUniforms(program) {
        const gl = this.gl;
        const uniforms = {};
        const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < uniformCount; i++) {
            const uniformName = gl.getActiveUniform(program, i).name;
            uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
        }
        return uniforms;
    }

    setupQuad() {
        const gl = this.gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(0);
    }

    blit(target, clear = false) {
        const gl = this.gl;
        if (target == null) {
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        } else {
            gl.viewport(0, 0, target.width, target.height);
            gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
        }
        if (clear) {
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);
        }
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    }

    createFBO(w, h, internalFormat, format, type, param) {
        const gl = this.gl;
        gl.activeTexture(gl.TEXTURE0);
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

        const fbo = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
        gl.viewport(0, 0, w, h);
        gl.clear(gl.COLOR_BUFFER_BIT);

        return {
            texture,
            fbo,
            width: w,
            height: h,
            texelSizeX: 1.0 / w,
            texelSizeY: 1.0 / h,
            attach(id) {
                gl.activeTexture(gl.TEXTURE0 + id);
                gl.bindTexture(gl.TEXTURE_2D, texture);
                return id;
            }
        };
    }

    createDoubleFBO(w, h, internalFormat, format, type, param) {
        const fbo1 = this.createFBO(w, h, internalFormat, format, type, param);
        const fbo2 = this.createFBO(w, h, internalFormat, format, type, param);
        return {
            width: w,
            height: h,
            texelSizeX: fbo1.texelSizeX,
            texelSizeY: fbo1.texelSizeY,
            get read() { return fbo1; },
            set read(value) { fbo1 = value; },
            get write() { return fbo2; },
            set write(value) { fbo2 = value; },
            swap() {
                const temp = fbo1;
                fbo1 = fbo2;
                fbo2 = temp;
            }
        };
    }

    getResolution(baseResolution) {
        const glWidth = this.gl.drawingBufferWidth;
        const glHeight = this.gl.drawingBufferHeight;
        const aspectRatio = glWidth / glHeight;
        
        // Scale resolution based on actual screen size
        // For 1080p (1920x1080), 1440p (2560x1440), 4K (3840x2160)
        // Scale base resolution proportionally
        const screenScale = Math.min(glWidth / 1920, glHeight / 1080, 2.0); // Cap scaling at 2x
        const scaledResolution = Math.round(baseResolution * screenScale);
        
        const min = Math.round(scaledResolution);
        const max = Math.round(scaledResolution * (aspectRatio < 1 ? 1.0 / aspectRatio : aspectRatio));
        
        if (glWidth > glHeight) {
            return { width: max, height: min };
        }
        return { width: min, height: max };
    }

    initFramebuffers() {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
        // Calculate base resolutions that scale with screen size
        // Simulation resolution: scales from 128 (1080p) to 256 (4K)
        const glWidth = this.gl.drawingBufferWidth;
        const glHeight = this.gl.drawingBufferHeight;
        const screenPixels = glWidth * glHeight;
        
        // Scale simulation resolution based on total pixels
        // 1080p: ~2M pixels -> 128 resolution
        // 1440p: ~3.7M pixels -> 160 resolution  
        // 4K: ~8.3M pixels -> 256 resolution
        const baseSimRes = isMobile ? 64 : 128;
        const simScale = Math.min(Math.sqrt(screenPixels / (1920 * 1080)), 2.0); // Cap at 2x
        const simRes = this.getResolution(Math.round(baseSimRes * simScale));
        
        // Dye resolution: scales with screen size and user option
        // Higher resolution for better visual quality on large displays
        const baseDyeRes = isMobile ? 256 : 512;
        const dyeScale = Math.min(Math.sqrt(screenPixels / (1920 * 1080)), 2.0);
        const dyeRes = this.getResolution(Math.round(baseDyeRes * dyeScale * this.options.resolution));
        
        // Cap maximum resolutions to prevent performance issues
        const maxSimRes = 512; // Cap simulation at 512
        const maxDyeRes = 2048; // Cap dye at 2048
        
        if (simRes.width > maxSimRes || simRes.height > maxSimRes) {
            const scale = Math.min(maxSimRes / simRes.width, maxSimRes / simRes.height);
            simRes.width = Math.floor(simRes.width * scale);
            simRes.height = Math.floor(simRes.height * scale);
        }
        
        if (dyeRes.width > maxDyeRes || dyeRes.height > maxDyeRes) {
            const scale = Math.min(maxDyeRes / dyeRes.width, maxDyeRes / dyeRes.height);
            dyeRes.width = Math.floor(dyeRes.width * scale);
            dyeRes.height = Math.floor(dyeRes.height * scale);
        }

        const texType = this.ext.halfFloatTexType;
        const rgba = this.ext.formatRGBA;
        const rg = this.ext.formatRG;
        const r = this.ext.formatR;
        const filtering = this.ext.supportLinearFiltering ? this.gl.LINEAR : this.gl.NEAREST;

        this.gl.disable(this.gl.BLEND);

        this.dye = this.createDoubleFBO(dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);
        this.velocity = this.createDoubleFBO(simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);
        this.divergence = this.createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, this.gl.NEAREST);
        this.curl = this.createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, this.gl.NEAREST);
        this.pressure = this.createDoubleFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, this.gl.NEAREST);
    }

    setupInteraction() {
        const updatePointer = (x, y, prevX, prevY) => {
            const rect = this.container.getBoundingClientRect();
            const pixelRatio = window.devicePixelRatio || 1;
            const texX = (x - rect.left) / rect.width;
            const texY = 1.0 - (y - rect.top) / rect.height;
            const prevTexX = (prevX - rect.left) / rect.width;
            const prevTexY = 1.0 - (prevY - rect.top) / rect.height;
            
            const dx = (texX - prevTexX) * this.width;
            const dy = (texY - prevTexY) * this.height;
            
            if (Math.abs(dx) > 0.001 || Math.abs(dy) > 0.001) {
                this.splat(texX, texY, dx * this.options.mouseForce * 0.01, dy * this.options.mouseForce * 0.01);
            }
        };

        let mouseX = 0, mouseY = 0, prevMouseX = 0, prevMouseY = 0;
        let mouseDown = false;

        this.container.addEventListener('mousedown', (e) => {
            mouseDown = true;
            mouseX = e.clientX;
            mouseY = e.clientY;
            prevMouseX = mouseX;
            prevMouseY = mouseY;
        });

        this.container.addEventListener('mousemove', (e) => {
            if (mouseDown) {
                prevMouseX = mouseX;
                prevMouseY = mouseY;
                mouseX = e.clientX;
                mouseY = e.clientY;
                updatePointer(mouseX, mouseY, prevMouseX, prevMouseY);
            }
        });

        this.container.addEventListener('mouseup', () => {
            mouseDown = false;
        });

        this.container.addEventListener('mouseleave', () => {
            mouseDown = false;
        });

        this.container.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (e.touches.length > 0) {
                mouseDown = true;
                mouseX = e.touches[0].clientX;
                mouseY = e.touches[0].clientY;
                prevMouseX = mouseX;
                prevMouseY = mouseY;
            }
        }, { passive: false });

        this.container.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (mouseDown && e.touches.length > 0) {
                prevMouseX = mouseX;
                prevMouseY = mouseY;
                mouseX = e.touches[0].clientX;
                mouseY = e.touches[0].clientY;
                updatePointer(mouseX, mouseY, prevMouseX, prevMouseY);
            }
        }, { passive: false });

        this.container.addEventListener('touchend', () => {
            mouseDown = false;
        });
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [
            parseInt(result[1], 16) / 255.0,
            parseInt(result[2], 16) / 255.0,
            parseInt(result[3], 16) / 255.0
        ] : [0.5, 0.5, 0.5];
    }

    splat(x, y, dx, dy) {
        const colors = [
            this.hexToRgb(this.options.color0),
            this.hexToRgb(this.options.color1),
            this.hexToRgb(this.options.color2)
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        const gl = this.gl;
        const program = this.programs.splat;
        gl.useProgram(program.program);
        
        gl.uniform1i(program.uniforms.uTarget, this.velocity.read.attach(0));
        gl.uniform1f(program.uniforms.aspectRatio, this.canvas.width / this.canvas.height);
        gl.uniform2f(program.uniforms.point, x, y);
        gl.uniform3f(program.uniforms.color, dx, dy, 0.0);
        gl.uniform1f(program.uniforms.radius, this.options.cursorSize / 100.0);
        this.blit(this.velocity.write);
        this.velocity.swap();

        gl.uniform1i(program.uniforms.uTarget, this.dye.read.attach(0));
        gl.uniform3f(program.uniforms.color, color[0] * 10.0, color[1] * 10.0, color[2] * 10.0);
        this.blit(this.dye.write);
        this.dye.swap();
    }

    step(dt) {
        const gl = this.gl;
        gl.disable(gl.BLEND);

        // Curl
        let program = this.programs.curl;
        gl.useProgram(program.program);
        gl.uniform2f(program.uniforms.texelSize, this.velocity.texelSizeX, this.velocity.texelSizeY);
        gl.uniform1i(program.uniforms.uVelocity, this.velocity.read.attach(0));
        this.blit(this.curl);

        // Vorticity
        program = this.programs.vorticity;
        gl.useProgram(program.program);
        gl.uniform2f(program.uniforms.texelSize, this.velocity.texelSizeX, this.velocity.texelSizeY);
        gl.uniform1i(program.uniforms.uVelocity, this.velocity.read.attach(0));
        gl.uniform1i(program.uniforms.uCurl, this.curl.attach(1));
        gl.uniform1f(program.uniforms.curl, this.options.viscous);
        gl.uniform1f(program.uniforms.dt, dt);
        this.blit(this.velocity.write);
        this.velocity.swap();

        // Divergence
        program = this.programs.divergence;
        gl.useProgram(program.program);
        gl.uniform2f(program.uniforms.texelSize, this.velocity.texelSizeX, this.velocity.texelSizeY);
        gl.uniform1i(program.uniforms.uVelocity, this.velocity.read.attach(0));
        this.blit(this.divergence);

        // Pressure solve
        program = this.programs.pressure;
        gl.useProgram(program.program);
        gl.uniform2f(program.uniforms.texelSize, this.velocity.texelSizeX, this.velocity.texelSizeY);
        gl.uniform1i(program.uniforms.uDivergence, this.divergence.attach(0));
        for (let i = 0; i < this.options.iterationsPoisson; i++) {
            gl.uniform1i(program.uniforms.uPressure, this.pressure.read.attach(1));
            this.blit(this.pressure.write);
            this.pressure.swap();
        }

        // Gradient subtract
        program = this.programs.gradientSubtract;
        gl.useProgram(program.program);
        gl.uniform2f(program.uniforms.texelSize, this.velocity.texelSizeX, this.velocity.texelSizeY);
        gl.uniform1i(program.uniforms.uPressure, this.pressure.read.attach(0));
        gl.uniform1i(program.uniforms.uVelocity, this.velocity.read.attach(1));
        this.blit(this.velocity.write);
        this.velocity.swap();

        // Advect velocity
        program = this.programs.advection;
        gl.useProgram(program.program);
        gl.uniform2f(program.uniforms.texelSize, this.velocity.texelSizeX, this.velocity.texelSizeY);
        const velocityId = this.velocity.read.attach(0);
        gl.uniform1i(program.uniforms.uVelocity, velocityId);
        gl.uniform1i(program.uniforms.uSource, velocityId);
        gl.uniform1f(program.uniforms.dt, dt);
        gl.uniform1f(program.uniforms.dissipation, this.options.isViscous ? this.options.viscous / 100.0 : 0.0);
        this.blit(this.velocity.write);
        this.velocity.swap();

        // Advect dye
        gl.uniform1i(program.uniforms.uVelocity, this.velocity.read.attach(0));
        gl.uniform1i(program.uniforms.uSource, this.dye.read.attach(1));
        gl.uniform1f(program.uniforms.dissipation, 0.98);
        this.blit(this.dye.write);
        this.dye.swap();
    }

    render() {
        const gl = this.gl;
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.enable(gl.BLEND);

        const program = this.programs.display;
        gl.useProgram(program.program);
        gl.uniform2f(program.uniforms.texelSize, 1.0 / this.width, 1.0 / this.height);
        gl.uniform1i(program.uniforms.uTexture, this.dye.read.attach(0));
        this.blit(null);
    }

    startAutoDemo() {
        this.autoDemoActive = true;
    }

    update() {
        this.animationId = requestAnimationFrame(() => this.update());
        
        const now = Date.now();
        const dt = Math.min((now - this.lastUpdateTime) / 1000, 0.016666);
        this.lastUpdateTime = now;

        // Check if canvas needs resizing
        const oldWidth = this.width;
        const oldHeight = this.height;
        this.resizeCanvas();
        
        // Reinitialize framebuffers if size changed
        if (oldWidth !== this.width || oldHeight !== this.height) {
            this.initFramebuffers();
        }

        // Auto demo
        if (this.autoDemoActive && this.options.autoDemo) {
            this.autoDemoTime += dt * this.options.autoSpeed;
            const intensity = this.options.autoIntensity;
            const x = 0.5 + Math.sin(this.autoDemoTime) * 0.3;
            const y = 0.5 + Math.cos(this.autoDemoTime * 0.7) * 0.3;
            const prevX = 0.5 + Math.sin(this.autoDemoTime - dt) * 0.3;
            const prevY = 0.5 + Math.cos((this.autoDemoTime - dt) * 0.7) * 0.3;
            const dx = (x - prevX) * this.width * intensity;
            const dy = (y - prevY) * this.height * intensity;
            this.splat(x, y, dx, dy);
        }

        this.step(dt);
        this.render();
    }

    handleResize() {
        const oldWidth = this.width;
        const oldHeight = this.height;
        this.resizeCanvas();
        
        // Only reinitialize framebuffers if size actually changed
        if (oldWidth !== this.width || oldHeight !== this.height) {
            this.initFramebuffers();
        }
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        window.removeEventListener('resize', this.handleResize);
        if (this.canvas && this.container) {
            this.container.removeChild(this.canvas);
        }
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LiquidEther;
} else {
    window.LiquidEther = LiquidEther;
}

})();
