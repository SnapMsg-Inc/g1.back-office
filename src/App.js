import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Header from "./pages/header";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import { AuthenticationContextProvider } from "./auth/context/authenticationContext";

function App() {
    return (
        <AuthenticationContextProvider>
            <Header/>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/sign-in"} element={<Login/>} />
                <Route path={"/dashboard"} element={<Dashboard/>}/>
            </Routes>
        </AuthenticationContextProvider>
    );
}

export default App;
