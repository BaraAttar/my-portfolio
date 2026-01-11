'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll() {
    useEffect(() => {
        // 1. إعداد Lenis
        const lenis = new Lenis({
            duration: 1,   // مدة السكرول (بالثواني)
            lerp: 0.1,       // قوة التخفيف (0.1 تعني سلاسة عالية)
            wheelMultiplier: 1, // سرعة السكرول
            gestureOrientation: 'vertical', // اتجاه السكرول
            smoothWheel: true,
        });

        // 2. ربط الـ RequestAnimationFrame بـ Lenis
        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // 3. تنظيف (Cleanup) عند إغلاق المكون
        return () => {
            lenis.destroy();
        };
    }, []);

    return null; // المكون لا يحتاج لرسم أي شيء على الشاشة
}