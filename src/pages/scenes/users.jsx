import styles from '../../styles/pages/users.module.css'
import UserCard from '../../components/userCard'
import { Icon } from '@iconify/react'
import { useContext, useEffect, useState } from 'react'
import { GetToken, GetUsers } from '../../auth/service/userService'
import { AuthenticationContext } from '../../auth/context/authenticationContext'

const INITIAL_PAGE = 0

export default function Users() {
    const { isAuthenticated } = useContext(AuthenticationContext)
    const [page, setPage] = useState(INITIAL_PAGE)
    const [users, setUsers] = useState([])

    const handleNextPage = () => {
        if (users.length === 20)
            setPage(page => page + 1)
    }

    const handlePreviewPage = () => {
        if ((page - 1) >= INITIAL_PAGE)
            setPage(page => page - 1)
    }

    
    useEffect(() => {
        const handleFetchUsers = async () => {
            GetToken()
            .then((token) => {
                GetUsers(token, page)
                .then(response => {
                    setUsers(response.data)
                })
                .catch(error => {
                    console.log('Error get users', error.response)
                })
            })
            .catch(error => 
                console.log('Error en users', error)
            )
        }
        if (isAuthenticated)
            handleFetchUsers()
    },[isAuthenticated, page, setPage])

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
                <div className={styles.pagination}>
                    <Icon   className={styles.icon} 
                        icon="mingcute:arrows-left-line"
                        onClick={() => handlePreviewPage()}/>
                    {page + 1}
                    <Icon  className={styles.icon}
                        icon="mingcute:arrows-right-line" 
                        onClick={() => handleNextPage()}/>
                </div>
            </div>
        </div>
    )
}