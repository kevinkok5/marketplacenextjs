"use server";

import "server-only";
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// const isDev = process.env.NODE_ENV !== "production";
const isDev = true;

export interface tokenSession {
    token?: {
        refresh: string;
        access: string;
    };
    expires?: string;
    iat: number; // Issued at time in seconds
    exp: number; // Expiration time in seconds
}

const key = new TextEncoder().encode(process.env.NEXT_SECRET);

export async function encrypt(payload: JWTPayload | undefined) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("21day")
        .sign(key);
}

export async function decrypt(
    session: string | undefined
): Promise<tokenSession | null> {
    if (!session) return null;
    try {
        const { payload } = await jwtVerify(session, key, {
            algorithms: ["HS256"],
        });
        return <tokenSession>payload;
    } catch (error) {
        return null;
    }
}

export const createSession = async (token: JWTPayload | undefined) => {
    const cookie = {
        name: "session",
        options: {
            httpOnly: !isDev, // Disable only in dev
            secure: !isDev, // Secure only in prod
            sameSite: isDev ? ("lax" as const) : ("strict" as const),
            path: "/",
        },
        duration: 1000 * 60 * 60 * 24 * 21,
    };

    const expires = new Date(Date.now() + cookie.duration);
    const session = await encrypt({ token, expires });
    // console.log("after: " + session);

    // console.log("session created");

    (await cookies()).set(cookie.name, session, { ...cookie.options, expires });
    // redirect("/");
};

export const verifySession = async (): Promise<tokenSession> => {
    const cookie = {
        name: "session",
        options: {
            httpOnly: !isDev, // Disable only in dev
            secure: !isDev, // Secure only in prod
            sameSite: isDev ? "lax" : "strict",
            path: "/",
        },
        duration: 1000 * 60 * 60 * 24 * 21,
    };

    // const awaitedCookie = await cookies(); // Await cookies() first

    const storedCookie = (await cookies()).get(cookie.name)?.value;
    if (!storedCookie) redirect("/auth");
    const session = await decrypt(storedCookie);
    if (!session?.token) redirect("/auth");

    return <tokenSession>session;
};

export const deleteSession = async () => {
    const cookie = {
        name: "session",
        options: {
            httpOnly: !isDev, // Disable only in dev
            secure: !isDev, // Secure only in prod
            sameSite: isDev ? "lax" : "strict",
            path: "/",
        },
        duration: 1000 * 60 * 60 * 24 * 21,
    };
    const awaitedCookie = await cookies(); // Await cookies() first

    awaitedCookie.delete(cookie.name);
    return { success: true };
};
