import Link from "next/link";
import React from "react";
import { getUser } from "@/features/user/lib/actions/user.actions";
import { redirect, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import NavigateBack from "@/components/NavigateBack";
import { join } from "@/features/manageStore/lib/actions/store.actions";
import ConfirmJoinBtn from "@/features/manageStore/join/components/ConfirmJoinBtn";

const page = async () => {
    const user = await getUser();
    if (user && user.isShopOwner) redirect("/store");

    return (
        // <div>
        <section className="flex flex-col items-center justify-center gap-4 grow">
            <h1 className="text-lg font-bold">Become a Shop owner?</h1>
            <p>By selecting "Yes" you accept all our terms and conditions...</p>

            <div className="flex gap-8 mt-8">
                <NavigateBack>
                    <Button>Cancel</Button>
                </NavigateBack>
                <ConfirmJoinBtn />
            </div>
        </section>
        // </div>
    );
};

export default page;
