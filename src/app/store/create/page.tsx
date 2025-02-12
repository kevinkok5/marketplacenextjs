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
import ItemForm from "@/features/manageProducts/create/item/layouts/ItemForm";
import CreateStoreForm from "@/features/manageStore/create/layouts/CreateStoreForm";
import NavigateBack from "@/components/NavigateBack";

type Stores = {
    allStores: allStores;
};

const page = async () => {
    const user = await getUser();
    if (!user || !user.isShopOwner) redirect("/store/join");

    return (
        <section className="flex flex-col h-[550px] w-[450px] max-w-full bg-sky-200 max-h-full rounded-lg text-black p-8">
            <h1 className="text-lg font-bold flex items-center gap-2 ">
                <Link href="/">
                    <Store size={20} />
                </Link>
                Create
            </h1>
            <NavigateBack>
                <MoveLeft size={20} strokeWidth={3} className="my-4" />
            </NavigateBack>
            <CreateStoreForm />
        </section>
    );
};

export default page;
