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
        <main className="max-h-dvh flex flex-col h-dvh">
            <Navbar />
            <section className="flex max-md:flex-col md:max-h-full md:overflow-hidden md:flex-grow ">
                <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            </section>
        </main>
    );
}
