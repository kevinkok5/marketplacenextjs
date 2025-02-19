import React, { Suspense, lazy } from "react";
import { getUser } from "@/features/user/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

const NavigateBack = lazy(() => import("@/components/NavigateBack"));
const ConfirmJoinBtn = lazy(
    () => import("@/features/manageStore/join/components/ConfirmJoinBtn")
);

const Page = async () => {
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
                <Suspense>
                    <ConfirmJoinBtn />
                </Suspense>
            </div>
        </section>
        // </div>
    );
};

export default Page;
