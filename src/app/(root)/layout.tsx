import { Button } from "@/components/ui/button";
import { getUser } from "@/features/user/lib/actions/user.actions";
import { User } from "@/features/user/lib/utils";
import Navbar from "@/layouts/Navbar";
import Sidebar from "@/layouts/Sidebar";
import { Search, Settings, Store } from "lucide-react";

import CategoryCarousel from "@/features/product/components/CategoryCarousel";
import SearchSheet from "@/features/product/components/SearchSheet";
import ViewAllStoreMobile from "@/features/user/components/ViewAllStoreMobile";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // const loggedIn = await getLoggedInUser();
    // if (!loggedIn) redirect("/sign-in");
    const user: User = await getUser();
    return (
        <main>
            <Navbar />
            {children}
        </main>
    );
}
