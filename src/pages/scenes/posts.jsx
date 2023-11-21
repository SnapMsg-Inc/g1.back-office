import { useContext, useEffect, useState } from 'react'
import PostCard from '../../components/postCard'
import styles from '../../styles/pages/posts.module.css'
import users from '../../utils/data/user.json'
import { Icon } from '@iconify/react'
import { AuthenticationContext } from '../../auth/context/authenticationContext'
import { GetToken } from '../../auth/service/userService'
import { GetPostByText, GetPosts } from '../../auth/service/postService'

const INITIAL_PAGE = 0

export default function Posts() {
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(INITIAL_PAGE)
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
        const handleFetchPost = async () => {
            GetToken()
            .then(token => {
                GetPosts(token, page)
                .then(response => {
                    console.log(response.data)
                    setPosts(response.data)
                })
                .catch(error => {
                    console.log(error.response.status)
                })
            })
            .catch(error => {})
        }
        if (isAuthenticated)
            handleFetchPost()
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
                    <ul className={styles.posts}>
                        {posts.map((post) => (
                            <PostCard key={post.pid} 
                                post={post}
                                user={users.find((user) => user.uid === post.uid)}/>
                        ))}
                    </ul>
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
                <p>Trendings</p>
            </div>
        </div>
    )
}