import ButtonLoading from "@/components/ButtonLoading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getUser } from "@/features/user/lib/actions/user.actions";
import Navbar from "@/layouts/Navbar";
import Sidebar from "@/layouts/Sidebar";
import { Store } from "lucide-react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

import React from "react";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const loggedIn = await getUser();
    console.log("loggedIn: ", loggedIn);
    if (loggedIn.success !== false) redirect("/");
    return (
        <main className="min-h-dvh ">
            <div className="h-screen flex">
                <div className="w-1/2  h-full grid place-content-center">
                    <Store className="h-60 w-60 mx-auto mb-7" />
                    <h2 className="text-4xl break-words">
                        Let what you are looking for find you.
                    </h2>
                </div>
                <div className="flex-grow  h-full flex flex-col gap-12 justify-center bg-red-4">
                    <div>
                        <h1 className="text-5xl max-w-[25rem] font-bold">
                            Closer than ever before
                        </h1>
                    </div>

                    <div className="w-72 flex flex-col gap-2 font-bold">
                        <h3 className="text-xl">Join us Today</h3>
                        <Button
                            className="!bg-sky-600 font-bold !text-white"
                            asChild
                        >
                            <Link href="/auth/signup" className="">
                                Sign up
                            </Link>
                        </Button>
                        <div className="flex gap-2 items-center">
                            <Separator className="w-auto flex-grow" /> or{" "}
                            <Separator className="flex-grow w-auto" />
                        </div>
                        <Button className="font-bold">
                            Continue with Google
                        </Button>
                        <Button className="font-bold">
                            Continue with Facebook
                        </Button>
                    </div>

                    <div className="w-72 flex flex-col gap-2">
                        <h3 className="text-sm font-semibold">
                            Already have an account?
                        </h3>

                        <ButtonLoading
                            variant="outline"
                            className="text-sky-600 font-bold"
                            asChild
                            href="/auth/login"
                        >
                            login
                        </ButtonLoading>
                    </div>
                </div>
            </div>
            {children}
        </main>
    );
}
