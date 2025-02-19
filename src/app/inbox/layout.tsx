import ChatSidebar from "@/features/chat/layouts/ChatSidebar";
import { getUser } from "@/features/user/lib/actions/user.actions";
import Navbar from "@/layouts/Navbar";
import { Suspense } from "react";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="flex flex-col min-h-dvh">
            <Navbar />
            <section className="flex flex-grow">
                <Suspense>
                    <ChatSidebar />
                </Suspense>
                {children}
            </section>
        </main>
    );
}
