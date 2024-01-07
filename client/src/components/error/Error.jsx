import styles from "./error.module.scss"

export const Error = () => {
    return (
    <div className={styles.error__container}>
        <h1>Error 404. Page not found.</h1>
        <div className={styles.error_image}></div>
    </div>
    )
}
