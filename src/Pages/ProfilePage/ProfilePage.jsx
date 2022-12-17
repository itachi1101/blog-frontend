import { useEffect, useState } from "react";
import { getFreePostById, getUserById } from "../../apiCalls";
import HeaderNew from "../../Components/Header/Header";
import InvertedPostCard from "../../Components/InvertedCard/InvertedCard";
import Loader from "../../Components/Loader/Loader";
import './ProfilePage.styles.scss'
export default function UserProfilePage() {
    const [loading, setLoading] = useState(true)
    const [username, setUserName] = useState("dasfdsf")
    const [imageURL, setImageURL] = useState("asdfadsf")
    const [posts, setPosts] = useState(null)
    const id = window.location.pathname.split('/')[2]
    useEffect(async () => {
        setLoading(true)
        try {
            const data = await getFreePostById(id)

            setPosts(data)
            console.log(posts)
            const { username, imagePath } = await getUserById(id)
            setUserName(username)
            setImageURL(imagePath)
            console.log(data)

            setLoading(false);

        } catch (error) {
            setLoading(false)
        }
    }, [])
    return (
        <>
            <HeaderNew />
            <div className="user-profile-page-container">
                <div className="horizontal-line"></div>
                <div className="profile-image">
                    <img src={imageURL} />
                </div>
                <div className="username">
                    {username.toUpperCase()}
                </div>
                <div className="title">
                    POSTS
                </div>
                <div className="horizontal-line"></div>
                <div className="post-container">
                    {loading ? <Loader /> : (
                        posts.map((d) => {

                            return (
                                <InvertedPostCard key={d._id} id={d._id} title={d.title} description={d.description} date={d.createdAt} imageURL={d.imagePath} />
                            )
                        })
                    )}
                </div>

            </div>
        </>
    )
}