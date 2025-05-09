import React, { Suspense } from "react";
import ListingResolver from "@/features/manageProducts/me/layout/ListingResovler";
import { unstable_noStore } from "next/cache";

export default async function Page() {
    unstable_noStore();

    return (
        <section className="flex-grow h-[calc(100vh-56px)] max-xs:h-[calc(100vh-112px)] relative overflow-x-auto scroll-smooth">
            <h1 className="md:text-4xl sm:text-3xl text-2xl pt-6 pb-4 sm:px-2 p-1 font-medium">
                Listings
            </h1>

            {/* <div className="h-screen overflow-y-auto"> */}
            <Suspense>
                <ListingResolver />
            </Suspense>
            {/* </div> */}
        </section>
    );
}
