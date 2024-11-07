import { Separator } from "@/components/ui/separator";
import Navbar from "@/layouts/Navbar";
import Sidebar from "@/layouts/Sidebar";
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
        <main className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex grow">
                <Sidebar />
                <section className="w-full min-h-full flex gap-4 items-center justify-center">
                    <Link href="/manage/create/item">
                        <div className="h-40 w-36 bg-input border border-neutral-600 rounded-sm flex items-center justify-center">
                            Item
                        </div>
                    </Link>
                    <Link href="/create">
                        <div className="h-40 w-36 bg-input border border-neutral-600 rounded-sm flex items-center justify-center">
                            Vehicul
                        </div>
                    </Link>
                    <Link href="/create">
                        <div className="h-40 w-36 bg-input border border-neutral-600 rounded-sm flex items-center justify-center">
                            Rental
                        </div>
                    </Link>
                </section>
            </div>
            {children}
        </main>
    );
}
