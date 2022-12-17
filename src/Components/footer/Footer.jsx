import "./footer.styles.css";
import foot from "../../Images/foot.jpg";
export default function Footer() {
  return (
    <div className="footer">
      <hr></hr>
      <div className="footerContent">Made by Aviral</div>
      <div
        style={{
          backgroundImage: `url(${foot})`,
        }}
        className="footerImg"
      ></div>
    </div>
  );
}
