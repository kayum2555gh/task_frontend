

const BASE_URL = import.meta.env.VITE_BASE_URL;
import axios from 'axios'

const registerUser = (data) =>{
    return axios.post(`${BASE_URL}/user/register`, data)
}

const loginUser  = async (data) => {
    return await axios.post(`${BASE_URL}/user/login`, data)
}


const AuthServices = { registerUser, loginUser }
export default AuthServices ;