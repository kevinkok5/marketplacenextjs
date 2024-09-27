"use server";
import { NextApiRequest, NextApiResponse } from "next";

import { z } from "zod";
import {
    authFormSchema,
    AuthType,
    fetchData,
    fetchOptions,
    parseStringify,
} from "../utils";
import { redirect } from "next/navigation";
import { error } from "console";
import { PassThrough } from "stream";

const baseURL = process.env.API_BASE_URL;
const formSchema = authFormSchema(AuthType.SignIn);

type authProps = z.infer<typeof formSchema>;

const wait = (duration: number) => {
    return new Promise((res) => {
        setTimeout(res, duration);
    });
};
export const signIn = async (previousState: unknown, formData: FormData) => {
    const data = {
        username: formData.get("username"),
        password: formData.get("password"),
    };

    const validatedData = authFormSchema(AuthType.SignIn).safeParse(data);

    if (!validatedData.success) {
        return {
            errors: validatedData.error.flatten().fieldErrors,
        };
    }

    // await wait(1000);

    const fetchOptions: fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData.data),
    };

    const user = await fetchData(`${baseURL}/token/`, fetchOptions);
    console.log(user);

    if (user.error) {
        // console.log(user.error);
        return {
            errors: { global: [user.error.message] }, // Return error message from server
        };
    }

    // redirect("/");

    return { message: "Login successful" }; // Optionally return a success message
};
export const signUp = async (previousState: unknown, formData: FormData) => {
    // const validatedData = authFormSchema(AuthType.SignIn).safeParse(data);

    // if (!validatedData.success) {
    //     return {
    //         errors: validatedData.error.flatten().fieldErrors,
    //     };
    // }

    // try {
    //     // Perform login process
    // } catch (error) {
    //     // Handle validation errors and other potential issues
    //     console.error(`Login failed: ${error?.message}`);
    // }
    return { message: "worked" };
};

// pages/api/auth/login.js

// export async function login(req: NextApiRequest, res: NextApiResponse) {
//     const { username, password } = req.body;

//     // Proxy the request to your Django backend
//     const response = await fetch(`${process.env.DJANGO_API_URL}/token/`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username, password }),
//     });

//     const data = await response.json();

//     if (response.ok) {
//         // Set the token in a cookie on the client-side
//         res.setHeader("Set-Cookie", [
//             `token=${data.access}; HttpOnly; Secure; Path=/; Max-Age=3600; SameSite=Lax`,
//             `refresh_token=${data.refresh}; HttpOnly; Secure; Path=/; Max-Age=${
//                 7 * 24 * 60 * 60
//             }; SameSite=Lax`,
//         ]);

//         return res.status(200).json({ message: "Login successful" });
//     } else {
//         return res.status(response.status).json({ error: data.error });
//     }
// }

// export async function loginin(formData: FormData) {
//     const data = {
//         username: formData.get("username"),
//         password: formData.get("password"),
//     };

//     try {
//         const response = await fetch("/api/auth/login", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data),
//         });

//         const result = await response.json();

//         if (response.ok) {
//             console.log("Login successful");
//         } else {
//             console.error("Login failed: ", result.error);
//         }
//     } catch (error) {
//         console.error("Network error: ", error);
//     }
// }
