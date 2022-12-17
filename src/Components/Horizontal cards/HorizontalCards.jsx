import './HorizontalCard.styles.scss'
import { Link } from 'react-router-dom'
export default function HorizontalCard(props) {
    return (
        <div className="horizontal-card-container">
            <div className="image-container">
                <img src={props.url} />
            </div>
            <div className="wrapper">
                <div className="date">{props.date}</div>
                <Link to={`/post/${props.id}`}>

                    <h1 className="heading">{props.title}</h1>
                </Link>
            </div>
        </div>
    )
}