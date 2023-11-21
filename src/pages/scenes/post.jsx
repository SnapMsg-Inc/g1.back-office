import { Icon } from '@iconify/react'
import styles from '../../styles/pages/post.module.css'
import { useLocation, useNavigate } from 'react-router-dom'
import HashtagText from '../../utils/hashtags'
import { useState } from 'react'

export default function Post() {
    const navigate = useNavigate()
    const locationData = useLocation()
    const { user, post } = locationData.state
    const [isModalOpen, setIsModalOpen] = useState(false)


    const handleBack = () => navigate(-1)
    console.log(locationData.state)

    const handleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    return (
        <div className={styles.container}>
            {isModalOpen &&
                <dialog className={styles.dialogImg}
                        open>
                    <div className={styles.closeDialog}>
                        <Icon className={styles.iconClose}
                            icon="mdi:close-circle-outline"
                            onClick={() => handleModal()}/>
                    </div>
                    <div>
                        <img src={post.media_uri[0]} alt={user.alias}/>
                    </div>
                </dialog>
            } 
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
                        <div className={styles.imgProfile}>
                            <img src={user.pic} alt={user.alias}/>
                        </div>
                        <div className={styles.userInfo}>
                            <p><strong>{user.alias}</strong></p>
                            <p>@{user.nick}</p>
                            <span>{post.timestamp.slice(0,10)}</span>
                        </div>
                    </div>
                    <div className={styles.body}>
                        <div className={styles.textPost}>
                            <HashtagText text={post.text} isLink={true}/>
                        </div>
                        {
                            post.media_uri.length > 0 ? 
                            <div className={styles.mediaUri} onClick={() => handleModal()}>
                                <img src={post.media_uri[0]} alt={user.alias}/> 
                            </div>
                            :
                             <></>
                        }
                        <div className={styles.statistics}>
                            <p>0</p>
                            <Icon className={styles.iconStats} 
                                icon="la:retweet"/>
                            <p>{post.likes}</p>
                            <Icon className={styles.iconStats}
                                icon="icon-park-solid:like"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.trendings}>
                <p>Trendings</p>
            </div>
        </div>
    )
}