import axios from "axios"

const axiosClient = axios.create()

axiosClient.interceptors.request.use((config) => {
    config.headers.Authorization = 'Test'
    return config
}, (err) => {
    return Promise.reject(err)
})

export default axiosClient
