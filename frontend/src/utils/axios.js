import axios from 'axios'
import { setAuthUser, getRefreshToken, isAccessTokenExpired, logout } from './auth'
import Cookies from 'js-cookie'

const apiInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/",
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})


// request interceptor 
apiInstance.interceptors.request.use(
    async (config) => {
        const access_token = Cookies.get('access_token')

        // if (access_token) {
        //     if (!isAccessTokenExpired(access_token))
        //     {
        //         config.headers.Authorization = `Bearer ${access_token}`
        //     } else 
        //     {
        //         const refresh_token = Cookies.get('refresh_token')

        //         if (refresh_token)
        //         {
        //             try{
        //                 const response = await getRefreshToken()
        //                 const newAccessToken = response.data.access
        //                 const newRefreshToken = response.data.refresh

        //                 setAuthUser(newAccessToken, newRefreshToken)
        //                 config.headers.Authorization = `Bearer ${newAccessToken}`
        //             }
        //             catch (error)
        //             {
        //                 console.error('token refresh failed:', error)
        //             }
        //         }
        //     }
        // }
        // return config

        if (!access_token) {
            return config
        }

        if (!isAccessTokenExpired(access_token)) {
            config.headers.Authorization = `Bearer ${access_token}`
        } else {
            const refreshToken = Cookies.get('refresh_token')

            if (refreshToken) {
                try {
                    const response = await getRefreshToken()
                    setAuthUser(response.data.access, response.data.refresh);
                    config.headers.Authorization = `Bearer ${response.data.access}`;
                } catch (error) {
                    console.error("token refresh failed:", error)
                    logout()
                }
            }
        }
    },
    (error) => Promise.reject(error)
)


apiInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401){
            console.error('unauthorized - please login again')
        }

        return Promise.reject(error)
    }
)

export default apiInstance