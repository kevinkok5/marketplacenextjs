"use server";

import "server-only";
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { StorePayload } from "./utils";

// export interface tokenSession {
//     token?: {
//         refresh: string;
//         access: string;
//     };
//     expires?: string;
//     iat: number; // Issued at time in seconds
//     exp: number; // Expiration time in seconds
// }

export interface storeTokenSession {
    token?: StorePayload;
}
type StoreTokenPayload = {
    token: storeTokenSession;
};

const key = new TextEncoder().encode(process.env.NEXT_SECRET);

export async function encryptStore(payload: JWTPayload | undefined) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("90day")
        .sign(key);
}

export async function decryptStore(
    session: string | undefined
): Promise<StoreTokenPayload | null> {
    if (!session) return null;
    try {
        const { payload } = await jwtVerify(session, key, {
            algorithms: ["HS256"],
        });
        return <StoreTokenPayload>payload;
    } catch (error) {
        return null;
    }
}

export const createStoreSession = async (token: JWTPayload | undefined) => {
    const cookie = {
        name: "Store-session",
        options: {
            httpOnly: true,
            secure: true,
            sameSite: "lax" as const, // Ensure this is 'strict' | 'lax' | 'none'
            path: "/",
        },
        duration: 1000 * 60 * 60 * 24 * 90,
    };

    const expires = new Date(Date.now() + cookie.duration);
    const session = await encryptStore({ token, expires });
    // console.log("after: " + session);

    // console.log("session created");

    cookies().set(cookie.name, session, { ...cookie.options, expires });
    redirect("/manage");
};

export const verifyStoreSession = async (): Promise<StoreTokenPayload> => {
    const cookie = {
        name: "Store-session",
        options: {
            httpOnly: true,
            secure: true,
            sameSite: "lax" as const, // Ensure this is 'strict' | 'lax' | 'none'
            path: "/",
        },
        duration: 1000 * 60 * 60 * 24 * 21,
    };

    const storedCookie = cookies().get(cookie.name)?.value;
    if (!storedCookie) redirect("/store");
    const session = await decryptStore(storedCookie);
    if (!session?.token) redirect("/store");

    return <StoreTokenPayload>session;
};

export const deleteStoreSession = async () => {
    const cookie = {
        name: "Store-session",
    };

    cookies().delete(cookie.name);
    redirect("/store");
};
