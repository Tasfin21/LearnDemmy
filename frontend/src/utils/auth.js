import { useAuthStore } from "../store/auth";
import axios from './axios'
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'
import apiInstance from "./axios";

export const login = async (email, password) => {
  try {
    const response = await apiInstance.post("user/token/", {
      email: email.trim(),
      password,
    });

    const { access, refresh } = response.data;

    if (access && refresh) {
      setAuthUser(access, refresh);
      return { data: response.data, error: null };
    }

    return { data: null, error: "Tokens missing in response" };
  } catch (error) {
    return {
      data: null,
      error: error.response?.data?.detail || "Invalid email or password",
    };
  }
};


export const register = async (full_name, email, password, password2) => {
    try{
        const { data } = await apiInstance.post(`user/register/`, {
            full_name,
            email,
            password,
            password2,
        })

        // use for auto login 
        await login(email, password)

        return { data, error: null}
    } catch (error)
    {
        const errorMessage =
                error.response?.data?.full_name?.[0] ||
                error.response?.data?.email?.[0] ||
                error.response?.data?.password?.[0] ||
                error.response?.data?.detail || 
                "Something went wrong during registration";
        
        return {
            data: null,
            error: errorMessage,
        }
    }
}

// logout function here 
export const logout = () => {
    Cookies.remove('access_token')
    Cookies.remove('refresh_token')
    useAuthStore.getState().setUser(null)
}

export const setUser = async () => {
  const access_token = Cookies.get("access_token");
  const refresh_token = Cookies.get("refresh_token");

  if (!access_token || !refresh_token) {
    useAuthStore.getState().setLoading(false);
    return;
  }

  try {
    if (isAccessTokenExpired(access_token)) {
      const response = await getRefreshToken();
      setAuthUser(response.data.access, response.data.refresh);
    } else {
      setAuthUser(access_token, refresh_token);
    }
  } catch (error) {
    console.error("Failed to restore session:", error);
    logout();
  }
};

export const setAuthUser = (accessToken, refreshToken) => {
  if (!accessToken || !refreshToken) {
    console.error("Missing tokens");
    return;
  }

  Cookies.set("access_token", accessToken, { expires: 1, path: "/" });
  Cookies.set("refresh_token", refreshToken, { expires: 7, path: "/" });

  try {
    const user = jwtDecode(accessToken);
    useAuthStore.getState().setUser(user);
  } catch (error) {
    console.error("Failed to decode token:", error);
  }

  useAuthStore.getState().setLoading(false);
};

export const getRefreshToken = async () => {
  const refresh_token = Cookies.get("refresh_token");
  const response = await apiInstance.post("user/token/refresh/", {
    refresh: refresh_token,
  });
  return response;
};

export const isAccessTokenExpired = (access_token) => {
  if (!access_token || typeof access_token !== "string") return true;
  try {
    const decoded = jwtDecode(access_token);
    return decoded.exp < Date.now() / 1000;
  } catch {
    return true;
  }
};