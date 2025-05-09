import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { decrypt, encrypt } from "./lib/session";
import { isTokenExpired, refreshToken } from "./lib/manageToken";

export default async function middleware(req: NextRequest) {
    const notProtectedRoutes = ["/auth"];
    const currentPath = req.nextUrl.pathname;
    // const isNotProtectedRoutes = notProtectedRoutes.includes(currentPath);

    if (notProtectedRoutes.includes(currentPath)) {
        return NextResponse.next();
    }
    const cookie = (await cookies()).get("session")?.value;
    const session = cookie ? await decrypt(cookie) : null;
    // console.log(session);

    if (!session?.token) {
        // return NextResponse.next();

        return NextResponse.redirect(new URL("/auth", req.nextUrl));
    }

    if (await isTokenExpired(session.token?.access)) {
        const cookie = {
            name: "session",
            options: {
                httpOnly: true,
                secure: true,
                sameSite: "lax" as const, // Ensure this is 'strict' | 'lax' | 'none'
                path: "/",
            },
            duration: 1000 * 60 * 60 * 24 * 21,
        };

        try {
            // console.log("INFO: Start refresh tokens");
            const token = await refreshToken(session.token?.refresh);

            // console.log("INFO: End refresh tokens");

            const response = NextResponse.redirect(new URL(req.nextUrl));

            const expires = new Date(Date.now() + cookie.duration);
            const newSession = await encrypt({ token, expires });
            // console.log("after: " + newSession);

            // console.log("session created");

            response.cookies.set(cookie.name, newSession, {
                ...cookie.options,
                expires,
            });
            return response;
        } catch (error) {}
    }

    if (currentPath === "/manage") {
        return NextResponse.redirect(new URL("/manage/me", req.nextUrl));
    }

    // Proceed with the request
    return NextResponse.next();
}

export const config = {
    matcher: "/((?!api|static|_next|auth|.*\\..*).*)", // Matches all paths except API, static files, _next, and file extensions
};
