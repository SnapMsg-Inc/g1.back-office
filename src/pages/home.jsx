import styles from '../styles/pages/home.module.css'

export default function Home() {
    return (
        <div className={styles.container}>
            <div>
                <p className={styles.title}>
                    <strong>
                        Welcome to Back Office
                    </strong>
                </p>
                <p className={styles.content}>
                    SnapMsg
                </p>
            </div>
        </div>
    )
}