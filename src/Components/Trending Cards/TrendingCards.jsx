import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPostById } from "../../apiCalls";
import Loader from "../Loader/Loader";
import "./TrendingCards.styles.scss";
export default function TrendingCard({ id }) {
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(false)
    useEffect(async () => {
        setLoading(true)
        try {
            const { data } = await getPostById(id)
            setPost(data.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }

    }, [])

    return (

        <div className="trending-inverted-post">
            {loading ? <Loader />
                :
                <>
                    <img
                        className="postImg"
                        src={post && post.imagePath}
                        alt=""
                    />
                    <div className="inverted-postInfo">
                        <div className="postCats">
                            <span className="postCat">
                                Music
                            </span>
                            <span className="postCat">
                                Life
                            </span>
                        </div>
                        <span className="inverted-postTitle">
                            <Link to={`/post/${id}`} className="link">
                                {post && post.title}
                            </Link>
                        </span>
                        <div className="hr"></div>
                        <span className="postDate">{post && post.date}</span>
                    </div>
                    <p className="postDesc">
                        {post && post.description}
                    </p>
                </>
            }
        </div>
    );
}