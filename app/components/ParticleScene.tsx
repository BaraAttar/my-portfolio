// components/ParticleScene.tsx
'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

const FluidBackground: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
        camera.position.z = 1;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        containerRef.current.appendChild(renderer.domElement);

        // 1. استخدام LoadingManager لضمان تحميل الصور قبل البدء
        const loadingManager = new THREE.LoadingManager();
        const textureLoader = new THREE.TextureLoader(loadingManager);

        const grainTex = textureLoader.load('/assets/texture/grain.webp');
        const blurTex = textureLoader.load('/assets/texture/blur.webp');

        [grainTex, blurTex].forEach(t => {
            t.minFilter = THREE.LinearFilter;
            t.magFilter = THREE.LinearFilter;
            t.wrapS = THREE.RepeatWrapping;
            t.wrapT = THREE.RepeatWrapping;
        });

        const vertexShader = `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `;

        const fragmentShader = `
            precision highp float;
            uniform sampler2D grainTex;
            uniform sampler2D blurTex;
            uniform float uTime;
            uniform float uSeed;
            uniform vec3 uBackColor;
            varying vec2 vUv;

            #define PI 3.141592653589793

            vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec3 permute(vec3 x) { return mod289(((x * 34.0) + 10.0) * x); }

            float snoise(vec2 v) {
                const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
                vec2 i = floor(v + dot(v, C.yy));
                vec2 x0 = v - i + dot(i, C.xx);
                vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
                vec4 x12 = x0.xyxy + C.xxzz;
                x12.xy -= i1;
                i = mod289(i);
                vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
                vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
                m = m * m; m = m * m;
                vec3 x = 2.0 * fract(p * C.www) - 1.0;
                vec3 h = abs(x) - 0.5;
                vec3 ox = floor(x + 0.5);
                vec3 a0 = x - ox;
                m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
                vec3 g;
                g.x = a0.x * x0.x + h.x * x0.y;
                g.yz = a0.yz * x12.xz + h.yz * x12.yw;
                return 130.0 * dot(m, g);
            }

            float noise2d(vec2 st) {
                return (1.0 + snoise(vec2(st.x + uTime * 0.02, st.y - uTime * 0.04 + uSeed))) * 0.5;
            }

            float pattern(vec2 p) {
                vec2 q = vec2(noise2d(p + vec2(0.0, 0.0)), noise2d(p + vec2(5.2, 1.3)));
                vec2 r = vec2(noise2d(p + 4.0 * q + vec2(1.7, 9.2)), noise2d(p + 4.0 * q + vec2(8.3, 2.8)));
                return noise2d(p + 1.0 * r);
            }

            void main() {
                vec2 uv = vUv;
                vec2 p = gl_FragCoord.xy;

                vec3 grainColor = texture2D(grainTex, mod(p * 5.0, 1024.0) / 1024.0).rgb;
                float blurAlpha = texture2D(blurTex, uv).a;

                float gr = pow(grainColor.r, 1.5) + 0.5 * (1.0 - blurAlpha);
                float gg = grainColor.g;

                float ax = 0.05 * gr * cos(gg * 2.0 * PI);
                float ay = 0.05 * gr * sin(gg * 2.0 * PI);

                float nx = uv.x * 0.2 + ax;
                float ny = uv.y * 0.2 + ay;
                float n = pattern(vec2(nx, ny));
                n = pow(n * 1.05, 6.0);
                n = smoothstep(0.0, 1.0, n);

                vec3 frontColor = vec3(0.5);
                vec3 result = mix(uBackColor, frontColor, n);

                gl_FragColor = vec4(result, blurAlpha);
            }
        `;

        // دالة لجلب اللون الابتدائي بناءً على الكلاس الموجود في body
        const getInitialColor = () => {
            if (typeof document !== 'undefined') {
                const isDark = document.body.classList.contains('body-dark');
                return new THREE.Color(isDark ? 0x0d0d0d : 0xe6e6e6);
            }
            return new THREE.Color(0xe6e6e6);
        };

        const shaderMaterial = new THREE.ShaderMaterial({
            uniforms: {
                grainTex: { value: grainTex },
                blurTex: { value: blurTex },
                uTime: { value: 0 },
                uSeed: { value: Math.random() * 100 },
                uBackColor: { value: getInitialColor() }
            },
            vertexShader,
            fragmentShader,
            transparent: true,
        });

        const geometry = new THREE.PlaneGeometry(4, 4);
        const mesh = new THREE.Mesh(geometry, shaderMaterial);
        mesh.position.set(-0.5, -0.2, 0);

        // اخفاء المش حتى يكتمل التحميل لمنع السواد
        mesh.visible = false;
        scene.add(mesh);

        const updateTheme = (immediate = false) => {
            const isDarkNow = document.body.classList.contains('body-dark');
            const target = {
                r: isDarkNow ? 0.05 : 0.9,
                g: isDarkNow ? 0.05 : 0.9,
                b: isDarkNow ? 0.05 : 0.9
            };

            if (immediate) {
                shaderMaterial.uniforms.uBackColor.value.setRGB(target.r, target.g, target.b);
            } else {
                gsap.to(shaderMaterial.uniforms.uBackColor.value, {
                    r: target.r,
                    g: target.g,
                    b: target.b,
                    duration: 1.6
                });
            }
        };

        // تفعيل المش فقط بعد تحميل الصور بالكامل
        loadingManager.onLoad = () => {
            mesh.visible = true;
            updateTheme(true);
        };

        const observer = new MutationObserver(() => updateTheme(false));
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

        let animationFrameId: number;
        const clock = new THREE.Clock();

        const animate = () => {
            shaderMaterial.uniforms.uTime.value = clock.getElapsedTime();
            renderer.render(scene, camera);
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        // مزامنة اللون بعد فترة بسيطة للتأكد من استقرار حالة الـ Layout
        setTimeout(() => updateTheme(true), 100);

        const handleResize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            const aspect = window.innerWidth / window.innerHeight;
            if (aspect >= 1) {
                camera.left = -aspect; camera.right = aspect;
                camera.top = 1; camera.bottom = -1;
            } else {
                camera.left = -1; camera.right = 1;
                camera.top = 1 / aspect; camera.bottom = -1 / aspect;
            }
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            observer.disconnect();
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            containerRef.current?.removeChild(renderer.domElement);
            geometry.dispose();
            shaderMaterial.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -1,
                pointerEvents: 'none'
            }}
        />
    );
};

export default FluidBackground;