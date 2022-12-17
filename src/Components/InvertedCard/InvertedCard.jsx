import { Link } from "react-router-dom";
import "./InvertedCard.styles.scss";
export default function InvertedPostCard({ id, imageURL, title, description, date }) {
    return (
        <div className="inverted-post">
            <img
                className="postImg"
                src={imageURL}
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