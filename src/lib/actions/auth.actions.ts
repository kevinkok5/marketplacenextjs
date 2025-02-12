"use server";
// import { NextApiRequest, NextApiResponse } from "next";

import { z } from "zod";
import {
    authFormSchema,
    AuthType,
    fetchData,
    fetchOptions,
    parseStringify,
} from "../utils";
import { redirect } from "next/navigation";
import { createSession, deleteSession } from "../session";
import { deleteStoreSession } from "@/features/manageStore/lib/storeSession";
import { cookies } from "next/headers";

const baseURL = process.env.API_BASE_URL;

const formSchema = authFormSchema(AuthType.SignIn);
type authProps = z.infer<typeof formSchema>;

export const signIn = async (data: authProps) => {
    const validatedData = authFormSchema(AuthType.SignIn).safeParse(data);

    if (!validatedData.success) {
        return {
            errors: validatedData.error.flatten().fieldErrors,
        };
    }

    const fetchOptions: fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData.data),
    };

    const token = await fetchData(`${baseURL}/token/`, fetchOptions);

    if (token.error) {
        return {
            errors: { message: token.error.message as string }, // Return error message from server
        };
    }

    // console.log("token data: ", token.data);
    // console.log("worked");

    await createSession(token?.data);
    redirect("/");
};

export const signUp = async (data: authProps) => {
    console.log("yeah it me");

    const validatedData = authFormSchema(AuthType.SignUp).safeParse(data);

    if (!validatedData.success) {
        return {
            errors: validatedData.error.flatten().fieldErrors,
        };
    }

    if (validatedData.data.password !== validatedData.data.confirmPassword)
        return {
            errors: { message: "Passwords didn't match" }, // Return error message from server
        };

    const userData = {
        username: validatedData.data.username,
        first_name: validatedData.data.name?.split(" ")[0],
        email: validatedData.data.email,
        password: validatedData.data.password,
        confirm_password: validatedData.data.confirmPassword,
    };

    const fetchOptions: fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    };

    const token = await fetchData(`${baseURL}/users/register/`, fetchOptions);

    if (token.error) {
        return {
            errors: { message: token.error.message as string }, // Return error message from server
        };
    }
    await createSession(token?.data);
    redirect("/");
};

export const signOut = async () => {
    // I should implement the logout process here, to invalidate the token from the django server
    const cookie = {
        name: "Store-session",
    };

    cookies().delete(cookie.name);

    await deleteSession();
    return {
        error: {
            message: "Logout Failed",
        },
    };
};
