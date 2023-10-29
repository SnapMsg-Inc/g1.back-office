import axios from "axios";
import { getAuth, getIdToken } from "firebase/auth";
import firebaseApp from "../firebase";

const URL = `${process.env.REACT_APP_URL_USERS}`

console.log(URL)

const getToken = () =>
    getIdToken(getAuth(firebaseApp).currentUser, true)

export const GetUser = (uid, state) => {
    getToken().then((token) => {
        console.log(`Token: ${token}`)
        fetch({
            method: 'get',
            url: `${URL}/users/me`,
            headers: {
                'Authorization' : `Bearer ${token}`,
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Origin': "*"
            },
            // baseURL: `${ul}`,
        })
        .then((response) => {
            state(response.data)
        })
    })
}
