import { useEffect, useState, useContext } from 'react'
import styles from '../../styles/components/profileNav.module.css'
import { AuthenticationContext } from '../../auth/context/authenticationContext'
import { Icon } from '@iconify/react'
import { Link, useNavigate } from 'react-router-dom'
import { GetToken, GetMe } from '../../auth/service/userService'

export default function ProfileNav() {
    const { onLogout, isLoading } = useContext(AuthenticationContext)
    const [user, setUser] = useState({
        "uid": "",
        "fullname": "",
        "interests": [],
        "zone": {
          "latitude": 0,
          "longitude": 0
        },
        "followers": 0,
        "follows": 0,
        "is_admin": false,
        "ocupation": "",
        "pic": "",
        "email": "",
        "nick": "",
        "alias": "",
        "birthdate": ""
    })
    const navigate = useNavigate()

    const handleLogout = () => {
        onLogout()
        navigate("/")
    }

    const handleFetchData = () => 
        GetToken()
        .then(token => {
            GetMe(token)
            .then(response =>
                setUser(response.data)
            )
            .catch(error => {
                console.log('Error en profileNav ', error)
            })
        })
        .catch(error => console.log('error en profileNav ', error.response))

    useEffect(() => {
        if (!isLoading)
            handleFetchData();
    },[isLoading])

    return (
        <div className={styles.container}>
            <div className={styles.profile}>
                <div className={styles.profileImage}>
                    <img src={user.pic} alt={user.alias}/>
                </div>
                <div className={styles.profileInfo}>
                    <h3 className={styles.alias}>{user.alias}</h3>
                    <p>@{user.nick}</p>
                </div>
            </div>
            <div className={styles.optionSection}>
                <Link className={styles.option} to={"/me"}>
                    <Icon icon="iconamoon:profile-fill" className={styles.icon}/>
                    <div className={styles.textOption}>Your profile</div>
                </Link>
                <Link className={styles.option} to={"/dashboard"} >
                    <Icon icon="material-symbols:dashboard" className={styles.icon}/>
                    <div className={styles.textOption}>Dashboard</div>
                </Link>
                <Link className={styles.option} to={"/users"} >
                    <Icon icon="ph:users-three-fill" className={styles.icon}/>
                    <div className={styles.textOption}>Users</div>
                </Link>
                <Link className={styles.option} to={"/posts"} >
                    <Icon icon="gridicons:posts" className={styles.icon}/>
                    <div className={styles.textOption}>Posts</div>
                </Link>
                <div className={styles.option} onClick={handleLogout}>
                    <Icon icon="material-symbols:logout" className={styles.icon}/>
                    <div className={styles.textOption}>Logout</div>
                </div>
            </div>
        </div>
    )
}