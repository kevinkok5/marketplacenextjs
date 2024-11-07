"use client";

import React from "react";
import { ProductcardSkeleton } from "./components/ProductCardSkeleton";
import ProductCard from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "./lib/actions/product.actions";

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
            {products?.map((product, index) => (
                <ProductCard key={index} product={product} />
            ))}
        </div>
    );
};

export default Index;
