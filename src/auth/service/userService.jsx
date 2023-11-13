import axios from "axios";
import { getAuth, getIdToken } from "firebase/auth";
import firebaseApp from "../firebase";

const URL = `${process.env.REACT_APP_URL_USERS}`

console.log(URL)

const getToken = () =>
    getIdToken(getAuth(firebaseApp).currentUser, true)

export const GetUser = (uid, state) => {
    getToken().then((token) => {
        console.log(`id-token: ${token}`)
        axios.get(
            "https://api-gateway-marioax.cloud.okteto.net/users/me",
        {
            headers: {
                'Access-Control-Allow-Origin': "https://backoffice-backoffice-marioax.cloud.okteto.net/",
                'Authorization' : `Bearer ${token}`,
                'Content-Type' : 'application/json',
            },
        })
        .then((response) => {
            console.log(response)
            state(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    })
}
