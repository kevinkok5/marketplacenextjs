"use client";

import React from "react";
import { ProductcardSkeleton } from "./components/ProductCardSkeleton";
import ProductCard from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "./lib/actions/product.actions";
import Porducts from "@/layouts/Porducts";
import { ProductType } from "./lib/utils";
import ItemProductCard from "@/components/ItemProductCard";
import VehicleProductCard from "@/components/VehicleProductCard";

const Index = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ["allProducts"],
        queryFn: fetchAllProducts,
    });
    if (error) {
        console.log("erro: ", error);
    } else console.log("data: ", data);

    const products = data?.edges;
    if (isLoading) {
        return (
            <div className="product-layout w-full py-6 px-8">
                <ProductcardSkeleton />
                <ProductcardSkeleton />
                <ProductcardSkeleton />
                <ProductcardSkeleton />
                <ProductcardSkeleton />
                <ProductcardSkeleton />
                <ProductcardSkeleton />
            </div>
        );
    }
    return (
        <div className="product-layout w-full py-6 px-8">
            {products?.map((product, index) => {
                if (!product || !product.node || !product.node.productType)
                    <></>;

                if (
                    product.node.productType.toUpperCase() === ProductType.Item
                ) {
                    return <ItemProductCard key={index} product={product} />;
                } else if (
                    product.node.productType.toUpperCase() ===
                    ProductType.Vehicle
                ) {
                    return <VehicleProductCard key={index} product={product} />;
                }
            })}
        </div>
    );
};

export default Index;
