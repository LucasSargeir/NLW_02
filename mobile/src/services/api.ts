import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.15.7:7777'
})

export default api;