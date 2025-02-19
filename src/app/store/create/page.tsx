import Link from "next/link";
import React, { lazy } from "react";

import { getUser } from "@/features/user/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { MoveLeft, Store } from "lucide-react";

const CreateStoreForm = lazy(
    () => import("@/features/manageStore/create/layouts/CreateStoreForm")
);
const NavigateBack = lazy(() => import("@/components/NavigateBack"));

const Page = async () => {
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

export default Page;
