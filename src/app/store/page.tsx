import Sidebar from "@/features/manageProducts/create/layouts/Sidebar";
import Link from "next/link";
import React from "react";

import { getUser } from "@/features/user/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { CreditCard, MoveLeft, Plus, Store } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getStore } from "@/features/manageStore/lib/actions/store.actions";
import { allStores } from "@/features/manageStore/lib/utils";
import StoreItems from "@/features/manageStore/components/StoreItems";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import NavigateBack from "@/components/NavigateBack";

type Stores = {
    allStores: allStores;
};

const page = async () => {
    const user = await getUser();
    if (!user || !user.isShopOwner) redirect("/store/join");

    const stores: Stores = await getStore();

    return (
        <section className="flex flex-col h-[550px] w-[450px] max-w-full bg-sky-200 max-h-full rounded-lg text-black p-8">
            <h1 className="text-lg font-bold flex items-center gap-2 ">
                <Store size={20} />
                Stores
            </h1>
            <NavigateBack>
                <MoveLeft size={20} strokeWidth={3} className="my-4" />
            </NavigateBack>
            <ul className="flex flex-col p-5 text-base bg-white w-full flex-grow rounded-lg gap-2 overflow-hidden">
                <div className="flex flex-col gap-2 overflow-y-auto max-h-[80%]">
                    {stores.allStores?.success && (
                        <StoreItems storeEdges={stores.allStores.edges} />
                    )}
                </div>
                <Link href="/store/create/">
                    <li className="flex font-semibold items-center gap-4 cursor-pointer hover:bg-neutral-300 rounded-lg bg-neutral-200 p-2 mt-4">
                        <Plus />
                        Add Store
                    </li>
                </Link>
            </ul>
        </section>
    );
};

export default page;
