import axios from "axios";
import { setAuthUser, getRefreshToken, isAccessTokenExpired } from "./auth";
import Cookie from 'js-cookie'


const useAxios = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/",
    timeout: 10000000,
    headers: {
        "Content-Type": "application/json",
    },
})


useAxios.interceptors.request.use(
    async (config) => {
        const accesToken = Cookie.get('access_token')

        if (accesToken) {
            config.headers.Authorization = `Bearer ${accesToken}`
        }

        if (isAccessTokenExpired(accesToken)) {
            const refreshToken = Cookie.get('refresh_token')
            if (refreshToken) {
                try {
                    const response = await getRefreshToken(refreshToken)

                    // update the token cookie and headers 
                    setAuthUser(response.data.access, response.data.refresh)
                    config.headers.Authorization = `Bearer ${response.data.access}`
                }
                catch(error) {
                    console.error('token refresh failed', error)
                }
            }
        }

        return config
    },
    (error) => Promise.reject(error)
)

// handling errors 
useAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        // handle specific error if needed 
        if (error.response && error.response.status === 401){
            console.error('unauthorized access - you need to log in:', error)
        }

        return Promise.reject(error)
    }
)
export default useAxios