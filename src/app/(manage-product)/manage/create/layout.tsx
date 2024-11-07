import { Separator } from "@/components/ui/separator";
import Navbar from "@/layouts/Navbar";
import Sidebar from "@/layouts/Sidebar";
import { X } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // const loggedIn = await getLoggedInUser();
    // if (!loggedIn) redirect("/sign-in");
    return (
        <section className="absolute flex justify-center items-center top-0 left-0 flex-col min-h-screen w-screen z-[100]">
            <section className="relative bg-input w-[70%] min-w-[968px] h-[80vh] rounded-lg overflow-Y-auto overflow-x-hidden flex flex-col">
                <div className="flex justify-between grow items-center max-h-[8vh] border-b border-neutral-600 px-4">
                    <div className="flex gap-2 items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525"
                            />
                        </svg>
                        <p className="text-xs font-semibold uppercase">
                            public
                        </p>
                    </div>
                    <Link href="/manage" className="p-1">
                        <X className="w-4 h-4" />
                    </Link>
                </div>
                {children}
            </section>

            <Link
                href="/manage"
                className="min-h-screen w-full opacity-40 bg-black absolute top-0 -z-10 left-0"
            ></Link>
        </section>
    );
}
