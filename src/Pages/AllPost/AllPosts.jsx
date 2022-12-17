import { useEffect, useState, useContext } from 'react'
import HeaderNew from '../../Components/Header/Header'
import InvertedPostCard from '../../Components/InvertedCard/InvertedCard';
import { getAllPosts } from '../../apiCalls';
import { Context } from '../../context/Context';
import FooterNew from '../../Components/FooterNew/FooterNew';

// third party
import { Button } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Components/Loader/Loader";


// styles
import './AllPosts.styles.scss'


export default function AllPostsPage() {
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const [numberOfPages, setNumberOfPages] = useState(0)
  const pages = new Array(numberOfPages).fill(null).map((v, i) => i)
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
      const data = await getAllPosts(pageNumber)
      setPosts(data.posts)
      setNumberOfPages(data.totalPages)
      setLoading(false)
    } catch (error) {
      handleError(error.message)
      setLoading(false)
    }
  }, [pageNumber])
  const gotoPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };
  const gotoNext = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };
  return (
    <>
      <HeaderNew />
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
      {loading ? <Loader /> :
        <div className="pagination-container">
          <div className="horizontal-line"></div>
          <div className="post-container">

            {
              posts.map((data) => {
                return (
                  <InvertedPostCard key={data._id} id={data._id} imageURL={data.imagePath} title={data.title} description={data.description} date={data.createdAt}/>
                )
              })
            }
          </div>
          <div className="btn-container">
            <Button variant="light" onClick={gotoPrevious}>
              Previous
            </Button>
            {pages.map((pageIndex) => (
              <Button
                variant="light"
                key={pageIndex}
                onClick={() => setPageNumber(pageIndex)}
              >
                {pageIndex + 1}
              </Button>
            ))}
            <Button variant="light" onClick={gotoNext}>
              Next
            </Button>
          </div>
        </div>
      }

      <FooterNew />
    </>
  )
}