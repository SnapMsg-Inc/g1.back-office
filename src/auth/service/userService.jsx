import axios from "axios";
import { getAuth, getIdToken } from "firebase/auth";
import firebaseApp from "../firebase";

const URL = process.env.REACT_APP_URL_USERS

const getToken = () =>
    getIdToken(getAuth(firebaseApp).currentUser, true)
    

export const GetUser = (state) => {
    getToken().then((token) => {
        console.log(`Token: ${token}`)
        axios.get({
            url: `${URL}/users/me`,
            headers: {
                'Authorization' : `Bearer ${token}`,
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Origin': "*"
            }
        })
        .then((response) => {
            state(response.data)
        })
    })
}
