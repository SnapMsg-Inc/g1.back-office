import { useNavigate } from 'react-router-dom'
import styles from '../styles/components/postCard.module.css'
import HashtagText from '../utils/hashtags'
import { useContext, useEffect, useState } from 'react'
import { AuthenticationContext } from '../auth/context/authenticationContext'
import { GetToken, GetUsersByUid } from '../auth/service/userService'
import { Spinner } from 'react-activity'
import { Icon } from '@iconify/react'

export default function PostCard({post}) {
    const { isAuthenticated } = useContext(AuthenticationContext)
    const [isLoadingCard, setIsLoadingCard] = useState(false)
    const [user, setUser] = useState({
        "uid": "",
        "alias": "",
        "nick": "",
        "followers": 0,
        "follows": 0,
        "interests": [],
        "pic": ''
    })
    const navigate = useNavigate()
    const handlePost = () => {
        navigate(`/post/${post.pid}`, { state: { user: user, post: post } })
    }
    
    useEffect(() => {
        const handleGetUserByUid = () => {
            const userLocal = localStorage.getItem(post.post ? post.post.uid : post.uid)
            setIsLoadingCard(true)
            if (userLocal === null) {
                GetToken()
                .then((token) => {
                    GetUsersByUid(token, post.uid)
                    .then(response => {
                        setUser(response.data)
                        localStorage.setItem(post.uid, JSON.stringify(response.data))    
                    })
                    .catch(error =>
                        console.error('Error in GetUserByUid in PostCard ',error.response.status)
                    )
                    .finally(() => setIsLoadingCard(false))
                })
                .catch((error) => {})
            } else {
                setUser(JSON.parse(userLocal))
                setIsLoadingCard(false)
            }
        }
        if (isAuthenticated)
            handleGetUserByUid()
    },[isAuthenticated, post.uid, post.post])

    return (
        <li className={styles.postsItem}>
            {isLoadingCard 
            ? 
            <div className={styles.loading}>
                <Spinner />
            </div>
            :
            <div className={styles.post} onClick={() => handlePost()}>
                {post.post &&
                    <div className={styles.snapShare} >
                        <Icon icon="la:retweet"/>
                        <p>This Snap was Snapshare</p>
                    </div> 
                }
                <div className={styles.header}>
                    <div className={styles.cardImage}>
                        <img src={user.pic} alt={user.alias} sizes={20}/>
                    </div>
                    <div className={styles.cardContent}>
                        <div className={styles.content}>
                            <h2>{user.alias}</h2>    
                            <p>@{user.nick}</p>
                            <span>{post.timestamp.slice(0,10)}</span>
                        </div>
                    </div>
                    <div>
                        <Icon className={(post.post ? post.post.is_blocked : post.is_blocked) ? styles.iconBlock : styles.icon } 
                            icon={(post.post ? post.post.is_blocked : post.is_blocked) ? "mdi:message-off" : "mdi:message"}
                        />
                    </div>
                </div>
                <div className={styles.contentPost}>
                    <HashtagText text={post.post ? post.post.text : post.text} isLink={false}/>
                </div>
            </div>
            }
        </li>
    )
}