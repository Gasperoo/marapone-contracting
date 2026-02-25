import { useEffect, useRef } from 'react';

import './Particles.css';

const defaultColors = ['#ffffff', '#ffffff', '#ffffff'];

const hexToRgb = hex => {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) {
        hex = hex
            .split('')
            .map(c => c + c)
            .join('');
    }
    const int = parseInt(hex, 16);
    const r = ((int >> 16) & 255) / 255;
    const g = ((int >> 8) & 255) / 255;
    const b = (int & 255) / 255;
    return [r, g, b];
};

const vertexSrc = `
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;

  uniform mat4 uProjectionMatrix;
  uniform mat4 uViewMatrix;
  uniform mat4 uModelMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;
  uniform float uSizeRandomness;

  varying vec4 vRandom;
  varying vec3 vColor;

  void main() {
    vRandom = random;
    vColor = color;

    vec3 pos = position * uSpread;
    pos.z *= 10.0;

    vec4 mPos = uModelMatrix * vec4(pos, 1.0);
    float t = uTime;
    mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
    mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
    mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);

    vec4 mvPos = uViewMatrix * mPos;

    if (uSizeRandomness == 0.0) {
      gl_PointSize = uBaseSize;
    } else {
      gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
    }

    gl_Position = uProjectionMatrix * mvPos;
  }
`;

const fragmentSrc = `
  precision highp float;

  uniform float uTime;
  uniform float uAlphaParticles;
  varying vec4 vRandom;
  varying vec3 vColor;

  void main() {
    vec2 uv = gl_PointCoord.xy;
    float d = length(uv - vec2(0.5));

    if(uAlphaParticles < 0.5) {
      if(d > 0.5) {
        discard;
      }
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), 1.0);
    } else {
      float circle = smoothstep(0.5, 0.4, d) * 0.8;
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), circle);
    }
  }
`;

/* ---- tiny math helpers (replace ogl's built-in mat4/vec3) ---- */

function mat4Identity() {
    return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
}

function mat4Perspective(fovRad, aspect, near, far) {
    const f = 1.0 / Math.tan(fovRad / 2);
    const nf = 1 / (near - far);
    const out = new Float32Array(16);
    out[0] = f / aspect;
    out[5] = f;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[14] = 2 * far * near * nf;
    return out;
}

function mat4LookAt(eye, center, up) {
    const zx = eye[0] - center[0], zy = eye[1] - center[1], zz = eye[2] - center[2];
    let len = 1 / Math.sqrt(zx * zx + zy * zy + zz * zz);
    const z0 = zx * len, z1 = zy * len, z2 = zz * len;
    const xx = up[1] * z2 - up[2] * z1, xy = up[2] * z0 - up[0] * z2, xz = up[0] * z1 - up[1] * z0;
    len = 1 / Math.sqrt(xx * xx + xy * xy + xz * xz);
    const x0 = xx * len, x1 = xy * len, x2 = xz * len;
    const y0 = z1 * x2 - z2 * x1, y1 = z2 * x0 - z0 * x2, y2 = z0 * x1 - z1 * x0;
    const out = new Float32Array(16);
    out[0] = x0; out[1] = y0; out[2] = z0;
    out[4] = x1; out[5] = y1; out[6] = z1;
    out[8] = x2; out[9] = y2; out[10] = z2;
    out[12] = -(x0 * eye[0] + x1 * eye[1] + x2 * eye[2]);
    out[13] = -(y0 * eye[0] + y1 * eye[1] + y2 * eye[2]);
    out[14] = -(z0 * eye[0] + z1 * eye[1] + z2 * eye[2]);
    out[15] = 1;
    return out;
}

function mat4FromRotation(rx, ry, rz) {
    const sx = Math.sin(rx), cx = Math.cos(rx);
    const sy = Math.sin(ry), cy = Math.cos(ry);
    const sz = Math.sin(rz), cz = Math.cos(rz);
    const out = new Float32Array(16);
    out[0] = cy * cz; out[1] = cx * sz + sx * sy * cz; out[2] = sx * sz - cx * sy * cz;
    out[4] = -cy * sz; out[5] = cx * cz - sx * sy * sz; out[6] = sx * cz + cx * sy * sz;
    out[8] = sy; out[9] = -sx * cy; out[10] = cx * cy;
    out[15] = 1;
    return out;
}

function createShader(gl, type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
}

