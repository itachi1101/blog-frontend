import { Link } from "react-router-dom";
import "./PostCard.styles.scss";

export default function PostCard({ id, title, description, imageURL, date }) {
    return (
        <div className="post">
            <img
                className="postImg"
                src={imageURL}
                alt=""
            />
            <div className="postInfo">
                <div className="postCats">
                    <span className="postCat">
                        Music
                    </span>
                    <span className="postCat">
                        Life
                    </span>
                </div>
                <span className="postTitle">
                    <Link to={`/post/${id}`} className="link">
                        {title}
                    </Link>
                </span>
                <div className="hr"></div>
                <span className="postDate">{date}</span>
            </div>
            <p className="postDesc">
                {description}
            </p>
        </div>
    );
}