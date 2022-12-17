import { useContext } from "react";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { Context } from "../../context/Context";
import Loader from "../../Components/Loader/Loader";
import image from '../../Photo/loginImage.jpg'
// importing api
import { signupUser } from '../../apiCalls'

// external libraray for error handling
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// styles
import "./signup.styles.scss";
import { FaPlusCircle } from "react-icons/fa";

export default function Signup() {
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState(null)
  const [showPass, setShowPass] = useState(false);
  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true)
    function handleError(err) {
      toast.error(err, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    const data = new FormData()
    data.append("email", emailRef.current.value)
    data.append("username", usernameRef.current.value)
    data.append("password", passwordRef.current.value)
    if (file) {
      data.append("image", file)
    }
    try {
      await signupUser(data)
      window.location.replace("/login")
      setLoading(false)
    } catch (err) {
      handleError(err.data.error);
      setLoading(false)
    }
  };
  return (
    <div className="signup-page">
      <div>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
      <Link to="/">
        <h1 className="signup-header">REIGSTER</h1>
      </Link>
      <div className="left-info-continer">
        <div className="information">
          <img
            style={{
              objectFit: "contain",
              height: "100%",
              width: "100%",
            }}
            src={image}
            alt="signup_img"
          />
        </div>
      </div>
      <div
        className="right-signup-container"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <form style={{ marginBottom: "30px" }} onSubmit={handleClick}>
          <div className="input-container">
            <input
              type={showPass ? "text" : "text"}
              name="username"
              required={true}
              autoComplete="off"
              ref={usernameRef}
            />
            <label htmlFor="form-input-fullName">Username</label>
          </div>
          <div className="input-container">
            <input
              type={showPass ? "text" : "text"}
              name="email"
              required={true}
              autoComplete="off"
              ref={emailRef}
            />
            <label htmlFor="form-input-fullName">Email</label>
          </div>
          <div className="input-container">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              required={true}
              autoComplete="off"
              ref={passwordRef}
            />
            <label htmlFor="form-input-fullName">Password</label>
          </div>
          <div className="photo-upload-container">
            <span>Upload Photo</span>
            <label htmlFor="fileInput">
              <FaPlusCircle style={{ fontSize: "35px", color: 'gray' }} />
            </label>
            <input
              type="file"
              id="fileInput"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </div>
          <div className="checkbox-container">
            <input type="checkbox" onClick={() => setShowPass(!showPass)} />
            <label htmlFor="showPassword" className="signup-checkbox">
              Show Password
            </label>
          </div>
          <Link to="/login">
            <span
              className="signupWrapper"
              style={{ marginTop: "40px", color: "white" }}
            >
              Already have an account?
              <span>LOGIN</span>
            </span>
          </Link>

          <div className="btn-container">
            <button type="submit">Register</button>
            {loading && <Loader />}
          </div>
        </form>
      </div>
    </div>
  );
}
