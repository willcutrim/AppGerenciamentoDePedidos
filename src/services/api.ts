import axios, { AxiosInstance } from "axios";

const api = axios.create({
    baseURL: 'http://10.0.2.2:8000/',
})


export { api }