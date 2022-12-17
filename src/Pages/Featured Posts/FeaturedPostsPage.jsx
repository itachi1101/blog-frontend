import { CircularProgress } from '@mui/material'
import Post from '../Posts/Post'
import './FeaturedPostsPage.styles.scss'
export default function FeaturedPostsPage({ posts, loading }) {
    const mposts=posts.slice(0,6)
    return (
        <div className="FeaturedPost-container">
            <div className="heading">FEATURED POSTS</div>
            <div className="wrapper">
                {
                    loading ? <CircularProgress style={{ width: "200px", height: "200px" }}></CircularProgress> :
                        mposts.map((post) => (
                            <Post
                                post={post}
                                key={post.title}

                            />
                        ))}
            </div>
        </div>
    )
}