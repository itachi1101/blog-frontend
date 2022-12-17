import { useEffect } from 'react'
import { useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Context } from '../../context/Context'
import Logo from '../../Photo/logo.png'

import './Header.styles.scss'


export default function HeaderNew() {
    const [currentUser, setCurrentUser] = useState(null)
    const { user, dispatch } = useContext(Context)
    const history = useHistory()
    useEffect(() => {
        if (user) {
            setCurrentUser(user.username)
        }
    }, [user])
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" })
        localStorage.removeItem("User")
        window.location.reload()
    }
    return (
        <div className="header-container">
            <div className="wrapper">
                <Link to="/">

                    <div className="logo">
                        <img src={Logo} />
                    </div>
                </Link>
                <div className="links-container">

                    <Link to="/posts" className="link-style">POSTS</Link>
                    <Link to="/write" className="link-style">WRITE</Link>
                    <Link to="/about" className="link-style">ABOUT</Link>
                </div>
                {
                    !currentUser ? (
                        <div className="login-container">

                            <Link to="/login" className="link-btn">
                                LOGIN
                            </Link>
                        </div>
                    ) : <div className="login-container">
                        <div className="photo-name-container">
                            <span>Welcome {currentUser.split(' ')[0]}</span>
                            <Link to="/profile">
                                <div className="img-container">
                                    <img src={user.imagePath} />
                                </div>
                            </Link>
                        </div>
                        <div onClick={handleLogout} className="link-btn1">
                            LOGOUT
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}