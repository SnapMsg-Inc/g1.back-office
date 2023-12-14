import { Route, Routes } from "react-router-dom";
import Header from "../pages/init/header";
import Home from "../pages/init/home";
import Login from "../pages/init/login";
import styles from "../styles/navigation/init.module.css"
import NotFound from "../pages/notFound";

export default function Init () {

    return (
        <div className={styles.container}>
            <Header/>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/sign-in"} element={<Login/>}/>
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </div>
    )
}