import router from "@/router"
import Axios from 'axios'

const axios = Axios.create({ baseURL: process.env.VUE_APP_BASE_URL });

axios.interceptors.response.use(res => {
    return res.data
}, err => {
    if (err.response.status === 401) {
        router.replace('/login')
        localStorage.clear()
    }
})

axios.interceptors.request.use(config => {
    const token = localStorage.getItem('besafe')
    config.withCredentials = true
    config.headers.common['Access-Control-Allow-Origin'] = process.env.VUE_APP_BASE_URL
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, err => {
    return new Promise.reject(err)
})

export default axios