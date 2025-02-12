import {
    ItemColumns,
    ItemColumnProps,
} from "@/features/manageProducts/me/components/ItemColumns";
import { ListingsDataTable } from "@/features/manageProducts/me/layout/ListingsDataTable";
import {
    AllItemProducts,
    AllProducts,
    AllStoreProducts,
    DeepPartialItemProduct,
    ItemEdge,
    ItemProduct,
    ProductType,
    VehicleEdge,
} from "@/features/manageProducts/lib/utils";
import { DeepPartial } from "@apollo/client/utilities";
import { mock } from "node:test";
import React from "react";
import ItemListing from "@/features/manageProducts/me/layout/ItemListing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@apollo/client";
import { GET_ALL_STORE_PRODUCTS_QUERY } from "../lib/queries";
import { initializeApollo } from "@/lib/apolloClient";
import VehicleListing from "./VehicleListing";
import { VehicleColumnProps } from "../components/VehicleColumns";

type PartialProducts = { storeProducts: DeepPartial<AllStoreProducts> };
// type PartialProduct = DeepPartial<ItemProduct> | undefined;

// export default page;

export async function getServerSideProps(): Promise<PartialProducts | any> {
    const apolloClient = initializeApollo();

    const { data } = await apolloClient.query({
        query: GET_ALL_STORE_PRODUCTS_QUERY,
        variables: { first: 10 }, // Provide query variables if needed
    });

    return data;
}

export default async function ListingResolver() {
    const data: PartialProducts = await getServerSideProps();

    // console.log("Data:", data.);

    const itemsData: ItemColumnProps[] =
        data.storeProducts.edges
            ?.filter((product): product is ItemEdge => {
                // Ensure the product is defined and matches the required type
                return (
                    product?.node?.productType?.toUpperCase() ===
                    ProductType.Item
                );
            })
            .map(
                (product) =>
                    ({
                        id: product.node.id,
                        name: product.node.name,
                        price: product.node.price
                            ? parseInt(product.node.price)
                            : 0,
                        product: product,
                        status: product.node.productStatus,
                    } as ItemColumnProps)
            ) ?? [];

    const vehiclesData: VehicleColumnProps[] =
        data.storeProducts.edges
            ?.filter((product): product is VehicleEdge => {
                // Ensure the product is defined and matches the required type
                return (
                    product?.node?.productType?.toUpperCase() ===
                    ProductType.Vehicle
                );
            })
            .map(
                (product) =>
                    ({
                        id: product.node.id,
                        make: product.node.make,
                        price: product.node.price
                            ? parseInt(product.node.price)
                            : 0,
                        model: product.node.model,
                        product: product,
                        status: product.node.productStatus,
                    } as VehicleColumnProps)
            ) ?? [];

    console.log("ItemsData:", itemsData);

    return (
        <Tabs defaultValue="item" className="w-full">
            <TabsList className="h-20 w-full border-b border-neutral-600 rounded-none  justify-start items-end sticky top-12 z-10">
                <TabsTrigger className="px-14" value="item">
                    Item
                </TabsTrigger>
                <TabsTrigger className="px-14" value="vehicle">
                    Vehicle
                </TabsTrigger>
            </TabsList>
            <TabsContent value="item">
                <ItemListing itemsData={itemsData} />
            </TabsContent>
            <TabsContent value="vehicle">
                <VehicleListing vehiclesData={vehiclesData} />
            </TabsContent>
        </Tabs>
    );
}
