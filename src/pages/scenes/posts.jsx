import PostCard from '../../components/postCard'
import styles from '../../styles/pages/posts.module.css'
import posts from '../../utils/data/posts.json'
import users from '../../utils/data/user.json'
import { Icon } from '@iconify/react'

export default function Posts() {
    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <div className={styles.divTitle}>
                    <p>Posts users</p>
                </div>
                <div className={styles.searchBar}>
                    <input 
                        type='search'
                        placeholder='Search post'/>
                    <Icon className={styles.search} icon="material-symbols:search" />
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
            <div className={styles.trendings}>
                <p>Trendings</p>
            </div>
        </div>
    )
}