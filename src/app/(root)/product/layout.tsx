import Navbar from "@/layouts/Navbar";
import { Suspense } from "react";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // const loggedIn = await getLoggedInUser();
    // if (!loggedIn) redirect("/sign-in");
    return (
        <section className="max-h-[calc(100dvh-48px)] flex flex-col h-[calc(100dvh-48px)]">
            {/* // <Navbar /> */}
            <div className="flex max-md:flex-col md:max-h-full md:overflow-hidden md:flex-grow ">
                {children}
            </div>
        </section>
    );
}
