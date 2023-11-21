import { Routes, Route, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthenticationContext } from "./auth/context/authenticationContext";
import ProfileNav from "./pages/scenes/profileNav";
import Header from "./pages/init/header";
import Home from "./pages/init/home";
import Login from "./pages/init/login";
import Users from "./pages/scenes/users";
import Profile from "./pages/scenes/profile";
import Me from "./pages/scenes/me";
import Posts from "./pages/scenes/posts";
import Dashboard from "./pages/scenes/dashboard";
import Post from "./pages/scenes/post";

function App() {
    const  { isAuthenticated } = useContext(AuthenticationContext)
    const location = useLocation()
    const showHeader = location.pathname === '/' || location.pathname === '/sign-in'
    const style = isAuthenticated && !showHeader ? "dashboard" : "App"
    
    return (
        <div className={style}>
            {showHeader ? <Header/> : <ProfileNav/>}
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/sign-in"} element={<Login />}/>
                <Route path={"/me"} element={<Me/>}/>
                <Route path={"/users"} element={<Users/>}/>
                <Route path={"/posts"} element={<Posts/>}/>
                <Route path={"/dashboard"} element={<Dashboard/>}/>
                <Route path={"/profile/:uid"} element={<Profile/>}/>
                <Route path={"/post/:pid"} element={<Post/>}/>
            </Routes>
        </div>
    );
}

export default App;
