import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';

function GlobeMesh() {
    const meshRef = useRef();

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.2; // Slow rotation
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            {/* Core Sphere */}
            <Sphere args={[1, 64, 64]} ref={meshRef}>
                <meshBasicMaterial
                    color="#0EA5E9"
                    wireframe
                    transparent
                    opacity={0.1}
                />
            </Sphere>

            {/* Outer Glow / Second Layer */}
            <Sphere args={[1.02, 64, 64]}>
                <meshBasicMaterial
                    color="#22d3ee"
                    wireframe
                    transparent
                    opacity={0.05}
                />
            </Sphere>

            {/* Particles / Dots */}
            <points>
                <sphereGeometry args={[1.05, 64, 64]} />
                <pointsMaterial
                    color="#fff"
                    size={0.015}
                    sizeAttenuation
                    transparent
                    opacity={0.4}
                />
            </points>
        </group>
    );
}

export default function InteractiveGlobe() {
    return (
        <div className="w-full h-full absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <GlobeMesh />
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                />
            </Canvas>
        </div>
    );
}
