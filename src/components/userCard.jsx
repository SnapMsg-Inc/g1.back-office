import { Link } from 'react-router-dom'
import styles from '../styles/components/card.module.css'

export default function UserCard({user}) {
    return (
        <li className={styles.cardsItem}>
            <Link className={styles.card} to={`/profile/${user.uid}`}>
                <div className={styles.cardContent}>
                    <div className={styles.cardImage}>
                        {user.pic !== '' ? <img src={user.pic} alt={user.alias} sizes={20}/>
                        : <></>}
                    </div>
                    <div className={styles.content}>
                        <h2>{user.alias}</h2>    
                        <p>@{user.nick}</p>
                    </div>
                </div>
                <div className={styles.interests}>
                    <p>{user.interests.join(', ')}</p>
                </div>
            </Link>
        </li>
    )
}