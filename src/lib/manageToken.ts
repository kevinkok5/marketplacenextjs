"use server";

import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import { fetchData, fetchOptions } from "./utils";
import { decrypt } from "./session";
import { cookies } from "next/headers";
import { unstable_noStore } from "next/cache";
import { decryptStore } from "@/features/manageStore/lib/storeSession";

const baseURL = process.env.API_BASE_URL;

export const refreshToken = async (
    refresh: string | undefined
): Promise<string | null> => {
    unstable_noStore();

    if (!refresh) return null;

    const fetchOptions: fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refresh }),
    };

    try {
        const token = await fetchData(
            `${baseURL}/token/refresh/`,
            fetchOptions
        );

        if (token.errors) {
            console.error("token error");
            return null;
        }

        // console.log("token refreshed successfully");

        // await createSession(token?.data);
        return token.data;
    } catch (error) {
        return null;
    }
};

export const isTokenExpired = async (token: string): Promise<boolean> => {
    if (!token) return true; // If no token is provided, treat it as expired

    try {
        const decodedToken: any = jwtDecode(token);
        if (!decodedToken.exp) return true; // If no expiration claim exists, treat it as expired

        return dayjs.unix(decodedToken.exp).diff(dayjs()) < 1;
    } catch (error) {
        console.error("Error decoding token:", error);
        return true; // If decoding fails, assume it's expired
    }
};

export const getAccessToken = async () => {
    let accessToken: string | null = null;

    const cookie = (await cookies()).get("session")?.value;
    // console.log("before: " + cookie);
    const session = await decrypt(cookie);
    if (session && session.token) {
        const { refresh, access } = session.token;
        if (!(await isTokenExpired(access))) {
            accessToken = access;
        } else {
            // console.log("Access token expired");
            accessToken = await refreshToken(refresh);
        }
    }
    return accessToken; // returning null if no access token found
};

export const getStoreSession = async () => {
    // This function reads the Store_session from the cookie
    // Decrypt the session using the decryptStore function
    // and if there is a session it reads it and returns the shop id else return null

    let storeId: string | null = null;

    const cookie = (await cookies()).get("Store-session")?.value;

    const session = await decryptStore(cookie);
    if (session && session.token?.token) {
        const { id } = session.token.token;
        storeId = id;
    }
    return storeId; // returning null if no session found
};
