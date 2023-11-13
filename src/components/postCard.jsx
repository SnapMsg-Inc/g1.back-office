import styles from '../styles/components/post.module.css'
import HashtagText from '../utils/hashtags'

export default function PostCard({post, user}) {
    return (
        <li className={styles.postsItem}>
            <div className={styles.post}>
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
                    <HashtagText text={post.text}/>
                </div>
            </div>
        </li>
    )
}