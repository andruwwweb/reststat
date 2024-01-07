import styles from './preloader.module.scss'
export const Preloader = () => {
    return (
        <div className={styles.preloader__container}>
            <div className={styles.preloader}>
                <div className={styles.preloader__center}></div>
            </div>
        </div>
    )
}
