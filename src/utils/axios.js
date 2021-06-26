import Axios from 'axios'

const axios = Axios.create({ baseURL: process.env.VUE_APP_BASE_URL });

axios.interceptors.response.use(res => {
    return res.data
}, err => {
    console.log(err);
    return new Promise.reject(err)
})

axios.interceptors.request.use(config => {
    const token = localStorage.getItem('')
    config.withCredentials = true
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, err => {
    console.log(err);
    return new Promise.reject(err)
})

export default axios