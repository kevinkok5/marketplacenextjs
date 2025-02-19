"use client";

import CollapsibleSidebarListItems from "@/components/CollapsibleSidebarListItems";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { fetchAllUserRecentProducts } from "../me/lib/actions/me.actions";
import {
    HouseEdge,
    ItemEdge,
    MeidaType,
    ProductType,
    VehicleEdge,
} from "../lib/utils";
import Image from "next/image";

type ProductsData = {
    media: MeidaType | undefined;
    name: string | undefined;
    productType: "ITEM" | "VEHICLE" | "HOUSE";
    productStatus: "DRAFT" | "PUBLISHED";
    id: string;
};

const SidebarCollapsibleListing = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ["userRecentProducts"],
        queryFn: fetchAllUserRecentProducts,
    });

    const itemsProduct =
        data?.edges
            .filter(
                (product): product is ItemEdge =>
                    product.node.productType.toUpperCase() === ProductType.Item
            )
            .map(
                (product) =>
                    ({
                        media: product.node.medias,
                        name: product.node.name,
                        productType: product.node.productType,
                        productStatus: product.node.productStatus,
                    } as ProductsData)
            ) ?? [];

    const vehiclesProduct =
        data?.edges
            .filter(
                (product): product is VehicleEdge =>
                    product.node.productType.toUpperCase() ===
                    ProductType.Vehicle
            )
            .map(
                (product) =>
                    ({
                        id: product.node.id,
                        media: product.node.medias,
                        name: product.node.make + " " + product.node.model,
                        productType: product.node.productType,
                        productStatus: product.node.productStatus,
                    } as ProductsData)
            ) ?? [];

    const HousesProduct =
        data?.edges
            .filter(
                (product): product is HouseEdge =>
                    product.node.productType.toUpperCase() === ProductType.House
            )
            .map(
                (product) =>
                    ({
                        id: product.node.id,
                        media: product.node.medias,
                        name: product.node.description,
                        productType: product.node.productType,
                        productStatus: product.node.productStatus,
                    } as ProductsData)
            ) ?? [];

    const productsData: ProductsData[] = itemsProduct
        .concat(vehiclesProduct)
        .concat(HousesProduct);

    return (
        <CollapsibleSidebarListItems
            icon={
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                    />
                </svg>
            }
            label="Listing"
            defaultValue="item-1"
        >
            <div className="text-sm ">
                <ul>
                    {error && (
                        <li
                            key="error"
                            className="flex gap-4 pl-8 py-3 rounded-sm items-center transition duration-200 ease-out hover:bg-input font-light"
                        >
                            No product yet
                        </li>
                    )}
                    {isLoading && <div>Loading...</div>}
                    {!error || !isLoading ? (
                        productsData &&
                        productsData.map((product) => (
                            <li
                                key={product.id}
                                className="flex text-[13px] text-gray-200 font-semibold gap-4 pl-8 py-3 rounded-sm items-center transition duration-200 ease-out hover:bg-input"
                            >
                                <div className="flex justify-center items-center bg-indigo-200 max-h-10 h-10 min-w-12 max-w-12 rounded-sm">
                                    {product.media?.edges[0]?.node?.media ? (
                                        <Image
                                            src={
                                                product.media.edges[0].node
                                                    .media
                                            }
                                            alt={
                                                product.name
                                                    ? `${product.name}-image`
                                                    : "product-image"
                                            }
                                            width={64}
                                            height={64}
                                            className=" w-full h-full object-cover"
                                            priority
                                        />
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="size-5 text-black"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                            />
                                        </svg>
                                    )}
                                </div>
                                <div className="flex justify-between w-[78%] gap-4">
                                    <p className="truncate w-4/6">
                                        {product.name
                                            ? product.name
                                            : "Untitle"}
                                    </p>
                                    <span>{product.productStatus}</span>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li
                            key="empty"
                            className="flex gap-4 pl-8 py-3 rounded-sm items-center transition duration-200 ease-out hover:bg-input font-light"
                        >
                            No product yet
                        </li>
                    )}

                    <Link key="listing" href="/manage/me/listings">
                        <li className="flex justify-between gap-4 pl-8 pr-3 py-3 rounded-sm items-center transition duration-200 ease-out hover:bg-input hover:underline font-light">
                            View more
                            <ChevronRight className="h-4 w-4" />
                        </li>
                    </Link>
                </ul>
            </div>
        </CollapsibleSidebarListItems>
    );
};

export default SidebarCollapsibleListing;
