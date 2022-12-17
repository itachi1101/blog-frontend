import './FooterNew.styles.scss'
import { FaHeart } from "react-icons/fa";
export default function FooterNew() {
    return (
        <div className="footer-new-container">
            <h1>Made With <FaHeart style={{color:"coral"}}/></h1>
            <h2>Aviral Budhani</h2>
            <span>Copyright @2022</span>
        </div>
    )
}