import Navbar from "@/layouts/Navbar";
import Sidebar from "@/layouts/Sidebar";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // const loggedIn = await getLoggedInUser();
    // if (!loggedIn) redirect("/sign-in");
    return (
        <main>
            <Navbar />
            <section className="flex">
                <Sidebar />
                {children}
            </section>
        </main>
    );
}
