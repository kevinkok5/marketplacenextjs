import React, { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import Profile from "@/features/user/Profile";
// import Profile from "@/features/user";

const UserNavbar = () => {
    return (
        <div className="navbar z-10 sticky top-0 bg-background">
            <nav className="container text-[13px] h-full flex justify-between">
                <div className="nav_left flex items-center ">
                    <Link href="/">
                        <div className="logo w-fit">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-5 text-sky-600"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                                />
                            </svg>
                        </div>
                    </Link>

                    <Separator className="mx-4" orientation="vertical" />
                    <div className="create w-fit">
                        <Link href="/manage/create">
                            <Button
                                size="sm"
                                className="lg:text-xs !text-white font-light !bg-sky-600"
                            >
                                Create
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="nav_right flex items-center">
                    <div className="relative">
                        <Input
                            type="text"
                            className="!bg-input min-w-72"
                            placeholder="Search"
                        />

                        <X className="absolute right-2 top-[50%] -translate-y-1/2 w-[18px] h-[18px]" />
                    </div>

                    <Separator className="mx-4" orientation="vertical" />

                    <div className="notification flex h-full gap-4 items-center">
                        <div className="bg-input p-[7px] rounded-sm">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-[18px]"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                                />
                            </svg>
                        </div>
                        {/* <Separator className="mx-4" orientation="vertical" /> */}
                        <div className="bg-input p-[7px] rounded-sm">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-[18px]"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                                />
                            </svg>
                        </div>
                    </div>
                    <Separator className="mx-4" orientation="vertical" />
                    <Suspense fallback={<p>Loading profile...</p>}>
                        <Profile />
                    </Suspense>
                </div>
            </nav>
        </div>
    );
};

export default UserNavbar;
