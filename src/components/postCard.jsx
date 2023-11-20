import { useNavigate } from 'react-router-dom'
import styles from '../styles/components/postCard.module.css'
import HashtagText from '../utils/hashtags'

export default function PostCard({post, user}) {
    const navigate = useNavigate()
    const handlePost = () => {
        navigate(`/post/${post.pid}`)
    }

    return (
        <li className={styles.postsItem}>
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
        </li>
    )
}