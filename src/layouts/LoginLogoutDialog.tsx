"use client";

import React, { useActionState, useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

import { unknown, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "@/components/CustomInput";
import { authFormSchema, AuthType } from "@/lib/utils";
import { Store } from "lucide-react";
import { signIn, signUp } from "@/lib/actions/auth.actions";
import { userAgent } from "next/server";

type LoginLogoutDialogProps = {
    type: AuthType;
    open: boolean;
    onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoginLogoutDialog = ({
    open,
    onOpenChange,
    type,
}: LoginLogoutDialogProps) => {
    const authOperation = type === AuthType.SignIn ? signIn : signUp;
    // const [isLoading, setIsLoading] = useState(false);

    const authOperationWrapper = async (state: any, formData: FormData) => {
        try {
            // Call the actual auth operation (signIn or signUp)
            const result = await authOperation(state, formData);

            // Update state with the result (handle success or errors)
            return {
                ...state,
                errors: result?.errors || {},
            };
        } catch (error) {
            return {
                ...state,
                errors: { global: ["An unexpected error occurred."] }, // Handle global errors
            };
        }
    };

    const [state, action, isPending] = useActionState(signIn, undefined);

    const router = useRouter();
    const navigateBack = () => router.back();

    const formSchema = authFormSchema(type);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: type === AuthType.SignUp ? "" : undefined, // only for SignUp
            email: type === AuthType.SignUp ? "" : undefined, // only for SignUp
            username: "",
            password: "",
        },
    });

    // async function onSubmit(data: z.infer<typeof formSchema>) {
    //     setIsLoading(true);

    //     const userData = {
    //         name: data.name,
    //         email: data.email,
    //         username: data.username,
    //         password: data.password,
    //     };

    //     try {
    //         const result = await authOperation(userData);
    //         if (result?.errors) {
    //             console.log("errors: ", result.errors);
    //         } else {
    //             console.log("login successful");
    //         }
    //     } catch (error) {
    //         console.log("An unexpected error occurred: ", error);
    //         // Something went wrong. Check your connection and try again later.
    //     } finally {
    //         setIsLoading(false);
    //     }
    // }

    return (
        <div>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent
                    className="sm:max-w-[525px] "
                    onCloseAutoFocus={navigateBack}
                >
                    <DialogHeader>
                        <DialogTitle>
                            <Store className="mx-auto mt-4 w-8 h-8 text-sky-600" />
                        </DialogTitle>
                        <DialogDescription className="text-center text-xl text-white font-bold">
                            {type === AuthType.SignIn
                                ? "Welcome to Marketplace"
                                : "Sign in to Marketplace"}
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form
                            // onSubmit={form.handleSubmit(onSubmit)}
                            action={action}
                            className="space-y-8 mt-6 flex flex-col"
                        >
                            {type === AuthType.SignUp && (
                                <>
                                    <CustomInput
                                        control={form.control}
                                        name="name"
                                        label="Name"
                                        placeholder="Name"
                                    />
                                    <CustomInput
                                        control={form.control}
                                        name="email"
                                        label="Email"
                                        placeholder="Email"
                                    />
                                </>
                            )}
                            <CustomInput
                                control={form.control}
                                name="username"
                                label={
                                    type === AuthType.SignIn
                                        ? "Email or Username"
                                        : "Username"
                                }
                                placeholder={
                                    type === AuthType.SignIn
                                        ? "Email or Username"
                                        : "Username"
                                }
                            />
                            <CustomInput
                                control={form.control}
                                type="password"
                                name="password"
                                label="Password"
                                placeholder="Password"
                            />
                            <Button
                                disabled={isPending}
                                variant="outline"
                                className="text-sky-600"
                                type="submit"
                            >
                                Submit
                            </Button>
                        </form>
                    </Form>
                    {/* <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter> */}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default LoginLogoutDialog;
