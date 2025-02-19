import { ItemProduct } from "@/features/manageProducts/lib/utils";
import ProductRightSideBar from "@/layouts/ProductRightSideBar";
import React, { lazy } from "react";

const ProductCarousel = lazy(() => import("../components/ProductCarousel"));

type ProductItemDetailsProps = {
    data: ItemProduct;
    productId: string;
};

const ProductItemDetails = ({ data, productId }: ProductItemDetailsProps) => {
    // const products = [
    //     {
    //         imageUrl:
    //             "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //     },
    //     {
    //         imageUrl:
    //             "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //     },
    //     {
    //         imageUrl:
    //             "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //     },
    //     {
    //         imageUrl:
    //             "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //     },
    //     {
    //         imageUrl:
    //             "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //     },
    //     {
    //         imageUrl:
    //             "https://images.unsplash.com/photo-1564540583246-934409427776?q=80&w=2053&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //     },
    //     {
    //         imageUrl:
    //             "https://i.pinimg.com/564x/a9/cf/02/a9cf0250a99536ce45e6a082105cbf28.jpg",
    //     },
    //     {
    //         imageUrl:
    //             "https://i.pinimg.com/736x/23/84/44/2384447f579b4b8887120186a258493b.jpg",
    //     },
    //     {
    //         imageUrl:
    //             "https://i.pinimg.com/564x/b1/a8/7f/b1a87f0bbada69e1b8ab2f5d63280d24.jpg",
    //     },
    // ];

    return (
        <div className="w-full h-full flex max-md:flex-col">
            <ProductCarousel mediaEdges={data?.medias?.edges} />
            <ProductRightSideBar
                productId={productId}
                store={data?.store}
                product={data as any}
            />
        </div>
    );
};

export default ProductItemDetails;
