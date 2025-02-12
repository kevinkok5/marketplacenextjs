"use server";

import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import { fetchData, fetchOptions } from "./utils";
import { createSession, decrypt, verifySession } from "./session";
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

        if (token.error) {
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

export const isTokenExpired = async (token: string) => {
    //this function is the same as the one in the utils package
    const decodedToken: any = jwtDecode(token);
    return dayjs.unix(decodedToken.exp).diff(dayjs()) < 1;
};

export const getAccessToken = async () => {
    let accessToken: string | null = null;

    const cookie = cookies().get("session")?.value;
    // console.log("before: " + cookie);
    const session = await decrypt(cookie);
    if (session && session.token) {
        const { refresh, access } = session.token;
        if (!(await isTokenExpired(access))) {
            accessToken = access;
        } else {
            console.log("Access token expired");
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

    const cookie = cookies().get("Store-session")?.value;

    const session = await decryptStore(cookie);
    if (session && session.token?.token) {
        const { id } = session.token.token;
        storeId = id;
    }
    return storeId; // returning null if no session found
};
