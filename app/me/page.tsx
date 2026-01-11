import styles from './page.module.css';

export default function page() {
    return (
        <div className={`page_content ${styles.home}`}>
            <div className={styles.home_aboutme}>
                <span>Born in 1999,</span>
                <span>based in Makkah, KSA.</span>
                <span>I believe full-stack</span>
                <span>development is the perfect</span>
                <span>balance between logic</span>
                <span>and human experience.</span>
                <span>With a mission to build</span>
                <span>scalable and impactful</span>
                <span>digital ecosystems,</span>
                <span>I am exploring the future</span>
                <span>of the web through</span>
                <span>experiments and thoughts.</span>
            </div>
        </div>
    )
}
