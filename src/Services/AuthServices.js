
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const registerUser = (data) => {
return axios.post(`${BASE_URL}/user/register`, data);
};

const loginUser = (data) => {
return axios.post(`${BASE_URL}/user/login`, data);
};

const AuthServices = {
registerUser,
loginUser,
};

export default AuthServices;
