import styles from '../styles/pages/header.module.css'
import ListButton from '../utils/listButton';
import logo from '../logo.svg'
import { useContext } from 'react';
import { AuthenticationContext } from '../auth/context/authenticationContext';

const login = {
    "id": 1,
    "name": "Sign In",
    "path": "/sign-in"
}

export default function Header() {
    const { isAuthenticated } = useContext(AuthenticationContext)

    const ref = isAuthenticated ? "#" : "/"

    return (
        <div className={styles.container}>
            <a href={ref} className={styles.logo}>
                <img src={logo} alt='SnapMsg'/>
                SnapMsg 
            </a>
            { isAuthenticated ? null : 
                <ul className={styles.headerList}>
                    <ListButton key={login.id} section={login} />
                </ul>
            }
        </div>
    )
} 