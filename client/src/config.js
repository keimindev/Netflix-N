import axios from "axios";

export const axiosInstance = axios.create({
    baseURL : "https://netflix-projext.herokuapp.com/api/"
})