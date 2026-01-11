"use client";
import React, { useEffect, useState } from 'react';
import styles from './theme.module.css';

export default function Theme() {
    // Initialize without accessing localStorage directly to avoid hydration mismatch
    // We will sync in useEffect
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        // Safe client-side initialization
        const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        if (storedTheme) {
            if (storedTheme !== theme) setTheme(storedTheme);
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            if (theme !== 'dark') setTheme('dark');
        }
    }, []);

    useEffect(() => {
        const body = document.body;
        // Only update if changes are needed to avoid redundant operations
        if (!body.classList.contains(`body-${theme}`)) {
            body.classList.remove('body-light', 'body-dark');
            body.classList.add(`body-${theme}`);
            localStorage.setItem('theme', theme);
        }
    }, [theme]);

    const handleThemeChange = (newTheme: 'light' | 'dark') => {
        setTheme(newTheme);
    };

    return (
        <div className={styles.theme}>
            <div className={styles.theme_colors}>
                <label className={styles.theme_label}>
                    <div className={`${styles.theme_checkbox} ${theme === 'light' ? styles.active : ''}`}>
                        <input
                            type="checkbox"
                            checked={theme === 'light'}
                            onChange={() => handleThemeChange('light')}
                            className={styles.theme_input}
                        />
                    </div>
                    LIGHT
                </label>
                <label className={styles.theme_label}>
                    <div className={`${styles.theme_checkbox} ${theme === 'dark' ? styles.active : ''}`}>
                        <input
                            type="checkbox"
                            checked={theme === 'dark'}
                            onChange={() => handleThemeChange('dark')}
                            className={styles.theme_input}
                        />
                    </div>
                    DARK
                </label>
            </div>
        </div>
    );
}
