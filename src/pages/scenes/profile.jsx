import { useNavigate, useParams } from 'react-router-dom'
import styles from '../../styles/pages/me.module.css'
import PostCard from '../../components/postCard'
import { Icon } from '@iconify/react'
import { useContext, useEffect, useState } from 'react'
import { AuthenticationContext } from '../../auth/context/authenticationContext'
import { GetToken, GetUsersByUid } from '../../auth/service/userService'
import { GetPostByNick } from '../../auth/service/postService'
import { BlockUser, DeleteRegisterAdmin, RegisterAdmin, UnblockUser } from '../../auth/service/adminService'

export default function Profile() {
    const { uid } = useParams()
    const { isAuthenticated } = useContext(AuthenticationContext)
    const [user, setUser] = useState({
        "uid": "",
        "alias": "",
        "fullname": "",
        "interests": [],
        "zone": {"latitude": 0,
                "longitude": 0},
        "is_admin": false,
        "is_blocked": false,
        "ocupation": null,
        "pic": "",
        "email": "",
        "nick": "",
        "birthdate": "",
        "followers": 0,
        "follows": 0,
    })
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()
    const [isAdmin, setIsAdmin] = useState(null)
    const [isBlock, setIsBlock] = useState(false)
    const [error, setError] = useState(false)
    // const user = users.find((u) => u.uid === uid)
    
    const handleBack = () => navigate(-1)
   
    const handleBlockUser = () => {
        GetToken()
        .then(token => {
            if (!isBlock) {
                BlockUser(user.uid, token)
                .then(response => console.log('Block User', response?.status))
                .catch(error => console.log('Error in Block User: ', error?.response))
            } else {
                UnblockUser(user.uid, token)
                .then(response => console.log('Unblock User', response?.status))
                .catch(error => console.log('Error in Unblock User: ', error?.response))
            }
        })
        setIsBlock(!isBlock)
    }

    const handleAdminUser = () => {
        GetToken()
        .then(token => {
            if (!isAdmin) {
                RegisterAdmin(token, user.uid)
                .then(response => console.log('Register Admin ', response.status))
                .catch(error => console.error('Error Register Admin ', error.response.status))
            } else {
                DeleteRegisterAdmin(token, user.uid)
                .then(response => console.log('Delete Register Admin ', response.status))
                .catch(error => console.error('Error Delete Register Admin ', error.response.status))
            }
        })
        setIsAdmin(!isAdmin)
    }

    useEffect(() => {
        const handleGetUserByUid = async () => {
            setError(false)
            GetToken()
            .then((token) => {
                GetUsersByUid(token, uid)
                .then(response => {
                    setUser(response.data)
                    setIsBlock(response.data.is_blocked)  
                    setIsAdmin(response.data.is_admin)  
                })
                .catch(error => {
                    console.error(error.response.status)
                    setError(true)
                })
            })
            .catch((error) => {})
        }

        const handleGetPostUserByNick = async () => {
            setError(false)
            GetToken()
            .then(token => {
                GetPostByNick(token, user.nick)
                .then(response => {
                    setPosts(response.data)
                })
                .catch(error => {
                    console.error(error.response.status)
                    setError(true)
                })
            })
            .catch(error => {})
        }
        if (isAuthenticated)
            handleGetUserByUid()
        if (user.nick)
            handleGetPostUserByNick()
    }, [isAuthenticated, uid, user.nick])

    return (
        <div className={styles.container}>
            <div className={styles.profile}>
                <div className={styles.banner}>
                    <Icon   className={styles.icon} 
                            icon="material-symbols:arrow-back-rounded"
                            onClick={() => handleBack()}
                    />
                </div>
                <div className={styles.info}>
                    <div className={styles.imgInfo}>
                        <img src={user.pic} alt={user.alias}/>
                    </div>
                </div>
                <div className={styles.containerInfo}>
                    <div className={styles.textInfo}>
                        <h3>
                            {user.alias}
                        </h3>
                        <p className={styles.textNick}>@{user.nick}</p>
                        <p>{user.interests.join(', ')}</p>
                        <p><Icon icon='mingcute:birthday-2-fill' />{user.birthdate}</p>
                        <p><Icon icon='mdi:email' />{user.email}</p>
                    </div>
                    <div className={styles.btnAdmin}>
                        <div className={styles.options}>
                            <p>Block</p>
                            <Icon className={ user.is_blocked ? styles.blocked: styles.notBlocked } 
                                icon="bx:block" 
                                onClick={handleBlockUser}/>
                        </div>
                        <div className={styles.options}>
                            <p>{isAdmin ? 'Admin' : 'No Admin'}</p>
                            <Icon className={ isAdmin ? styles.isAdmin : styles.NotAdmin } 
                                icon="eos-icons:admin-outlined" onClick={handleAdminUser}/>
                        </div>
                    </div>
                </div>
                <div className={styles.metrics}>
                    <div className={styles.titleMetrics}>
                        <h3>Métricas</h3>
                        <Icon icon="ion:stats-chart-sharp" size={30}/>
                    </div>
                    <div className={styles.metricsInfo}>
                        <div className={styles.metricsBox}>
                            <p>{user.follows}</p>
                            <p>Follows</p>
                        </div>
                        <div className={styles.metricsBox}>
                            <p>{user.followers}</p>
                            <p>Followers</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.postMe}>
                <div className={styles.title}>
                    <h2>Post User</h2>
                </div>
                <div className={styles.postsContainer}>
                    {posts.length === 0 ?
                        <div className={styles.notFound}>
                            <p>Post not found</p> 
                        </div>
                        :
                        error ?
                            <div className={styles.error}>
                                <Icon icon="bx:error" className={styles.iconError}/>
                                <p>An error has ocurred.</p>
                                <p>Please try again later</p>
                            </div>
                        :
                        <ul className={styles.posts}>
                            {posts.map((post) => (
                                <PostCard key={post.pid} 
                                    post={post}
                                    user={user}/>
                            ))}
                        </ul>
                    }
                </div>
            </div>
        </div>
    )
}