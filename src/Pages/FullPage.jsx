import FooterNew from "../Components/FooterNew/FooterNew";
import HeaderNew from "../Components/Header/Header";
import AdSection from "./AdPage/AdSection";
import HomePageNew from "./HomePage/HomePage1";
import LatestBlogsSection from "./Latest Blogs/LatestBlogsSection";
import Page2 from "./Section 2/Page2";


export default function FullPage() {
    return (
        <div className="fullpage-container">
            <HeaderNew/>
            <HomePageNew />
            <Page2 />
            <AdSection />
            <LatestBlogsSection />
            <FooterNew/>
        </div>
    )
}