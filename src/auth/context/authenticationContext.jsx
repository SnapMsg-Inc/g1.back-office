import { createContext, useState, useReducer } from "react"
import { SignInReducer } from "./signinReducer"
import { LoginAccount, LogoutAccount } from "../authentication"
import firebaseApp from "../firebase"
import { getAuth } from "firebase/auth"
import { GetUser } from "../service/userService"

export const AuthenticationContext = createContext()

export const AuthenticationContextProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [data, setData] = useState(null)
    const [signedIn, dispatchSignedIn] = useReducer(SignInReducer,{
        userToken:null,
    })

    const checkAuth = () => {
        setIsLoading(true)
        getAuth(firebaseApp).onAuthStateChanged((userCredential) => {
            if (userCredential) {
                console.log('creation: ', userCredential.metadata.creationTime)
                console.log('sigintime: ', userCredential.metadata.lastSignInTime)
                dispatchSignedIn({type:"SIGN_IN", payload: "signed_in"})
                setIsLoading(false)
            } else {
                dispatchSignedIn({type:"SIGN_OUT"})
                setIsLoading(false)
            }
        })
    }

    const onLogin = (email, password) => {
        setIsLoading(true)
        setError(false)
        LoginAccount(email, password)
        .then((userCredential) => {
            dispatchSignedIn({type:"SIGN_IN", payload: "signed_in"})
            console.log('Inicie sesion')
            GetUser(setData)
            setIsLoading(false)
        })
        .catch((error) => {
            alert('Invalid username or password.\nPlease check your credentials and try again.')
            dispatchSignedIn({type: 'SIGN_OUT'})
            setError(true)
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
                checkAuth,
                onLogin,
                onLogout,
            }}>
            {children}
        </AuthenticationContext.Provider>
    )
}