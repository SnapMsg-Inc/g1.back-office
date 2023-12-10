import axios from "axios";

const URL = 'https://api-gateway-marioax.cloud.okteto.net/admin/'

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
        url: `${URL}users/${uid}`,
        headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type' : 'application/json',
        }
    })

export const DeleteRegisterAdmin = (token, uid) =>
    axios({
        method: 'delete',
        url: `${URL}users/${uid}`,
        headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type' : 'application/json',
        }
    })
