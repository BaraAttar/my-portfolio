'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            lerp: 0.1,
            wheelMultiplier: 1,
            touchMultiplier: 2, // زيادة الحساسية للمس في الجوال
            infinite: false,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // لتصحيح المشاكل في سفاري عند تغيير حجم النافذة أو تدوير الهاتف
        const resizeObserver = new ResizeObserver(() => {
            lenis.resize();
        });
        resizeObserver.observe(document.body);

        return () => {
            lenis.destroy();
            resizeObserver.disconnect();
        };
    }, []);

    return null;
}