import ItemListing from "@/features/manageProducts/me/layout/ItemListing";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ListingResolver from "@/features/manageProducts/me/layout/ListingResovler";

export default async function page() {
    return (
        <section className="container min-h-full w-full">
            <h1 className="text-4xl pt-6 pb-4">Listing</h1>

            <ListingResolver />
        </section>
    );
}
