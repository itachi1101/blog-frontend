
import { useEffect, useState } from 'react'
import { getActivity } from '../../apiCalls'
import TrendingCard from '../../Components/Trending Cards/TrendingCards'
import './TopTrendingSection.styles.scss'
export default function TopTrendingSection() {
    const [post, setPost] = useState([])
    useEffect(async () => {
        try {
            const result = await getActivity()
            setPost(result)
        } catch (error) {
            console.log(error)
        }
    }, [])
    return (
        <div className="top-trending-section-container">
            <h1 className="top-trending-section-container-heading">
                Top Trending 🔥🔥
            </h1>
            <div className="top-trending-section-container-wrapper">
                {post.map(d => {
                    return (
                        <TrendingCard key={d._id} id={d.postId}/>
                    )
                })
                }
            </div>
            <div className='horizontal-line'></div>
        </div>
    )
}