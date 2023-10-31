import styles from '../../styles/pages/users.module.css'
import UserCard from '../../components/userCard'
import user from '../../utils/data/user.json'
import { Icon } from '@iconify/react'

export default function Users() {

    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <div className={styles.divTitle}>
                    <h2 className={styles.title}>Users Register</h2>
                </div>
                <div className={styles.searchBar}>
                    <input 
                        type='search'
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