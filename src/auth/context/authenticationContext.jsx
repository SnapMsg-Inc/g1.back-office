import { createContext, useState, useReducer } from "react"
import { SignInReducer } from "./signinReducer"
import { LoginAccount, LogoutAccount, LoginFederate } from "../authentication"
import { useEffect } from "react"
import { GetToken, GetMe } from "../service/userService"
import { browserLocalPersistence, onAuthStateChanged, setPersistence } from "firebase/auth"
import { auth } from "../firebase"

export const AuthenticationContext = createContext()

export const AuthenticationContextProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [permission, setPermission] = useState(true)
    const [error, setError] = useState(false)
    const [signedIn, dispatchSignedIn] = useReducer(SignInReducer,{
        userToken:null,
    })

    useEffect(()=>{
        const checkAuth = () => {
            setIsLoading(true);
            const unsubscribe = onAuthStateChanged(auth, (userCredential) => {
                if (userCredential) {
                    if (!permission) {
                        dispatchSignedIn({ type: "SIGN_OUT" });
                    } else {
                        setPersistence(auth, browserLocalPersistence);
                        dispatchSignedIn({ type: "SIGN_IN", payload: "signed_in" });
                    }
                } else {
                    dispatchSignedIn({ type: "SIGN_OUT" });
                }
                setIsLoading(false);
            });
            return () => unsubscribe();
        };
        checkAuth();
    }, [permission])

    const onLogin = (email, password, handleNavigate) => {
        setIsLoading(true)
        setError(false)
        setPermission(false)
        LoginAccount(email, password)
        .then((userCredential) => {
            console.log('Inicie sesion')
            GetToken()
            .then((token) => {
                GetMe(token)
                .then((response) => {
                    console.log(response.data)
                    // if (response.data.email !== "example@example.com") {
                    if (response.data.is_admin !== true) {
                        alert('Permission denied')
                        onLogout()
                    } else {
                        console.log(token)
                        dispatchSignedIn({type:"SIGN_IN", payload: "signed_in"})
                        setPermission(true)
                        handleNavigate('/users')
                    }
                    setIsLoading(false)
                })
                .catch((error) => {
                    console.log(error.response)
                    if (error.response.status === 502){
                        alert('Services not available.\nPlease retry again later')
                        onLogout()
                    }    
                    setIsLoading(false)
                })
            })
        })
        .catch((error) => {
            alert('Invalid username or password.\nPlease check your credentials and try again.')
            dispatchSignedIn({type: 'SIGN_OUT'})
            setError(true)
            setIsLoading(false)
        })
    }
    
    const onLoginFederate = (credential, handleNavigate) => {
        setIsLoading(true)
        setError(false)
        setPermission(false)
        LoginFederate(credential)
        .then((userCredential) => {
            const { uid } = userCredential.user
            console.log(uid)
            GetToken()
            .then((token) => {
                GetMe(token)
                .then((response) => {
                    console.log(response.data)
                    if (response.data.is_admin !== true) {
                        alert('Permission denied')
                        onLogout()
                    } else {
                        dispatchSignedIn({type:"SIGN_IN", payload: "signed_in"})
                        setPermission(true)
                        handleNavigate('/users')
                    }
                    setIsLoading(false)
                })
                .catch((error) => {
                    if (error.response.status === 502){
                        alert('Services not available.\nPlease retry again later')
                        onLogout()
                    }    
                    setIsLoading(false)
                })
            })
        })
        .catch((error) => {
            console.log(error)
            setIsLoading(false)
        })
    }
    
    const onLogout = () => {
        dispatchSignedIn({type:"SIGN_OUT"})
        LogoutAccount()
    }
    
    return (
        <AuthenticationContext.Provider
            value={{
                isAuthenticated: signedIn.userToken !== null, 
                isLoading,
                error,
                permission,
                onLogin,
                onLogout,
                onLoginFederate,
            }}>
            {children}
        </AuthenticationContext.Provider>
    )
}
