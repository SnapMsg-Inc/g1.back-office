import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Header from "./pages/header";

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/sign-in" element={<Login/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
