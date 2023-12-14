import axios from "axios";
import { getIdToken } from "firebase/auth";
import { auth } from "../firebase";

const URL = 'https://gateway-api-api-gateway-marioax.cloud.okteto.net/users'
const URL_GET = 'https://gateway-api-api-gateway-marioax.cloud.okteto.net/admin/users'

export const GetToken = () => getIdToken(auth?.currentUser, false)

export const GetMe = async (token) =>
    await axios.get(
        `${URL}/me`,
        {
            headers: {
                'Authorization' : `Bearer ${token}`,
                'Content-Type' : 'application/json',
            },
        }
    )

export const GetUsers = async (token, page) =>
    await axios.get(
        `${URL}?limit=20&page=${page}`,
        {
            headers: {
                'Authorization' : `Bearer ${token}`,
                'Content-Type' : 'application/json',
            }
        }
    )
        
export const GetUsersByUid = async (token, uid) =>
    await axios.get(
        `${URL_GET}/${uid}`,
        {
            headers: {
                'Authorization' : `Bearer ${token}`,
                'Content-Type' : 'application/json',
            }
        }
        )
        
export const GetUserByNick = async (token, search, page) =>
    await axios.get(
        `${URL}?nick=${search}&limit=20&page=${page}`,
        {
            headers: {
                'Authorization' : `Bearer ${token}`,
                'Content-Type' : 'application/json',
            }
        }
    )