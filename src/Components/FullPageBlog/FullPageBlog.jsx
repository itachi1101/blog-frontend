import './FullPageBlog.styles.scss'
import { AiTwotoneDelete } from "react-icons/ai";
import { FaPlusCircle, FaStickyNote, FaThumbsUp } from "react-icons/fa";
import { useContext, useState } from 'react';
import { useHistory, Link, useLocation } from 'react-router-dom';
import { Context } from '../../context/Context';
import { useEffect } from 'react';

import { deletePostById, getPostById, updatePostById } from '../../apiCalls';

import Loader from '../Loader/Loader';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FullPageBlog() {
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [date, setDate] = useState()
    const [imageURL, setImageURL] = useState()
    const [author, setAuthor] = useState()
    const [authorImage, setAuthorImage] = useState()
    const [authorId, setAuthorId] = useState()
    const [loading, setLoading] = useState(false)
    const [updatedMode, setUpdateMode] = useState(false)
    const { user } = useContext(Context)
    const [file, setFile] = useState(null);
    const history = useHistory()
    const [like, setLike] = useState(false)
    const location = useLocation()
    const path = location.pathname.split("/")[2];
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
    useEffect(async () => {
        setLoading(true)
        try {
            const { data: result } = await getPostById(path)
            setTitle(result.title)
            setDescription(result.description)
            setDate(result.createdAt)
            setImageURL(result.imagePath)
            setAuthor(result.author)
            setAuthorImage(result.authorImage)
            setAuthorId(result.authorId)
            setLoading(false)
        } catch (error) {
            handleError(error.message);
            setLoading(false)
        }
    }, [])
    const handleLike = async () => {

    }
    const handleDelete = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
        setLoading(true)
        try {
            await deletePostById(path, config)
            history.push("/")
            setLoading(false)
        } catch (error) {
            setLoading(false)
            handleError(error)
        }
    }
    const handleUpdate = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
        setLoading(true)
        const value = imageURL.split('/')[8]
        const publicId = value.split('.')[0]
        const imagePath = `post-photos/${publicId}`
        const data = new FormData()
        data.append("description", description)
        data.append("imagePublicId", imagePath)
        if (file) {
            data.append("image", file)
        }
        try {
            await updatePostById(config, data, path)
            setLoading(false)
            window.location.reload()
        } catch (error) {
            handleError(error)
            setLoading(false)
        }
    }

    return (
        <>
            {loading && <Loader />}
            <Link to="/" style={{ padding: "10px", color: "blue" }}>Go back</Link>
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
            <div className="fullPage-blog-container">
                <div className="wrapper">
                    <div className="publish-date">
                        Published on {date}
                    </div>
                    <div className="heading">{title}</div>
                    <div className="tags">
                        <span>Vacation</span>
                        <span>Holidays</span>
                        <span>Sight Seeing</span>
                    </div>
                    {
                        updatedMode ? (<div className="photo-upload-container">
                            <div className="blog-image">
                                <img src={file ? URL.createObjectURL(file) : imageURL} />
                            </div>
                            <div className="upload-container">

                                <span>Upload Photo</span>
                                <label htmlFor="fileInput">
                                    <FaPlusCircle style={{ fontSize: "35px", color: 'gray' }} />
                                </label>
                                <input
                                    type="file"
                                    id="fileInput"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </div>
                        </div>) : (<div className="blog-image">
                            <img src={imageURL} />
                        </div>)
                    }

                    <div className="author-details">
                        <Link to={`/user/${authorId}`}>
                            <div className="about">
                                <div className="author-image">
                                    <img src={authorImage} />
                                </div>
                                <div className="author-name">
                                    <span style={{ color: "black" }}>Author:</span> {author}
                                </div>
                            </div>
                        </Link>
                        <div className="like-btn" onClick={handleLike}>
                            <FaThumbsUp style={{ color: `${like ? "coral" : "gray"}` }} />
                        </div>

                    </div>
                    {
                        user && user._id === authorId && updatedMode === true ? (<textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{
                                border: "none",
                                fontSize: "18px",
                                lineHeight: "25px",
                                marginBottom: "30px",
                                width: "80%",
                                minHeight: "350px",
                                padding: "20px",
                                marginTop: "20px",
                                color: "black",
                            }}
                            autoFocus

                        />) : (<div className="text">
                            {description}
                        </div>)
                    }

                    {

                        user && user._id === authorId ? (

                            <div className="btn-container">
                                {
                                    updatedMode ?
                                        <span className="btn-update" onClick={handleUpdate}><FaStickyNote />UPDATE</span> :
                                        <span className="btn-update" onClick={() => setUpdateMode(!updatedMode)}><FaStickyNote />EDIT</span>
                                }

                                <span className="btn-delete" onClick={handleDelete}><AiTwotoneDelete />DELETE</span>
                            </div>
                        ) : ""
                    }
                </div>

            </div>
        </>
    )
}