import Link from "next/link";
import React, { Suspense } from "react";

import { getUser } from "@/features/user/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { MoveLeft, Plus, Store } from "lucide-react";

import NavigateBack from "@/components/NavigateBack";
import AllStore from "@/features/manageStore/components/AllStore";

const Page = async () => {
    const user = await getUser();
    if (!user || !user.isShopOwner) redirect("/store/join");

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
                <Suspense fallback={<div>Loading Stores...</div>}>
                    <AllStore />
                </Suspense>

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

export default Page;
