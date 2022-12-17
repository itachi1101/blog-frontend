import { useEffect, useState } from 'react'
import PostCard from '../../Components/Post cards/PostCard'
// external libraray for error handling
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Components/Loader/Loader";

import './LatestBlogsSection.styles.scss'
import { getRecentPosts } from '../../apiCalls';
export default function LatestBlogsSection() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(async () => {
        setLoading(true)
        function handleError(err) {
            toast.error(err, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        try {
            const data = await getRecentPosts()
            setPosts(data)
            setLoading(false)
        } catch (error) {
            handleError(error)
            setLoading(false)
        }
    }, [])
    return (
        <div className="latest-blogs-section-container">
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="latest-blogs-heading">
                Latest Blogs
            </div>
            {
                loading ? <Loader /> : (

                    <div className="latest-blogs-wrapper">
                       {
                        posts.map((d)=>{
                            return(
                                <PostCard key={d._id} id={d._id} title={d.title} description={d.description} imageURL={d.imagePath} date={d.createdAt}/>
                            )
                        })
                       }
                    </div>
                )
            }
        </div>
    )
}