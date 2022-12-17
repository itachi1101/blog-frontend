import './AdSection.styles.scss'
import image from '../../Photo/adImage.png'
export default function AdSection(){
    return(
        <div className="ad-section-container">
            <div className="wrapper">
                    <img src={image}/>
            </div>
        </div>
    )
}