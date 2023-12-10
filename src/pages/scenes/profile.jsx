import { useNavigate, useParams } from 'react-router-dom'
import styles from '../../styles/pages/me.module.css'
import PostCard from '../../components/postCard'
import { Icon } from '@iconify/react'
import { useContext, useEffect, useState } from 'react'
import { AuthenticationContext } from '../../auth/context/authenticationContext'
import { GetToken, GetUsersByUid } from '../../auth/service/userService'
import { GetPostByNick } from '../../auth/service/postService'

export default function Profile() {
    const { uid } = useParams()
    const { isAuthenticated } = useContext(AuthenticationContext)
    const [user, setUser] = useState({
        "uid": "",
        "alias": "",
        "nick": "",
        "followers": 0,
        "follows": 0,
        "interests": [],
        "pic": ''
    })
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()
    const [isAdmin, setIsAdmin] = useState()
    // const user = users.find((u) => u.uid === uid)
    
    const handleBack = () => navigate(-1)
    const handleDeleteUser = () => console.log('User deleted')
    const handleAdminUser = () => {
        setIsAdmin(!isAdmin)
    }

    useEffect(() => {
        const handleGetUserByUid = async () => {
            GetToken()
            .then((token) => {
                GetUsersByUid(token, uid)
                .then(response => 
                    setUser(response.data[0])    
                )
                .catch(error =>
                    console.log(error.response.status)
                )
            })
            .catch((error) => {})
        }

        const handleGetPostUserByNick = async () => {
            GetToken()
            .then(token => {
                console.log('desde posts ',user.nick)
                GetPostByNick(token, user.nick)
                .then(response => {
                    setPosts(response.data)
                    console.log(response.data)
                })
                .catch(error => 
                    console.log(error.response.status)
                )
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
                        <h3>{user.alias}</h3>
                        <p className={styles.textNick}>@{user.nick}</p>
                        <p>{user.interests.join(', ')}</p>
                    </div>
                    <div className={styles.btnAdmin}>
                        <Icon className={styles.icon}
                                icon="mdi:trash-can"
                                onClick={() => handleDeleteUser()}/>
                        <button className={styles.btnNoAdmin}
                            onClick={() => handleAdminUser()}>
                            Admin
                        </button>
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