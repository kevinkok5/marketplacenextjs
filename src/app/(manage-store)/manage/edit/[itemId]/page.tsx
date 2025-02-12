"use client";

import ItemForm from "@/features/manageProducts/create/item/layouts/ItemForm";
import ItemFormEdit from "@/features/manageProducts/create/item/layouts/ItemFormEdit";
import Sidebar from "@/features/manageProducts/create/item/layouts/Sidebar";
import {
    fetchAllItemCategories,
    fetchProductEdit,
} from "@/features/manageProducts/lib/actions/product.actions";
import {
    isItemProduct,
    ItemProduct,
    ProductCategoryType,
} from "@/features/manageProducts/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ImagePlusIcon } from "lucide-react";
import React from "react";

const page = ({ params }: { params: { itemId: string } }) => {
    const {
        data: category,
        error: categoryError,
        isLoading: isLoadingCategory,
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

    const { itemId: id } = params;
    const {
        data: product,
        error,
        isLoading,
    } = useQuery<ItemProduct>({
        queryKey: ["UserProductDetails", id],
        queryFn: async () => {
            if (typeof id === "string") {
                const result = await fetchProductEdit(id);

                if (result.errors) {
                    throw new Error("an error occurred while fetching product");
                }

                if (isItemProduct(result.data)) return result.data;

                throw new Error("Return data is not of type ItemProduct");
            }
            throw new Error("Invalid itemId");
        },
    });

    if (isLoading || isLoadingCategory) return <>loading...</>;

    if (error || categoryError) return <div>error...</div>;

    return (
        <div>
            <section className="flex grow p-12 gap-10">
                {product && category && (
                    <ItemFormEdit
                        productData={product}
                        categoryData={category}
                    />
                )}
            </section>
        </div>
    );
};

export default page;
