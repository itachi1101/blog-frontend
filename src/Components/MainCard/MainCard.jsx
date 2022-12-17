import { Link } from 'react-router-dom'
import image from '../../Photo/main-card-image.jpg'
import './MainCard.styles.scss'
export default function MainCard({ id }) {
    return (
        <div className="maincard-container">
            <div className="image-container">
                <img src={image} />
            </div>
            <div className="date">2022-12-17 06:38:31.966Z</div>
            <div className="heading">
                <Link style={{ color: "white" }} to={`/post/${id}`}>
                    <span>
                        Get Started With Your Blog
                    </span>
                </Link>
            </div>
            <div className="text">1. To create account : Go to login -> then go to SignUp -> Enter Details and You are done ! 2. Write First Blog: Go to write in the navbar -> write your article -> your content -> upload a photo and publish. You are done. 3. Wanna Edit: Go to your post click Edit and then update . You are done!</div>
        </div>
    )
}