import { useNavigate } from 'react-router-dom'
import styles from '../styles/components/postCard.module.css'
import HashtagText from '../utils/hashtags'
import { useContext, useEffect, useState } from 'react'
import { AuthenticationContext } from '../auth/context/authenticationContext'
import { GetToken, GetUsersByUid } from '../auth/service/userService'
import { Spinner } from 'react-activity'

export default function PostCard({post, trendings}) {
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
        navigate(`/post/${post.pid}`, { state: { user: user, post: post, trendings: trendings } })
    }

    useEffect(() => {
        const handleGetUserByUid = () => {
            setIsLoadingCard(true)
            GetToken()
            .then((token) => {
                GetUsersByUid(token, post.uid)
                .then(response => 
                    setUser(response.data[0])    
                )
                .catch(error =>
                    console.log(error.response.status)
                )
                .finally(() => setIsLoadingCard(false))
            })
            .catch((error) => {})
        }
        if (isAuthenticated)
            handleGetUserByUid()
    },[isAuthenticated, post.uid])

    return (
        <li className={styles.postsItem}>
            {isLoadingCard 
            ? 
            <div className={styles.loading}>
                <Spinner />
            </div>
            :
            <div className={styles.post} onClick={() => handlePost()}>
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
                </div>
                <div className={styles.contentPost}>
                    <HashtagText text={post.text} isLink={false}/>
                </div>
            </div>
            }
        </li>
    )
}