import axios from "axios";

const URL = 'https://api-gateway-marioax.cloud.okteto.net/posts'

export const GetPostByNick = async (token, nick) => 
    await axios.get(
        `${URL}?nick=${nick}&?limit=5&page=0`,
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