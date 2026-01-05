// components/ParticleScene.tsx
'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ParticleScene: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            35,
            window.innerWidth / window.innerHeight,
            0.1,
            2000
        );
        camera.position.set(0, 350, 450);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);

        // زيادة الكثافة لإعطاء مظهر رملي ناعم
        const amountX = 450;
        const amountZ = 450;
        const separation = 4.0;
        const numParticles = amountX * amountZ;
        const positions = new Float32Array(numParticles * 3);

        for (let i = 0; i < amountX; i++) {
            for (let j = 0; j < amountZ; j++) {
                const index = (i * amountZ + j) * 3;
                positions[index] = i * separation - (amountX * separation) / 2;
                positions[index + 1] = 0;
                positions[index + 2] = j * separation - (amountZ * separation) / 2;
            }
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        // الشيدر مع تأثير التدرج في الشفافية (Gradient Visibility)
        const vertexShader = `
            uniform float uTime;
            varying float vAlpha; // نمرر قيمة الشفافية للـ Fragment Shader
            
            void main() {
                vec3 pos = position;
                
                // ويف قوي وبطيء جداً
                float wave1 = sin(pos.x * 0.012 + uTime * 0.3) * 55.0;
                float wave2 = cos(pos.z * 0.012 + uTime * 0.2) * 55.0;
                pos.y = wave1 + wave2;

                // حساب التدرج:
                // القمم (Peaks) عند abs(pos.y) تقريباً 100.
                // نريدها تبدأ بالظهور من ارتفاع 10 وتصل لكامل قوتها عند 70.
                // الـ smoothstep هنا سيخلق تدرج ناعم جداً (Gradient)
                vAlpha = smoothstep(10.0, 75.0, abs(pos.y));

                vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                
                // حجم حبات الرمل يتأثر بالبعد ليعطي عمقاً
                gl_PointSize = 2.8 * (1000.0 / -mvPosition.z); 
                gl_Position = projectionMatrix * mvPosition;
            }
        `;

        const fragmentShader = `
            varying float vAlpha;
            void main() {
                // جعل النقطة دائرية (حبات الرمل)
                float r = distance(gl_PointCoord, vec2(0.5));
                if (r > 0.5) discard;

                // استخدام vAlpha لعمل التدرج المطلوب
                // نضرب في 0.6 لتقليل الحدة الكلية للون الأسود
                gl_FragColor = vec4(0.0, 0.0, 0.0, vAlpha * 0.6);
            }
        `;

        const shaderMaterial = new THREE.ShaderMaterial({
            uniforms: { uTime: { value: 0 } },
            vertexShader,
            fragmentShader,
            transparent: true,
            depthWrite: false,
            blending: THREE.NormalBlending,
        });

        const particles = new THREE.Points(geometry, shaderMaterial);
        scene.add(particles);

        let animationFrameId: number;
        const clock = new THREE.Clock();

        const animate = () => {
            shaderMaterial.uniforms.uTime.value = clock.getElapsedTime();
            renderer.render(scene, camera);
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            if (containerRef.current) containerRef.current.removeChild(renderer.domElement);
            geometry.dispose();
            shaderMaterial.dispose();
        };
    }, []);

    return <div ref={containerRef} id="canvas-container" />;
};

export default ParticleScene;