function createProgram(gl, vs, fs) {
    const p = gl.createProgram();
    gl.attachShader(p, createShader(gl, gl.VERTEX_SHADER, vs));
    gl.attachShader(p, createShader(gl, gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(p);
    return p;
}

const Particles = ({
    particleCount = 200,
    particleSpread = 10,
    speed = 0.1,
    particleColors,
    moveParticlesOnHover = false,
    particleHoverFactor = 1,
    alphaParticles = false,
    particleBaseSize = 100,
    sizeRandomness = 1,
    cameraDistance = 20,
    disableRotation = false,
    pixelRatio = 1,
    className
}) => {
    const containerRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const canvas = document.createElement('canvas');
        container.appendChild(canvas);

        const gl = canvas.getContext('webgl', { alpha: true, depth: false });
        if (!gl) return;

        /* ---------- resize ---------- */
        let projMatrix = mat4Identity();
        const viewMatrix = mat4LookAt([0, 0, cameraDistance], [0, 0, 0], [0, 1, 0]);

        const resize = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            canvas.width = w * pixelRatio;
            canvas.height = h * pixelRatio;
            canvas.style.width = w + 'px';
            canvas.style.height = h + 'px';
            gl.viewport(0, 0, canvas.width, canvas.height);
            const fov = 15 * Math.PI / 180;
            projMatrix = mat4Perspective(fov, canvas.width / canvas.height, 0.1, 1000);
        };
        window.addEventListener('resize', resize);
        resize();

        /* ---------- mouse ---------- */
        const handleMouseMove = e => {
            const rect = container.getBoundingClientRect();
            mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouseRef.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        };
        if (moveParticlesOnHover) container.addEventListener('mousemove', handleMouseMove);

        /* ---------- geometry ---------- */
        const count = particleCount;
        const positions = new Float32Array(count * 3);
        const randoms = new Float32Array(count * 4);
        const colors = new Float32Array(count * 3);
        const palette = particleColors && particleColors.length > 0 ? particleColors : defaultColors;

        for (let i = 0; i < count; i++) {
            let x, y, z, len;
            do {
                x = Math.random() * 2 - 1;
                y = Math.random() * 2 - 1;
                z = Math.random() * 2 - 1;
                len = x * x + y * y + z * z;
            } while (len > 1 || len === 0);
            const r = Math.cbrt(Math.random());
            positions.set([x * r, y * r, z * r], i * 3);
            randoms.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);
            const col = hexToRgb(palette[Math.floor(Math.random() * palette.length)]);
            colors.set(col, i * 3);
        }

        /* ---------- GL program ---------- */
        const prog = createProgram(gl, vertexSrc, fragmentSrc);
        gl.useProgram(prog);

        const bindBuffer = (name, data, size) => {
            const buf = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buf);
            gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
            const loc = gl.getAttribLocation(prog, name);
            gl.enableVertexAttribArray(loc);
            gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
        };
        bindBuffer('position', positions, 3);
        bindBuffer('random', randoms, 4);
        bindBuffer('color', colors, 3);

        const uProj = gl.getUniformLocation(prog, 'uProjectionMatrix');
        const uView = gl.getUniformLocation(prog, 'uViewMatrix');
        const uModel = gl.getUniformLocation(prog, 'uModelMatrix');
        const uTime = gl.getUniformLocation(prog, 'uTime');
        const uSpread = gl.getUniformLocation(prog, 'uSpread');
        const uBaseSize = gl.getUniformLocation(prog, 'uBaseSize');
        const uSizeRand = gl.getUniformLocation(prog, 'uSizeRandomness');
        const uAlpha = gl.getUniformLocation(prog, 'uAlphaParticles');

        gl.uniform1f(uSpread, particleSpread);
        gl.uniform1f(uBaseSize, particleBaseSize * pixelRatio);
        gl.uniform1f(uSizeRand, sizeRandomness);
        gl.uniform1f(uAlpha, alphaParticles ? 1 : 0);

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        /* ---------- animation ---------- */
        let raf;
        let lastTime = performance.now();
        let elapsed = 0;
        let rx = 0, ry = 0, rz = 0;
        let mx = 0, my = 0;

        const update = t => {
            raf = requestAnimationFrame(update);
            const delta = t - lastTime;
            lastTime = t;
            elapsed += delta * speed;
            const time = elapsed * 0.001;

            if (moveParticlesOnHover) {
                mx = -mouseRef.current.x * particleHoverFactor;
                my = -mouseRef.current.y * particleHoverFactor;
            }

            if (!disableRotation) {
                rx = Math.sin(elapsed * 0.0002) * 0.1;
                ry = Math.cos(elapsed * 0.0005) * 0.15;
                rz += 0.01 * speed;
            }

            const modelMatrix = mat4FromRotation(rx, ry, rz);
            modelMatrix[12] = mx;
            modelMatrix[13] = my;

            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.useProgram(prog);
            gl.uniformMatrix4fv(uProj, false, projMatrix);
            gl.uniformMatrix4fv(uView, false, viewMatrix);
            gl.uniformMatrix4fv(uModel, false, modelMatrix);
            gl.uniform1f(uTime, time);

            gl.drawArrays(gl.POINTS, 0, count);
        };

        raf = requestAnimationFrame(update);

        return () => {
            window.removeEventListener('resize', resize);
            if (moveParticlesOnHover) container.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(raf);
            if (container.contains(canvas)) container.removeChild(canvas);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        particleCount,
        particleSpread,
        speed,
        moveParticlesOnHover,
        particleHoverFactor,
        alphaParticles,
        particleBaseSize,
        sizeRandomness,
        cameraDistance,
        disableRotation,
        pixelRatio
    ]);

    return <div ref={containerRef} className={`particles-container ${className || ''}`} />;
};

export default Particles;
