import axios from "axios";
import { getCookie, isTokenExpired } from "./utils";

const baseURL = process.env.BASE_URL as string;

const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    async (req) => {
        const accessToken = getCookie("access_token");
        if (accessToken && isTokenExpired(accessToken)) {
            try {
                const response = await axiosInstance.post(
                    "token/refresh/",
                    null
                );
                const newAccessToken = response.data.access;

                // Update the access token cookie
                document.cookie = `access_token=${newAccessToken}; HttpOnly; path=/;`;

                // Update the request headers with the new access token
                req.headers.Authorization = `Bearer ${newAccessToken}`;
            } catch (error) {
                console.error("Failed to refresh token:", error);
                // Handle token refresh failure (e.g., logout user)
            }
        } else if (accessToken) {
            // If token is not expired, use it in the headers
            req.headers.Authorization = `Bearer ${accessToken}`;
        }
        return req;
    },
    (error) => {
        return Promise.reject(error);
    }
);
