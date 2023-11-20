import { useNavigate, useParams } from 'react-router-dom'
import styles from '../../styles/pages/me.module.css'
import posts from '../../utils/data/posts.json'
import users from '../../utils/data/user.json'
import PostCard from '../../components/postCard'
import { Icon } from '@iconify/react'

export default function Profile() {
    const { uid } = useParams()
    const navigate = useNavigate()
    const user = users.find((u) => u.uid === uid)
    
    const handleBack = () => navigate(-1)
    const handleDeleteUser = () => console.log('User deleted')
    const handleAdminUser = () => console.log('User is Admin')

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
                        <p>{user.interests}</p>
                    </div>
                    <div className={styles.btnAdmin}>
                        <Icon className={styles.icon}
                                icon="mdi:trash-can"
                                onClick={() => handleDeleteUser()}/>
                        <button className={styles.btnIsAdmin}
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