import Link from 'next/link';
import styles from './page.module.css';

export default function Page() {
    return (
        <div className={styles.contact_page}>
            <div className={styles.content}>
                <p className={styles.subtitle}>HAVE A PROJECT IN MIND?</p>

                {/* الإيميل الكبير */}
                <Link href="mailto:Barraatar@gmail.com" className={styles.email_link}>
                    Barraatar@gmail.com
                </Link>

                <div className={styles.footer_grid}>
                    <div className={styles.social_group}>
                        <span className={styles.label}>SOCIALS</span>
                        <div className={styles.links}>
                            <Link href="https://linkedin.com/in/baraattar" target="_blank" className={styles.link}>LinkedIn ↗</Link>
                            <Link href="https://github.com/BaraAttar" target="_blank" className={styles.link}>GitHub ↗</Link>
                        </div>
                    </div>

                    <div className={styles.social_group}>
                        <span className={styles.label}>PHONE</span>
                        <div className={styles.links}>
                            <span className={styles.plain_text}>+966 535 173 493</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}