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
import { createSession } from "../session";

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

    await createSession(token?.data);
    redirect("/");
};
export const signUp = async (data: authProps) => {
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
    return { errors: { message: "worked" } };
};
