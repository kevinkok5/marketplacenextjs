import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import { z } from "zod";
import crypto from "crypto";
import { unstable_noStore } from "next/cache";
import { NextRequest } from "next/server";

// Type | zod
export enum AuthType {
    SignIn = "sign-in",
    SignUp = "sign-up",
}
export const authFormSchema = (
    type: AuthType
): z.ZodObject<{
    name: z.ZodString | z.ZodOptional<z.ZodString>;
    // dateOfBirth:
    //     | z.ZodOptional<z.ZodString>
    //     | z.ZodEffects<z.ZodString, string, string>;
    email: z.ZodString | z.ZodOptional<z.ZodTypeAny>;
    username: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString | z.ZodOptional<z.ZodString>;
}> => {
    if (type !== AuthType.SignIn && type !== AuthType.SignUp) {
        throw new CustomError("Invalid type provided");
    }

    return z.object({
        // sing up
        name:
            type === AuthType.SignIn
                ? z.string().min(3).max(80).optional()
                : z.string().min(3).max(80),
        // address1:
        //     type === AuthType.SignIn ? z.string().optional() : z.string().max(50),
        // city: type === AuthType.SignIn ? z.string().optional() : z.string().max(50),
        // state:
        //     type === AuthType.SignIn
        //         ? z.string().optional()
        //         : z.string().min(2).max(2),
        // postalCode:
        //     type === AuthType.SignIn
        //         ? z.string().optional()
        //         : z.string().min(3).max(6),
        // dateOfBirth:
        //     type === AuthType.SignIn
        //         ? z.string().optional()
        //         : z.string().refine((value) => dayjs(value).isValid(), {
        //               message: "please enter a valid date of birth",
        //           }),
        // ssn: type === AuthType.SignIn ? z.string().optional() : z.string().min(3),
        email:
            type === AuthType.SignIn
                ? z.string().email().optional()
                : z.string().email({
                      message: "please enter a valid email address",
                  }),

        // both sign up and sign up
        username: z.string().min(1, {
            message: "please enter your username",
        }),
        password: z.string().min(8, {
            message: "password must be at least 8 characters",
        }),
        confirmPassword:
            type === AuthType.SignIn
                ? z.string().min(8).optional()
                : z.string().min(8, {
                      message: "password must be at least 8 characters",
                  }),
    });
};

export type fetchOptions = {
    method?: string;
    headers?: {
        "Content-Type": string;
    };
    body: string;
};
export type apiData = {
    data?: any;
    errors: any;
};

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const isTokenExpired = (token: string) => {
    const decodedToken: any = jwtDecode(token);
    return dayjs.unix(decodedToken.exp).diff(dayjs()) < 1;
};

export const getCookie = (name: string): string | undefined => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
};

export class CustomError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "CustomError";
    }
}

export const fetchData = async (url: string, fetchOptions: fetchOptions) => {
    let apiData: apiData = {
        data: [],
        error: null,
    };

    console.log("Fetching data: ", fetchOptions.body);

    try {
        const response = await fetch(url, fetchOptions);
        if (!response.ok) {
            const errorData = await response.json();
            console.error(errorData);
            return {
                data: [],
                error: {
                    status: response.status,
                    message:
                        errorData.error ||
                        errorData.detail ||
                        response.statusText, // Django's typical error response
                },
            };
        }

        const responseData = await response.json();
        apiData = {
            data: responseData,
            error: null,
        };
    } catch (error) {
        // Handle network or unexpected errors
        apiData = {
            data: [],
            error: {
                status: 500,
                message: "Network error. Please try again later.", // Generic network error message
            },
        };
    }

    return apiData;
};

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));
export const wait = (duration: number) => {
    return new Promise((res) => {
        setTimeout(res, duration);
    });
};

export const randomKeyGenerator = () => {
    const key = crypto.randomBytes(32).toString("base64");

    const base64url = key
        .replace(/\+/g, "-") // Replace + with -
        .replace(/\//g, "_") // Replace / with _
        .replace(/=+$/, ""); // Remove padding =
    return base64url;
};

export type DeepPartial<T> = T extends object
    ? {
          [P in keyof T]?: DeepPartial<T[P]>;
      }
    : T;

export const customCapitalize = (value: string) =>
    value[0].toUpperCase() + value.slice(1).toLowerCase();

export function getAbsoluteUrl(
    path: string,
    req: NextRequest | null = null
): string {
    if (typeof window !== "undefined") {
        // Running in the browser
        const baseUrl = `${window.location.protocol}//${window.location.host}`;
        return `${baseUrl}${path}`;
    } else if (req) {
        // Running on the server
        const protocol = req.headers.get("x-forwarded-proto") || "http";
        const host = req.headers.get("host") || "localhost"; // Default to "localhost" if host is not set
        return `${protocol}://${host}${path}`;
    }
    return ""; // Default case if neither environment is matched
}
