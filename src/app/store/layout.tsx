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
        <main className="h-dvh w-ful grid place-items-center">{children}</main>
    );
}
