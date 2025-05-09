"use client";
import ItemForm from "@/features/manageProducts/create/item/layouts/ItemForm";
import { fetchAllItemCategories } from "@/features/manageProducts/lib/actions/product.actions";
import { ProductCategoryType } from "@/features/manageProducts/lib/utils";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Page = () => {
    const {
        data: category,
        error,
        isLoading,
    } = useQuery<ProductCategoryType>({
        queryKey: ["allItemCategories"],
        queryFn: async () => {
            try {
                const result = await fetchAllItemCategories();
                if (result.errors) {
                    throw new Error("An error occurred while fetching");
                }
                return result?.data;
            } catch (err) {
                throw new Error("An error occurred while fetching");
            }
        },
    });
    if (isLoading) return <>loading...</>;
    if (error) return <>error...</>;
    return (
        // <div>
        <section className="flex max-sm:flex-col grow sm:p-12 p-4 gap-10">
            {category && <ItemForm data={category} />}
        </section>
        // {/* </div> */}
    );
};

export default Page;
