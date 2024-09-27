import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import { z } from "zod";

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
    data: any;
    error: any;
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
