import PostCard from "../../Components/Post cards/PostCard";
import './Page2.styles.scss'
import EditorData from "../../Static Data/editorData";
export default function Page2() {
    return (
        <div className="page2-container">
            <div className="page2-heading">
                Editor's Choice
            </div>
            <div className="page2-wrapper">
                {
                    EditorData.map((d) => {
                        return (
                            <PostCard key={d.id} id={d.id} title={d.title}

                                description={d.description}
                                imageURL={d.imagePath}
                                date={d.createdAt}
                            />
                        )
                    })
                }

            </div>
        </div>
    )
}