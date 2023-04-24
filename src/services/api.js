import axios from "axios";

const baseApiUrl = 'http://localhost:3000/users';

const api = axios.create({
    baseURL: baseApiUrl
})

export default api;