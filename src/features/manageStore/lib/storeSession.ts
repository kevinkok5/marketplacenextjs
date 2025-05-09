"use server";

import "server-only";
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { StorePayload } from "./utils";

// const isDev = process.env.NODE_ENV !== "production";
const isDev = true;
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
            httpOnly: !isDev, // Disable only in dev
            secure: !isDev, // Secure only in prod
            sameSite: isDev ? ("lax" as const) : ("strict" as const),
            path: "/",
        },
        duration: 1000 * 60 * 60 * 24 * 90,
    };

    const expires = new Date(Date.now() + cookie.duration);
    const session = await encryptStore({ token, expires });
    // console.log("after: " + session);

    // console.log("session created");
    const awaitedCookie = await cookies(); // Await cookies() first

    awaitedCookie.set(cookie.name, session, { ...cookie.options, expires });
    // redirect("/manage");
    return { success: true };
};

export const verifyStoreSession = async (): Promise<StoreTokenPayload> => {
    const cookie = {
        name: "Store-session",
        options: {
            httpOnly: !isDev, // Disable only in dev
            secure: !isDev, // Secure only in prod
            sameSite: isDev ? "lax" : "strict",
            path: "/",
        },
        duration: 1000 * 60 * 60 * 24 * 21,
    };

    const awaitedCookie = await cookies(); // Await cookies() first

    const storedCookie = awaitedCookie.get(cookie.name)?.value;
    console.log("store cookie: " + storedCookie);
    if (!storedCookie) redirect("/store");
    const session = await decryptStore(storedCookie);
    if (!session?.token) redirect("/store");

    return <StoreTokenPayload>session;
};

export const deleteStoreSession = async () => {
    const cookie = {
        name: "Store-session",
    };

    const awaitedCookie = await cookies(); // Await cookies() first

    awaitedCookie.delete(cookie.name);
    redirect("/store");
};
