import styles from '../styles/pages/home.module.css'

export default function NotFound () {
    return (
        <div className={styles.container}>
            <div className={styles.home}>
                <p className={styles.title}>
                    <strong>
                        404 Error
                    </strong>
                </p>
                <p className={styles.content}>
                    Sorry, the page you're looking for could not be found.
                </p>
            </div>
        </div>
    )
}