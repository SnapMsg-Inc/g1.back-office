import styles from '../styles/pages/dashboard.module.css'
import UserCard from '../components/userCard'
import user from '../utils/data/user.json'
import ProfileNav from '../components/profileNav'
import { useContext } from 'react'
import { AuthenticationContext } from '../auth/context/authenticationContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'

export default function Dashboard() {
    const { isAuthenticated } = useContext(AuthenticationContext)
    const navigateTo = useNavigate()

    useEffect(() => {
        if (!isAuthenticated)
            navigateTo('/')
    }, [isAuthenticated, navigateTo])

    return (
        <div className={styles.container}>
            <div className={styles.perfil}>
                <ProfileNav/>
            </div>
            <div className={styles.section}>
                <div className={styles.divTitle}>
                    <h2 className={styles.title}>Users Register</h2>
                </div>
                <div className={styles.searchBar}>
                    <input 
                        type='text'
                        placeholder='Search user'/>
                    <Icon className={styles.search} icon="material-symbols:search" />
                </div>
                <div className={styles.cardContainer}>
                    <ul className={styles.cards}>
                        {user.map((user) => (
                            <UserCard key={user.uid} user={user} />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}