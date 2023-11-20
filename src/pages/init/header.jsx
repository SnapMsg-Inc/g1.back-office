import styles from '../../styles/pages/header.module.css'
import ListButton from '../../utils/listButton';
import { useContext } from 'react';
import { AuthenticationContext } from '../../auth/context/authenticationContext';
import { Icon } from '@iconify/react';

const login = {
    "id": 1,
    "name": "Sign In",
    "path": "/sign-in"
}

const user = {
    "id": 2,
    "name": 'Init',
    "path": "/users"
}

export default function Header() {
    const { isAuthenticated } = useContext(AuthenticationContext)

    const ref = isAuthenticated ? "#" : "/"

    return (
        <div className={styles.container}>
            <a href={ref} className={styles.logo}>
                <div className={styles.logoIcon}>
                    <Icon icon={'ph:snapchat-logo-fill'} className={styles.icon}/>
                </div>
                <div className={styles.name}>
                    SnapMsg 
                </div>
            </a>
           <ul className={styles.headerList}>
                <ListButton key={isAuthenticated ? user.id : login.id} 
                            section={isAuthenticated ? user : login} />
            </ul>
        </div>
    )
} 