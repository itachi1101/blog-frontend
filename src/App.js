import Login from "./Pages/Login/login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";



import Signup from "./Pages/Signup/signup";
import About from "./Pages/About Us/About";
import WritePage from "./Pages/Write/WritePage";
import FullPage from "./Pages/FullPage";
import FullPageBlog from "./Components/FullPageBlog/FullPageBlog";
import AllPostsPage from "./Pages/AllPost/AllPosts";
import ProfilePage from "./Pages/Settings/settings.jsx";


import './App.styles.scss'
import { useContext } from "react";
import { Context } from "./context/Context";
import UserProfilePage from "./Pages/ProfilePage/ProfilePage";


export default function App() {
  const { user } = useContext(Context)
  return (
    <div>

      <Router>
        <Switch>
          <Route exact path="/">
            <FullPage />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/write">
            {

              user ? <WritePage /> : <Login />
            }
          </Route>
          <Route path="/posts">
            <AllPostsPage />
          </Route>
          <Route path="/post/:id">
            <FullPageBlog />
          </Route>
          <Route path="/user/:id">
            <UserProfilePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
