import UserNavbar from "@/features/manageProducts/layouts/UserNavbar";
import UserSidebar from "@/features/manageProducts/layouts/UserSidebar";
import { LayoutDashboard, ListIcon, Settings } from "lucide-react";
import Link from "next/link";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // const loggedIn = await getLoggedInUser();
    // if (!loggedIn) redirect("/sign-in");
    return (
        <main className="flex flex-col min-h-screen">
            <UserNavbar />
            <div className="flex flex-col grow w-full max-xs:max-h-[calc(100dvh-50px)]">
                <div className="flex grow w-full max-xs:overflow-y-auto">
                    <UserSidebar />
                    {children}
                </div>

                <div className="xs:hidden flex justify-evenly bg-background py-4 border-t border-neutral-300 dark:border-neutral-700">
                    <Link href="/manage">
                        <div>
                            <Settings />
                        </div>
                    </Link>
                    <Link href="/manage/me">
                        <div>
                            <LayoutDashboard />
                        </div>
                    </Link>

                    <Link href="/manage/me/listings">
                        <div>
                            <ListIcon />
                        </div>
                    </Link>
                </div>
            </div>
        </main>
    );
}
