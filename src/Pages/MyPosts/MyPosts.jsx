import { useContext, useEffect, useState } from "react";
import AllPosts from "../AllPost/AllPosts";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context/Context";
import "./myPosts.styles.scss";


export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const { token } = useContext(Context);
  const history = useHistory();
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const fetchPosts = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/post/myposts/`,
        config
      );
      setPosts(data.data);
    };
    fetchPosts();
  }, [history]);

  return (
    <>
      <div className="header fontPersonal">
        <div className="headerTitles fontPersonal">
          <span className="headerTitleSm smallPersonal">Personal</span>
          <span className="headerTitleLg">Blogs</span>
        </div>
        <img
          className="headerImg"
          src="https://images.unsplash.com/photo-1530910417612-701222d79f2f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          alt=""
        />
      </div>
      <div>
        <AllPosts posts={posts} />
      </div>
    </>
  );
}
