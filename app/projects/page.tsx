import Link from 'next/link';
import styles from './page.module.css';

export default function Page() {
    const projects = [
        {
            title: "COUPONATI",
            subtitle: "Enterprise Full-Stack Ecosystem",
            parts: [
                {
                    domain: "BACKEND CORE",
                    // رابط خاص بهذا الجزء (مثلاً رابط الريبو أو التوثيق)
                    url: "https://github.com/BaraAttar/couponati-api",
                    desc: "Scalable RESTful API • Node.js & TS • Modular Arch • Secure Auth (JWT) • Redis Caching.",
                    tags: ["Node.js", "Express", "MongoDB", "Docker"]
                },
                {
                    domain: "WEB DASHBOARD",
                    // رابط لوحة التحكم
                    url: "https://github.com/BaraAttar/couponati-dashboard",
                    desc: "Admin Panel • Next.js 14 • RBAC Control • High Performance • Zustand State Manager.",
                    tags: ["Next.js", "Shadcn UI", "Tailwind", "Typescript"]
                },
                {
                    domain: "MOBILE APP",
                    // رابط التطبيق
                    url: "https://github.com/BaraAttar/Couponati",
                    desc: "Cross-Platform • MVVM Pattern • Localization (Ar/En) • Offline Storage • Optimized UX.",
                    tags: ["Flutter", "Dart", "Provider", "iOS/Android"]
                }
            ]
        }
    ];

    return (
        <div className={styles.projects_page}>
            <div className={styles.container}>
                {projects.map((project, index) => (
                    <div key={index} className={styles.project_wrapper}>

                        {/* العنوان الرئيسي (بدون رابط حسب طلبك، أو يمكنك إبقاؤه) */}
                        <div className={styles.header}>
                            <h1 className={styles.title}>{project.title}</h1>
                            <span className={styles.subtitle}>{project.subtitle}</span>
                        </div>

                        {/* الأقسام - هنا أضفنا الروابط */}
                        <div className={styles.grid}>
                            {project.parts.map((part, i) => (
                                <div key={i} className={styles.card}>

                                    {/* جعلنا العنوان الفرعي رابطاً قابلاً للنقر */}
                                    <Link href={part.url} target="_blank" className={styles.part_link}>
                                        <h3 className={styles.card_title}>
                                            {part.domain}
                                            <span className={styles.card_icon}>↗</span>
                                        </h3>
                                    </Link>

                                    <p className={styles.card_desc}>{part.desc}</p>

                                    <div className={styles.tags}>
                                        {part.tags.map((t, tIndex) => (
                                            <span key={tIndex} className={styles.tag}>{t}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}