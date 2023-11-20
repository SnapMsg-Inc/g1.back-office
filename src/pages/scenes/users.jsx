import styles from '../../styles/pages/users.module.css'
import UserCard from '../../components/userCard'
import { Icon } from '@iconify/react'
import { useContext, useEffect, useState } from 'react'
import { GetToken, GetUsers } from '../../auth/service/userService'
import { AuthenticationContext } from '../../auth/context/authenticationContext'

export default function Users() {
    const { isLoading } = useContext(AuthenticationContext)
    const [users, setUsers] = useState([])
   
    const handleFetchUsers = () => {
        GetToken()
        .then((token) => {
            console.log('token ', token)
            GetUsers(token, 0)
            .then(response => {
                setUsers(response.data)
                console.log('users', response.data)
            })
            .catch(error => {
                console.log('Error get users', error.response)
            })
        })
        .catch(error => 
            console.log('Error en users', error)
        )
    }

    useEffect(() => {
        if (!isLoading)
            handleFetchUsers()
    },[isLoading])

    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <div className={styles.divTitle}>
                    <p>Users Register</p>
                </div>
                <div className={styles.searchBar}>
                    <input 
                        type='search'
                        placeholder='Search user'/>
                    <Icon className={styles.search} icon="material-symbols:search" />
                </div>
                <div className={styles.cardContainer}>
                    <ul className={styles.cards}>
                        {users.map((user) => (
                            <UserCard key={user.uid} user={user} />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}