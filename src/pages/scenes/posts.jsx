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
    const [error, setError] = useState(false)
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
            setError(false)
            GetToken()
            .then(token => {
                GetPosts(token, page)
                .then(response => {
                    setPosts(response.data)
                    console.log(response.data)
                })
                .catch(error => {
                    console.error('Error GetPosts in Posts Scene ',error.response)
                    setError(true)
                })
            })
            .catch(error => {
                console.error('Error token', error)
                setError(true)
                setIsLoadingPage(false)
            })
        }
        const handleTrendings = () => {
            setIsLoadingTrending(true)
            setError(false)
            GetToken()
            .then(token => {
                GetTrendingsPost(token)
                .then(response => {
                    setTrendings(response.data)
                    setIsLoadingTrending(false)
                })
                .catch(error => {
                    console.error('Error Trendings in Posts Scene ', error?.response?.status)
                    setIsLoadingTrending(false)
                    setError(true)
                })
                setIsLoadingPage(false)
            })
            .catch(error => {
                console.error('Error token',error)
                setIsLoadingTrending(false)
                setError(true)   
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
                setPosts(response.data)
            })
            .catch(error => console.error(error.response.status))
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
                    {loadingPage ?
                        <div className={styles.containerLoading}>
                            <Spinner className={styles.loading} size={40}/>
                        </div>
                        :
                        error ? 
                        <div className={styles.errorPost}>
                            <Icon icon="bx:error" className={styles.iconError}/>
                            <p>An error has ocurred.</p>
                            <p>Please try again later</p>
                        </div> 
                        :
                        <ul className={styles.posts}>
                            {posts.map((post) => 
                                <PostCard key={post.pid} 
                                    post={post}/>
                            )}
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
                        error ? 
                            <div className={styles.error}>
                                <Icon icon="bx:error" className={styles.iconError}/>
                                <p>An error has ocurred.</p>
                                <p>Please try again later</p>
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