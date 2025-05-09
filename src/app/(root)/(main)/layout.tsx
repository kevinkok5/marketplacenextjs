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
        // <main>
        //     <Navbar />
        <section className="flex">
            <Sidebar />
            <div className="flex flex-col md:w-[calc(22rem-100%)] w-full flex-grow">
                <CategoryCarousel />
                <div className="md:hidden max-sm:sticky max-sm:top-11 max-sm:z-10 bg-background flex gap-2 w-full md:px-8 sm:px-4 px-1 py-4 sm:pt-0 border-b border-neutral-200 dark:border-neutral-600 shadow-sm">
                    {user && user.isShopOwner && <ViewAllStoreMobile />}

                    <SearchSheet />

                    <Button className="!bg-neutral-200 dark:!bg-neutral-800 gap-2 text-black dark:text-neutral-100 hover:!bg-neutral-300 dark:hover:!bg-neutral-700 rounded-full font-semibold">
                        <Settings size={16} />
                        All categories
                    </Button>
                </div>
                <div className="w-full max-md:bg-neutral-50 max-md:dark:bg-neutral-950">
                    <div className="pt-4 md:px-8 sm:px-4 px-1 ">
                        <h1 className="font-bold text-xl">Today's picks</h1>
                    </div>
                    {children}
                </div>
            </div>
        </section>
        // </main>
    );
}
