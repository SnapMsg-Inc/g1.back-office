import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthenticationContext } from "./auth/context/authenticationContext";
import ProfileNav from "./pages/scenes/profileNav";
import Header from "./pages/init/header";
import Home from "./pages/init/home";
import Login from "./pages/init/login";
import Users from "./pages/scenes/users";
import Profile from "./pages/scenes/profile";
import Me from "./pages/scenes/me";

function App() {
    const  { isAuthenticated } = useContext(AuthenticationContext)

    const style = isAuthenticated ? "dashboard" : "App"

    return (
        <div className={style}>
            {isAuthenticated ? <ProfileNav/> : <Header/> }
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/sign-in"} element={<Login/>} />
                <Route path={"/users"} element={<Users/>}/>
                <Route path={"/me"} element={<Me/>}/>
                <Route path={"/profile/:uid"} element={<Profile/>}/>
            </Routes>
        </div>
    );
}

export default App;
