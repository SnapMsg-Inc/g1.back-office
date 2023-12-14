import axios from "axios";

const URL = 'https://gateway-api-api-gateway-marioax.cloud.okteto.net/admin/'

export const BlockPost = (token, pid) => 
    axios({
        method: 'post',
        url: `${URL}posts/${pid}/block`,
        headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type' : 'application/json',
        }
    })

export const UnblockPost = (token, pid) => 
    axios({
        method: 'delete',
        url: `${URL}posts/${pid}/block`,
        headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type' : 'application/json',
        }
    })

export const RegisterAdmin = (token, uid) =>
    axios({
        method: 'post',
        url: `${URL}${uid}`,
        headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type' : 'application/json',
        }
    })

export const DeleteRegisterAdmin = (token, uid) =>
    axios({
        method: 'delete',
        url: `${URL}${uid}`,
        headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type' : 'application/json',
        }
    })

export const BlockUser = (uid, token) =>
    axios({
        method: 'post',
        url: `${URL}users/${uid}/block`,
        headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type' : 'application/json',
        }
    })

export const UnblockUser = (uid, token) =>
    axios({
        method: 'delete',
        url: `${URL}users/${uid}/block`,
        headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type' : 'application/json',
        }
    })
