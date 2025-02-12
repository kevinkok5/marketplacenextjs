import { Separator } from "@/components/ui/separator";
import Navbar from "@/layouts/Navbar";
import ProductRightSideBar from "@/layouts/ProductRightSideBar";
import Sidebar from "@/layouts/Sidebar";
import { redirect } from "next/navigation";

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
                {children}
            </section>
        </main>
    );
}
