"use client"
import styles from './page.module.css';

export default function Page() {
    const infoSections = [
        {
            label: "BIOGRAPHY",
            content: "Software Engineer specialized in building scalable SaaS ecosystems. I bridge the gap between heavy backend logic and fluid user interfaces. Committed to SOLID principles and type safety."
        },
        {
            label: "EDUCATION",
            content: "Self-Taught Engineer focused on CS fundamentals, Algorithms, and System Design.\nHigh School Diploma: GHERNATA High School (Excellent Grade)."
        },
        {
            label: "LOCATION",
            content: "Based in Makkah, Saudi Arabia (KSA).\nAvailable for remote & on-site opportunities."
        },
        {
            label: "CURRENT STATUS",
            content: "Open for full-time positions and freelance collaborations."
        }
    ];

    return (
        <div className={styles.info_page}>
            <div className={styles.container}>
                <h1 className={styles.main_title}>ENGINEER PROFILE</h1>

                <div className={styles.grid}>
                    {infoSections.map((section, index) => (
                        <div key={index} className={styles.row}>
                            <span className={styles.label}>{section.label}</span>
                            <p className={styles.text}>{section.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}