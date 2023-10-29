import styles from '../styles/components/card.module.css'

export default function UserCard({user}) {
    return (
        <li className={styles.cardsItem}>
            <div className={styles.card}>
                <div className={styles.cardImage}>
                    <img src={user.pic} alt={user.alias} sizes={20}/>
                </div>
                <div className={styles.cardContent}>
                    <div className={styles.content}>
                        <h2>{user.alias}</h2>    
                        <p>@{user.nick}</p>
                        <p>Followers: {user.followers} Follows: {user.follows}</p>
                    </div>
                    <button className={styles.profile}>View Profile</button>
                </div>
            </div>
        </li>
    )
}