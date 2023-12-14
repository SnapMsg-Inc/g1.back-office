import { Icon } from '@iconify/react'
import styles from '../styles/pages/notFoundLogged.module.css'

export default function NotFoundLogged () {
    return (
        <div className={styles.container}>
            <div className={styles.home}>
                <p className={styles.title}>
                    <Icon icon={'ph:snapchat-logo-fill'} fontSize={60}/>
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