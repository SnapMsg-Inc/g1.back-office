import { createContext, useState, useReducer } from "react"
import { SignInReducer } from "./signinReducer"
import { LoginAccount, LogoutAccount, LoginFederate } from "../authentication"
import firebaseApp from "../firebase"
import { getAuth } from "firebase/auth"
import { useEffect } from "react"
// import { GetUser } from "../service/userService"
import { useNavigate } from "react-router-dom"

export const AuthenticationContext = createContext()

export const AuthenticationContextProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    // const [data, setData] = useState(null)
    const navigate = useNavigate()
    const [signedIn, dispatchSignedIn] = useReducer(SignInReducer,{
        userToken:null,
    })
    
    useEffect(()=>{
        const checkAuth = () => {
            getAuth(firebaseApp).onAuthStateChanged((userCredential) => {
                if (userCredential) {
                    console.log('creation: ', userCredential.metadata.creationTime)
                    console.log('sigintime: ', userCredential.metadata.lastSignInTime)
                    dispatchSignedIn({type:"SIGN_IN", payload: "signed_in"})
                    navigate('/dashboard')
                } else {
                    dispatchSignedIn({type:"SIGN_OUT"})
                }
            })
        }
        checkAuth()
    },[navigate])

    const onLogin = (email, password) => {
        setIsLoading(true)
        setError(false)
        LoginAccount(email, password)
        .then((userCredential) => {
            const {uid} = userCredential.user
            console.log(uid)
            dispatchSignedIn({type:"SIGN_IN", payload: "signed_in"})
            console.log('Inicie sesion')
            // GetUser(setData)
            setIsLoading(false)
        })
        .catch((error) => {
            alert('Invalid username or password.\nPlease check your credentials and try again.')
            dispatchSignedIn({type: 'SIGN_OUT'})
            setError(true)
            setIsLoading(false)
        })
    }

    const onLoginFederate = (credential) => {
        setIsLoading(true)
        setError(false)
        LoginFederate(credential)
        .then((userCredential) => {
            const { uid } = userCredential.user
            console.log(uid)
            setIsLoading(false)
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
                onLogin,
                onLogout,
                onLoginFederate,
            }}>
            {children}
        </AuthenticationContext.Provider>
    )
}