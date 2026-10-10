import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

function UserData() {
    const access_token = Cookies.get('access_token')
    const refresh_token = Cookies.get('refresh_token')

    if (!access_token || !refresh_token){
        return null
    }

    try {
        // prefer access_token for user data 
        const decode = jwtDecode(access_token)
        return decode
    } catch (error)
    {
        console.error('failed to decode token:', error)
        return null
    }
}

export default UserData