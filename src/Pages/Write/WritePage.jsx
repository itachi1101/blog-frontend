import "./write.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlusCircle } from "react-icons/fa";
import { useState, useContext, useRef } from "react";
import { useHistory } from "react-router-dom";

import { Context } from "../../context/Context";
import HeaderNew from "../../Components/Header/Header";
import FooterNew from '../../Components/FooterNew/FooterNew'
import { createActivity, createPost } from "../../apiCalls";

// external libraray for error handling
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Components/Loader/Loader";



export default function WritePage() {
  const titleRef = useRef();
  const descRef = useRef();
  const [file, setFile] = useState(null);
  const [isPrivate, setIsPrivate] = useState(false);
  const [category, setCategory] = useState(["none"])
  const [loading, setLoading] = useState(false)

  const history = useHistory();
  const { user } = useContext(Context);
  const defaultFileName = "/uploads/defaultPost.jpg";
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const data = new FormData();
    data.append("title", titleRef.current.value);
    data.append("description", descRef.current.value);
    data.append("draft", isPrivate);
    data.append("author", user.email)
    data.append("category", category)
    data.append("authorId", user._id)
    data.append("authorImage", user.imagePath)
    if (file) {
      data.append("image", file);

    } else {
      data.append("image", defaultFileName);
    }
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      const { _id } = await createPost(config, data)
      await createActivity({ "userId": user._id, "postId": _id, "likeCounter": 0 })
      history.push(`/post/${_id}`)
      setLoading(false)
    } catch (error) {
      handleError(error);
      setLoading(false)
    }
  };
  return (
    <>
      <HeaderNew />
      {
        loading ? (<Loader />) : (
          <div className="write">

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
            <div className="horizontal-line"></div>
            {file ? (
              <img
                className="writeImg"
                src={URL.createObjectURL(file)}
                alt="uploaded photo"

              />
            ) : (
              <img
                className="writeImg"
                src={
                  "https://images.unsplash.com/photo-1558478551-1a378f63328e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80"
                }
                alt="default photo"
              />
            )}

            <form className="writeForm" onSubmit={handleSubmit}>
              <div className="writeFormGroup">
                <div className="photo-upload-container1">
                  <span>Upload Photo</span>
                  <label htmlFor="fileInput">
                    <FaPlusCircle style={{ fontSize: "35px", color: 'gray' }} />
                  </label>
                  <input
                    type="file"
                    id="fileInput"
                    onChange={(e) => setFile(e.target.files[0])}
                    required
                    
                  />
                </div>
                <input
                  type="text"
                  placeholder="Title goes here..."
                  autoFocus={true}
                  ref={titleRef}
                />
              </div>
              <div className="write-text-area">
                <textarea
                  placeholder="Tell your story..."
                  type="text"
                  ref={descRef}
                ></textarea>
              </div>
              <div className="write-btn-container">

                <button
                  className="writeSubmitprivate"
                  type="submit"
                  onClick={() => setIsPrivate(false)}
                >
                  Publish
                </button>
                <button
                  className="writeSubmitpublic"
                  type="submit"
                  onClick={() => setIsPrivate(true)}
                >
                  Save as Draft
                </button>
              </div>
            </form>
            <div className="horizontal-line"></div>
          </div>
        )
      }
      <FooterNew />
    </>
  );
}
