import React, { Suspense } from "react";
import ListingResolver from "@/features/manageProducts/me/layout/ListingResovler";
import { unstable_noStore } from "next/cache";

export default async function Page() {
    unstable_noStore();

    return (
        <section className="container min-h-full w-full">
            <h1 className="text-4xl pt-6 pb-4">Listing</h1>

            <Suspense>
                <ListingResolver />
            </Suspense>
        </section>
    );
}
