import { Route, Routes } from "react-router-dom";
import ProfileNav from "../pages/scenes/profileNav";
import Me from "../pages/scenes/me";
import Users from "../pages/scenes/users";
import Posts from "../pages/scenes/posts";
import Dashboard from "../pages/scenes/dashboard";
import Profile from "../pages/scenes/profile";
import Post from "../pages/scenes/post";
import styles from '../styles/navigation/loggedNavigation.module.css'
import NotFoundLogged from "../pages/notFoundLogged";

export default function LoggedNavigation () {
    return (
        <div className={styles.container}>
            <ProfileNav/>
            <Routes>
                <Route path={"/me"} element={<Me/>}/>
                <Route path={"/users"} element={<Users/>}/>
                <Route path={"/posts"} element={<Posts/>}/>
                <Route path={"/dashboard"} element={<Dashboard/>}/>
                <Route path={"/profile/:uid"} element={<Profile/>}/>
                <Route path={"/post/:pid"} element={<Post/>}/>
                <Route path="*" element={<NotFoundLogged/>} />
            </Routes>
        </div>
    )
}