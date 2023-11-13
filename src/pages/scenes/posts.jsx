import PostCard from '../../components/postCard'
import styles from '../../styles/pages/posts.module.css'
import posts from '../../utils/data/posts.json'
import users from '../../utils/data/user.json'


export default function Posts() {
    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <div className={styles.divTitle}>
                    <h2 className={styles.title}>Posts users</h2>
                </div>
                <div className={styles.postsContainer}>
                    <ul className={styles.posts}>
                        {posts.map((post) => (
                            <PostCard key={post.pid} 
                                post={post}
                                user={users.find((user) => user.uid === post.uid)}/>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}