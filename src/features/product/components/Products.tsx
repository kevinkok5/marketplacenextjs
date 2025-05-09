import React, { Suspense } from "react";
import { getProductDetails } from "../lib/actions/product.actions";
import ProductItemDetails from "../item/ProductItemDetails";

const Products = async ({ productId }: { productId: string }) => {
    const data = await getProductDetails(productId);

    if (data.errors) return <div>Error</div>;

    if (data.data?.__typename === "ItemType") {
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <ProductItemDetails data={data.data} />
            </Suspense>
        );
    }
    return <></>;
};

export default Products;
