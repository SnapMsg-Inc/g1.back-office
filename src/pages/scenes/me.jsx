import { Icon } from '@iconify/react'
import PostCard from '../../components/postCard'
import styles from '../../styles/pages/me.module.css'
import { useState, useEffect, useContext } from 'react'
import { GetMe, GetToken } from '../../auth/service/userService'
import { AuthenticationContext } from '../../auth/context/authenticationContext'
import { GetPostByNick } from '../../auth/service/postService'
import { GetStatsByUid } from '../../auth/service/adminService'

export default function Me() {
    const { isAuthenticated } = useContext(AuthenticationContext)
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
        "is_blocked": false,
        "ocupation": "",
        "pic": "",
        "email": "",
        "nick": "",
        "alias": "",
        "birthdate": ""
    })
    const [posts, setPosts] = useState([])
    const [stats, setStats] = useState({})

    useEffect(() => {
        const handleFetchMe = async () => {
            GetToken()
            .then(token => {
                GetMe(token)
                .then(response =>
                    setUser(response.data)
                )
                .catch(error => {
                    console.log('Error', error  )
                })
            })
            .catch(error => {})
        }

        const handleGetStatsPostByUid = () => {
            GetToken()
            .then(token => {
                let date = new Date()
                const end = new Date(date);
                end.setDate(date.getDate() + 1)
                GetStatsByUid(user.uid,{
                    start:'2023-12-01',
                    end: end.toISOString().split('T')[0]
                }, token)
                .then(response => {
                    console.log('stats', response.data)
                    setStats(response.data)
                })
                .catch(error => console.log('Error in stats profile', error?.response?.status))
            })
            .catch(error => console.log('Error in token', error))
        }

        const handleGetPostUserByNick = async () => {
            GetToken()
            .then(token => {
                GetPostByNick(token, user.nick)
                .then(response => {
                    setPosts(response.data)
                })
                .catch(error => 
                    console.log(error.response.status)
                )
            })
            .catch(error => {})
        }
        if (isAuthenticated)
            handleFetchMe()
        if (user.nick) {
            handleGetStatsPostByUid()
            handleGetPostUserByNick()
        }
    }, [isAuthenticated, user.nick, user.uid])

    return (
        <div className={styles.container}>
            <div className={styles.profile}>
                <div className={styles.banner}>
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
                        <p><Icon icon='mingcute:birthday-2-fill' />{user.birthdate}</p>
                        <p><Icon icon='mdi:email' />{user.email}</p>
                    </div>
                    <div className={styles.btnAdmin}>
                        <div className={styles.options}>
                            <p>Block</p>
                            <Icon className={ user.is_blocked ? styles.blocked: styles.notBlocked } 
                                icon="bx:block" />
                        </div>
                        <div className={styles.options}>
                            <p>Admin</p>
                            <Icon className={ user.is_admin ? styles.isAdmin : styles.NotAdmin } 
                                icon="eos-icons:admin-outlined"/>
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
                        <div className={styles.metricsBox}>
                            <p>{stats.total_posts}</p>
                            <p>Posts</p>
                        </div>
                        <div className={styles.metricsBox}>
                            <p>{stats.total_likes}</p>
                            <p>Likes</p>
                        </div>
                        <div className={styles.metricsBox}>
                            <p>{stats.total_snapshares}</p>
                            <p>Snapshares</p>
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
                                post={post}/>
                            ))}
                        </ul>
                    }
                </div>
            </div>
        </div>
    )
}