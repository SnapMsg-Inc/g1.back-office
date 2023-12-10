import { Icon } from '@iconify/react'
import styles from '../../styles/pages/post.module.css'
import { useLocation, useNavigate } from 'react-router-dom'
import HashtagText from '../../utils/hashtags'
import { useContext, useEffect, useState } from 'react'
import { GetToken } from '../../auth/service/userService'
import { BlockPost, UnblockPost } from '../../auth/service/adminService'
import { GetTrendingsPost } from '../../auth/service/postService'
import { Spinner } from 'react-activity'
import { AuthenticationContext } from '../../auth/context/authenticationContext'

export default function Post() {
    const navigate = useNavigate()
    const locationData = useLocation()
    const { user, post } = locationData.state
    const { isAuthenticated } = useContext(AuthenticationContext)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isBlock, setIsBlock] = useState(post.is_blocked)
    const [trendings, setTrendings] = useState([])
    const [loadingTrending, setIsLoadingTrending] = useState(false)

    const handleBack = () => navigate(-1)

    const handleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    const handleBlockPost = async () => {
        setIsBlock(!isBlock)
        console.log('block',isBlock)
        await GetToken()
        .then(async token => {
            if (isBlock) {
                await BlockPost(token, post.pid)
                .then(response => console.log('Block Post ', response.status))
                .catch(error => console.error('Error in block post ', error.response.status))
            } else {
                await UnblockPost(token, post.pid)    
                .then(response => console.log('Unblock Post ', response.status))
                .catch(error => console.error('Error in Unblock post ', error.response.status))
            }
        })
    }

    useEffect(() => {
        const handleTrendings = () => {
            setIsLoadingTrending(true)
            GetToken()
            .then(token => {
                GetTrendingsPost(token)
                .then(response => {
                    setTrendings(response.data)
                    setIsLoadingTrending(false)
                })
                .catch(error => {
                    console.log(error.response)
                    setIsLoadingTrending(false)
                })
            })
            .catch(error => {
                console.log(error)
                setIsLoadingTrending(false)
            })
        }
        if (isAuthenticated)
            handleTrendings()
    }, [isAuthenticated])

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
                        <div className={styles.blockPost}>
                            <Icon   className={isBlock ? styles.iconBlock : styles.icon } 
                                    icon={post.is_blocked ? "mdi:message-off" : "mdi:message"}
                                    onClick={handleBlockPost}/>
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
                            <p>{post.snapshares}</p>
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
                <div className={styles.titleTrendings}>
                    <p>Trendings</p>
                </div>
                <div className={styles.trendingsInfo}>
                    {loadingTrending ? 
                    <div className={styles.containerLoading}>
                        <Spinner className={styles.loading}/>
                    </div>
                    :
                    <div className={styles.trendingsItem}>
                        {trendings.map((item, index) => (
                        <div key={index}>
                            <p>{`${index + 1}. `}<span>{`${item.topic}`}</span></p>
                            <p>{`Mentions ${item.mention_count}`}</p>
                        </div>
                        ))}
                    </div>
                    }      
                </div>
            </div>
        </div>
    )
}