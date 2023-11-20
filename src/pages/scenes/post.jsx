import { Icon } from '@iconify/react'
import styles from '../../styles/pages/post.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import users from '../../utils/data/user.json'
import posts from '../../utils/data/posts.json'

export default function Post() {
    const { pid } = useParams()
    const navigate = useNavigate()
    const post = posts.find((p) => p.pid === pid)
    const user = users.find((u) => u.uid === post.uid)

    const handleBack = () => navigate(-1)

    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <div className={styles.title}>
                    <Icon   className={styles.icon} 
                                icon="material-symbols:arrow-back-rounded"
                                onClick={() => handleBack()}
                    />
                    <p>Post</p>
                </div>
                <div className={styles.post}>
                    <div className={styles.header}>
                        <img src={user.pic} alt={user.alias}/>
                    </div>
                </div>
            </div>
            <div className={styles.trendings}>
                <p>Trendings</p>
            </div>
        </div>
    )
}