// LiquidEther component using Three.js from CDN
// Use this version if you're not using a bundler

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
            iterationsPoisson: options.iterationsPoisson || 32,
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
            color2: options.color2 || options.colors?.[2] || '#B19EEF',
            width: options.width || '100%',
            height: options.height || 600
        };

        // Check if THREE is available
        if (typeof THREE === 'undefined') {
            console.error('Three.js is not loaded. Please include Three.js before using LiquidEther.');
            return;
        }

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.mouse = new THREE.Vector2();
        this.mousePrev = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this.meshes = [];
        this.clock = new THREE.Clock();
        this.autoDemoTime = 0;
        this.isAutoDemoActive = false;
        this.animationId = null;

        this.init();
    }

    init() {
        // Set container dimensions
        const width = this.container.offsetWidth || parseInt(this.options.width) || window.innerWidth;
        const height = this.container.offsetHeight || parseInt(this.options.height) || 600;
        
        // Create scene
        this.scene = new THREE.Scene();
        this.scene.background = null; // Transparent background

        // Create camera
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        this.camera.position.z = 5;

        // Create renderer with mobile optimizations
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const pixelRatio = isMobile ? Math.min(window.devicePixelRatio, 2) : window.devicePixelRatio;
        
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: !isMobile, // Disable antialiasing on mobile for performance
            alpha: true,
            powerPreference: 'high-performance'
        });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(pixelRatio);
        this.container.appendChild(this.renderer.domElement);

        // Create liquid blobs
        this.createLiquidBlobs();

        // Setup mouse interaction
        this.setupMouseInteraction();

        // Setup auto demo
        if (this.options.autoDemo) {
            this.startAutoDemo();
        }

        // Handle resize
        this.handleResize = () => {
            const width = this.container.offsetWidth;
            const height = this.container.offsetHeight;
            
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);
        };
        window.addEventListener('resize', this.handleResize);

        // Start animation loop
        this.animate();
    }

    createLiquidBlobs() {
        const colors = [
            new THREE.Color(this.options.color0),
            new THREE.Color(this.options.color1),
            new THREE.Color(this.options.color2)
        ];

        // Reduce geometry complexity on mobile for better performance
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const geometryDetail = isMobile ? 32 : 64;
        const geometry = new THREE.IcosahedronGeometry(1, geometryDetail);
        
        colors.forEach((color, index) => {
            const material = new THREE.MeshStandardMaterial({
                color: color,
                metalness: 0.1,
                roughness: 0.2,
                transparent: true,
                opacity: 0.8
            });

            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(
                (index - 1) * 2.5,
                Math.sin(index) * 0.5,
                0
            );
            mesh.userData.originalPosition = mesh.position.clone();
            mesh.userData.velocity = new THREE.Vector3(
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02
            );
            mesh.userData.time = Math.random() * Math.PI * 2;

            this.scene.add(mesh);
            this.meshes.push(mesh);
        });

        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);

        const pointLight = new THREE.PointLight(0xffffff, 0.5);
        pointLight.position.set(-5, -5, 5);
        this.scene.add(pointLight);
    }

    setupMouseInteraction() {
        // Mouse events for desktop
        this.container.addEventListener('mousemove', (e) => {
            const rect = this.container.getBoundingClientRect();
            this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        });

        this.container.addEventListener('mouseleave', () => {
            this.mouse.set(0, 0);
            this.mousePrev.set(0, 0);
        });

        // Touch events for mobile
        this.container.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                const rect = this.container.getBoundingClientRect();
                this.mouse.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
                this.mouse.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
            }
        }, { passive: false });

        this.container.addEventListener('touchend', () => {
            this.mouse.set(0, 0);
            this.mousePrev.set(0, 0);
        });

        this.container.addEventListener('touchcancel', () => {
            this.mouse.set(0, 0);
            this.mousePrev.set(0, 0);
        });
    }

    applyMouseForce() {
        if (this.mouse.length() < 0.01) return;

        const force = this.options.mouseForce * 0.01;
        const cursorSize = this.options.cursorSize * 0.01;

        this.meshes.forEach((mesh) => {
            const worldPos = mesh.position.clone();
            const screenPos = worldPos.clone().project(this.camera);
            
            const distance = Math.sqrt(
                Math.pow(screenPos.x - this.mouse.x, 2) +
                Math.pow(screenPos.y - this.mouse.y, 2)
            );

            if (distance < cursorSize) {
                const influence = 1 - (distance / cursorSize);
                const direction = new THREE.Vector3(
                    (this.mouse.x - screenPos.x) * force * influence,
                    (this.mouse.y - screenPos.y) * force * influence,
                    0
                );
                
                mesh.userData.velocity.add(direction);
            }
        });
    }

    updateBlobs(deltaTime) {
        const viscous = this.options.isViscous ? this.options.viscous : 0;
        const iterations = this.options.isViscous ? this.options.iterationsViscous : 1;

        this.meshes.forEach((mesh, index) => {
            // Apply viscous damping
            if (viscous > 0) {
                mesh.userData.velocity.multiplyScalar(1 - (viscous * 0.001 * deltaTime));
            }

            // Update position
            mesh.position.add(mesh.userData.velocity.clone().multiplyScalar(deltaTime));

            // Apply bounce or wrap
            if (this.options.isBounce) {
                const bounds = 3;
                if (Math.abs(mesh.position.x) > bounds) {
                    mesh.userData.velocity.x *= -0.8;
                    mesh.position.x = Math.sign(mesh.position.x) * bounds;
                }
                if (Math.abs(mesh.position.y) > bounds) {
                    mesh.userData.velocity.y *= -0.8;
                    mesh.position.y = Math.sign(mesh.position.y) * bounds;
                }
            } else {
                // Wrap around
                if (Math.abs(mesh.position.x) > 4) mesh.position.x = -Math.sign(mesh.position.x) * 4;
                if (Math.abs(mesh.position.y) > 4) mesh.position.y = -Math.sign(mesh.position.y) * 4;
            }

            // Auto demo movement
            if (this.isAutoDemoActive) {
                mesh.userData.time += deltaTime * this.options.autoSpeed;
                const intensity = this.options.autoIntensity;
                const offset = new THREE.Vector3(
                    Math.sin(mesh.userData.time + index) * intensity,
                    Math.cos(mesh.userData.time * 0.7 + index) * intensity,
                    Math.sin(mesh.userData.time * 0.5 + index) * intensity * 0.5
                );
                mesh.userData.velocity.add(offset.multiplyScalar(deltaTime));
            }

            // Return to original position with spring
            const returnForce = mesh.userData.originalPosition.clone().sub(mesh.position).multiplyScalar(0.1);
            mesh.userData.velocity.add(returnForce.multiplyScalar(deltaTime));

            // Deform geometry for liquid effect
            const positions = mesh.geometry.attributes.position;
            const time = this.clock.getElapsedTime() + index;
            
            for (let i = 0; i < positions.count; i++) {
                const vertex = new THREE.Vector3().fromBufferAttribute(positions, i);
                const distance = vertex.length();
                const wave = Math.sin(time * 2 + distance * 2) * 0.1;
                const newDistance = distance + wave;
                vertex.normalize().multiplyScalar(newDistance);
                positions.setXYZ(i, vertex.x, vertex.y, vertex.z);
            }
            positions.needsUpdate = true;
            mesh.geometry.computeVertexNormals();
        });
    }

    startAutoDemo() {
        this.isAutoDemoActive = true;
        
        const cycle = () => {
            setTimeout(() => {
                this.isAutoDemoActive = false;
                setTimeout(() => {
                    this.isAutoDemoActive = true;
                    cycle();
                }, this.options.autoResumeDelay);
            }, this.options.autoRampDuration * 1000);
        };
        
        cycle();
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        
        const deltaTime = Math.min(this.clock.getDelta(), 0.1);
        
        // Apply mouse force
        this.applyMouseForce();
        
        // Update blobs
        this.updateBlobs(deltaTime);
        
        // Rotate camera slightly for dynamic view
        this.camera.position.x = Math.sin(this.clock.getElapsedTime() * 0.1) * 0.5;
        this.camera.position.y = Math.cos(this.clock.getElapsedTime() * 0.15) * 0.5;
        this.camera.lookAt(0, 0, 0);
        
        this.renderer.render(this.scene, this.camera);
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        window.removeEventListener('resize', this.handleResize);
        if (this.renderer) {
            this.container.removeChild(this.renderer.domElement);
            this.renderer.dispose();
        }
        this.meshes.forEach(mesh => {
            mesh.geometry.dispose();
            mesh.material.dispose();
        });
    }
}

// Export for use in modules or make available globally
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LiquidEther;
} else {
    window.LiquidEther = LiquidEther;
}

