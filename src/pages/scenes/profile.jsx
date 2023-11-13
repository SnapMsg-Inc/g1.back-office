import { useParams } from 'react-router-dom'
import styles from '../../styles/pages/me.module.css'
import posts from '../../utils/data/posts.json'
import users from '../../utils/data/user.json'
import PostCard from '../../components/postCard'
import { Icon } from '@iconify/react'

export default function Profile() {
    const { uid } = useParams()

    const user = users.find((u) => u.uid === uid)

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
                <div className={styles.textInfo}>
                    <h3>{user.alias}</h3>
                    <p>@{user.nick}</p>
                    <p>{user.interests}</p>
                    <p>
                        {user.follows}
                        <strong>Follows</strong> 
                        {user.followers} 
                        <strong>Followers</strong>    
                    </p>
                </div>
                <div className={styles.metrics}>
                    <div className={styles.titleMetrics}>
                        <h3>Métricas</h3>
                        <Icon icon="ion:stats-chart-sharp" size={30}/>
                    </div>
                </div>
            </div>
            <div className={styles.postMe}>
                <div className={styles.title}>
                    <h2>Post User</h2>
                </div>
                <div className={styles.postsContainer}>
                    <ul className={styles.posts}>
                        {posts.filter((post) => post.uid === user.uid).map((post) => (
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