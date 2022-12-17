import { useEffect, useContext, useState } from "react";
import HeaderNew from "../../Components/Header/Header";
import { Context } from "../../context/Context";

// external libraray for error handling
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Components/Loader/Loader";


import "./settings.scss";
import { getPostByUser } from "../../apiCalls";
import FooterNew from "../../Components/FooterNew/FooterNew";
import InvertedPostCard from "../../Components/InvertedCard/InvertedCard";
export default function ProfilePage() {
  const { user } = useContext(Context)
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
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    }
    try {
      const data = await getPostByUser(config)
      setPosts(data)
      
      setLoading(false)
    } catch (error) {
      handleError(error)
      setLoading(false)
    }
  }, [user])
  return (
    <>
      <HeaderNew />
      <div className="profile-page-container">
        <div className="horizontal-line"></div>
        <div className="profile-image">
          <img src={user.imagePath} />
        </div>
        <div className="username">
          {user.username.toUpperCase()}
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
      <FooterNew />
    </>
  )
}