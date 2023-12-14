import axios from "axios";

const URL = 'https://gateway-api-api-gateway-marioax.cloud.okteto.net/admin/posts'

export const GetPostByNick = async (token, nick) => 
    await axios.get(
        `${URL}?nick=${nick}&limit=5&page=0`,
        {
            headers: {
                'Authorization' : `Bearer ${token}`,
                'Content-Type' : 'application/json',
            }
        }
    )

export const GetPostNick = async (token, nick) => 
    await axios.get(
        `${URL}?nick=${nick}&limit=16&page=0`,
        {
            headers: {
                'Authorization' : `Bearer ${token}`,
                'Content-Type' : 'application/json',
            }
        }
    )
        
export const GetPosts = async (token, page) =>
    await axios.get(
        `${URL}?limit=16&page=${page}`,
        {
            headers: {
                'Authorization' : `Bearer ${token}`,
                'Content-Type' : 'application/json',
            }
        }   
    )
    
export const GetPostByText = async (token, text, page) =>
    await axios.get(
        `${URL}?text=${text}&limit=16&page=${page}`,
        {
            headers: {
                'Authorization' : `Bearer ${token}`,
                'Content-Type' : 'application/json',
            }
        }   
    )

const URL_TRENDINGS = 'https://gateway-api-api-gateway-marioax.cloud.okteto.net/trendings'

export const GetTrendingsPost = async (token) =>
    await axios.get(
        `${URL_TRENDINGS}?limit=10&page=0`,
        {
            headers: {
                'Authorization' : `Bearer ${token}`,
                'Content-Type' : 'application/json',
            }
        } 
    )