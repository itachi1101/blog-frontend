import { useContext } from "react";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { Context } from "../../context/Context";
import Loader from "../../Components/Loader/Loader";
import image from '../../Photo/loginImage.jpg'
// importing api
import { loginUser } from '../../apiCalls'

// external libraray for error handling
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// styles
import "./login.styles.scss";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [showPass, setShowPass] = useState(false);
  const { isFetching, dispatch } = useContext(Context);
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
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const user = await loginUser(
        emailRef.current.value,
        passwordRef.current.value
      );
      localStorage.setItem("User", JSON.stringify(user));
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
      window.location.replace("/")
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.data });
      handleError(err.data.error);
    }
  };
  return (
    <div className="login-page">
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
        <h1 className="login-header">LOGIN</h1>
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
            alt="login_img"
          />
        </div>
      </div>
      <div
        className="right-login-container"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <form style={{ marginBottom: "30px" }} onSubmit={handleClick}>
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
          <div className="checkbox-container">
            <input type="checkbox" onClick={() => setShowPass(!showPass)} />
            <label htmlFor="showPassword" className="login-checkbox">
              Show Password
            </label>
          </div>
          <Link to="/signUp">
            <span
              className="loginWrapper"
              style={{ marginTop: "40px", color: "white" }}
            >
              Don't have an account?
              <span>Sign-Up</span>
            </span>
          </Link>

          <div className="btn-container">
            <button type="submit">LOGIN</button>
            {isFetching && <Loader />}
          </div>
        </form>
      </div>
    </div>
  );
}
