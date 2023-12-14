import { useContext } from "react";
import { AuthenticationContext } from "./auth/context/authenticationContext";
import LoggedNavigation from "./navigation/homeNavigation";
import Init from "./navigation/navigation";

function App() {
    const  { isAuthenticated } = useContext(AuthenticationContext)
    
    return (
        <div>
            <>
                {isAuthenticated ? <LoggedNavigation/> : <Init/>}
            </>
        </div>
    );
}

export default App;
