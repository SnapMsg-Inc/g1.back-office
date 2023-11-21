import { Icon } from '@iconify/react'
import PostCard from '../../components/postCard'
import styles from '../../styles/pages/me.module.css'
import { useState, useEffect, useContext } from 'react'
import { GetMe, GetToken } from '../../auth/service/userService'
import { AuthenticationContext } from '../../auth/context/authenticationContext'
import { GetPostByNick } from '../../auth/service/postService'

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
        "ocupation": "",
        "pic": "",
        "email": "",
        "nick": "",
        "alias": "",
        "birthdate": ""
    })
    const [posts, setPosts] = useState([])

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
            handleFetchMe()
        if (user.nick)
            handleGetPostUserByNick()
    }, [isAuthenticated, user.nick])

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
                    </div>
                    <div className={styles.btnAdmin}>
                        <button className={styles.btnIsAdmin}>Admin</button>
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
                    <ul className={styles.posts}>
                        {posts.map((post) => (
                            <PostCard key={post.pid} 
                                post={post}
                                user={user}/>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}