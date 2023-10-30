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
        axios({
            method: 'get',
            url: `https://api-gateway-marioax.cloud.okteto.net/users/me`,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization' : `Bearer ${token}`,
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Origin': "*"
            },
            proxy: {
                protocol: 'http',
                host: 'api-gateway.marioax',
                port: 3000,
            },
            // baseURL: `${ul}`,
        })
        .then((response) => {
            console.log(response)
            // state(response.data)
        })
        .catch(() => {
            
        })
    })
}
