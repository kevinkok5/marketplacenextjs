import UserNavbar from "@/features/manageProducts/layouts/UserNavbar";
import UserSidebar from "@/features/manageProducts/layouts/UserSidebar";
import Navbar from "@/layouts/Navbar";

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
            <div className="flex grow">
                <UserSidebar />
                {children}
            </div>
        </main>
    );
}
