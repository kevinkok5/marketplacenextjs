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
        <section className="max-h-[calc(100dvh-48px)] flex flex-col h-[calc(100dvh-48px)] overflow-y-scroll">
            <div className="flex flex-grow">
                <Suspense>
                    <ChatSidebar className="max-md:hidden" />
                </Suspense>
                {children}
            </div>
        </section>
    );
}
