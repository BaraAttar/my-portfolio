'use client';
import { useEffect, useMemo, useState } from 'react';
import styles from './header.module.css';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
    const pathname = usePathname();

    const [activeTab, setActiveTab] = useState('');

    const navItems = useMemo(() => [
        { href: 'me', text: 'Home' },
        { href: 'projects', text: 'Projects' },
        { href: 'info', text: 'Info' },
        { href: 'contact', text: 'Contact' },
    ], []);


    useEffect(() => {
        navItems.map((item) => {
            if (pathname.includes(item.href)) {
                setActiveTab(item.text)
            }
        })
    }, [pathname, navItems])

    return (
        <header className={styles.header} >
            <p className={styles.siteHeader_title}>Baraa Attar</p>
            <p className={styles.siteHeader_label}>Full Stack Developer</p>

            <nav className={styles.siteHeader_nav}>
                <ol>
                    {navItems.map((item) => {
                        return (
                            <li
                                key={item.href}
                                className={`${styles.navItem} ${activeTab === item.text ? styles.active : ''}`}
                            >
                                <Link
                                    href={`/${item.href}`}
                                    className={styles.link}
                                    onClick={() => setActiveTab(item.text)}
                                >
                                    {item.text}
                                </Link>
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </header>
    );
}