import axios from "axios";
import { getAuth, getIdToken } from "firebase/auth";
import firebaseApp from "../firebase";

const URL = `${process.env.REACT_APP_URL_USERS}`

console.log(URL)

const getToken = () =>
    getIdToken(getAuth(firebaseApp).currentUser, true)

export const GetUser = (uid, state) => {
    getToken().then(async (token) => {
        console.log(`id-token: ${token}`)
        await axios.get({
            url: `https://api-gateway-marioax.cloud.okteto.net/users/me`,
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Authorization' : `Bearer ${token}`,
              //  'Content-Type' : 'application/json',
                //'X-Requested-With': 'XMLHttpRequest'
            },
        })
        .then((response) => {
            console.log(response)
            // state(response.data)
        })
        .catch(() => {
            
        })
    })
}
