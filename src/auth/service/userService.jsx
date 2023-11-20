import axios from "axios";
import { getIdToken } from "firebase/auth";
import { auth } from "../firebase";

const URL = 'https://api-gateway-marioax.cloud.okteto.net/users'

export const GetToken = async () => await getIdToken(auth.currentUser, true)

export const GetMe = async (token) =>
    await axios.get(
        `${URL}/me`,
    {
        headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type' : 'application/json',
        },
    })

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