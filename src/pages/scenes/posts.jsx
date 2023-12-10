import { useContext, useEffect, useState } from 'react'
import PostCard from '../../components/postCard'
import styles from '../../styles/pages/posts.module.css'
import { Icon } from '@iconify/react'
import { AuthenticationContext } from '../../auth/context/authenticationContext'
import { GetToken } from '../../auth/service/userService'
import { GetPostByText, GetPosts, GetTrendingsPost } from '../../auth/service/postService'
import { Spinner } from 'react-activity'

const INITIAL_PAGE = 0

export default function Posts() {
    const [posts, setPosts] = useState([])
    const [trendings, setTrendings] = useState([])
    const [page, setPage] = useState(INITIAL_PAGE)
    const [loadingPage, setIsLoadingPage] = useState(false)
    const [loadingTrending, setIsLoadingTrending] = useState(false)
    const [search, setSearch] = useState('')
    const { isAuthenticated } = useContext(AuthenticationContext)

    const handleNextPage = () => {
        if (posts.length === 16)
            setPage(page => page + 1)
    }

    const handlePreviewPage = () => {
        if ((page - 1) >= INITIAL_PAGE)
            setPage(page => page - 1)
    }
    
    useEffect(() => {
        const handleFetchPost = () => {
            setIsLoadingPage(true)
            GetToken()
            .then(token => {
                GetPosts(token, page)
                .then(response => {
                    console.log(response.data)
                    setPosts(response.data)
                })
                .catch(error => {
                    console.log(error.response.status)
                    console.log(error.response)
                })
            })
            .catch(error => {
                console.log(error.reponse)
                setIsLoadingPage(false)
            })
        }
        const handleTrendings = () => {
            setIsLoadingTrending(true)
            GetToken()
            .then(token => {
                GetTrendingsPost(token)
                .then(response => {
                    console.log('trendings ',response.data)
                    setTrendings(response.data)
                    setIsLoadingTrending(false)
                })
                .catch(error => {
                    console.log(error.response)
                    setIsLoadingTrending(false)
                })
                setIsLoadingPage(false)
            })
            .catch(error => {
                console.log(error)
                setIsLoadingTrending(false)
            })
        }
        if (isAuthenticated) {
            handleFetchPost()
            handleTrendings()
        }
    }, [isAuthenticated, page])

    const handleChangeInput = (e) => {
        const { value } = e.target
        setSearch(() => value)
        if (value.length > 3 || value.length < 1)
            handleQuery()
    }

    const handleQuery = () => {
        setPage(() => INITIAL_PAGE)
        GetToken()
        .then(token => {
            GetPostByText(token, search, page)
            .then(response => {
                console.log('query ',response.data)
                setPosts(response.data)
            })
            .catch(error =>
                console.log(error.response)
            )
        })
        .catch(error => console.log(error))
    }

    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <div className={styles.divTitle}>
                    <p>Posts users</p>
                </div>
                <div className={styles.searchBar}>
                    <input 
                        type='text'
                        placeholder='Search post'
                        value={search}
                        onChange={handleChangeInput}
                        onReset={handleQuery}/>
                    <Icon className={styles.search} 
                        icon="material-symbols:search"
                        onClick={() => handleQuery()}/>
                </div>
                <div className={styles.postsContainer}>
                    {posts.length === 0 && !loadingPage ?
                        <div className={styles.notFound}>
                            <p>Post not found</p> 
                        </div>
                        :
                        <ul className={styles.posts}>
                            {posts.map((post) => (
                                <PostCard key={post.pid} 
                                post={post} trendings={trendings}/>
                            ))}
                        </ul>
                    }
                </div>
                <div className={styles.pagination}>
                    <Icon   className={styles.icon} 
                        icon="mingcute:arrows-left-line"
                        onClick={() => handlePreviewPage()}/>
                    {page + 1}
                    <Icon  className={styles.icon}
                        icon="mingcute:arrows-right-line" 
                        onClick={() => handleNextPage()}/>
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
                        <>
                            <p>{`${index + 1}. `}<span>{`${item.topic}`}</span></p>
                            <p>{`Mentions ${item.mention_count}`}</p>
                        </>
                        ))}
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}