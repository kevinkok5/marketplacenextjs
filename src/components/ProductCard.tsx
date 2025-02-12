import { ProductEdge } from "@/features/manageProducts/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ product }: { product: ProductEdge }) => {
    return (
        <div className="product-card ">
            <Link href={`/item/${product?.node?.id}`}>
                <div className="w-full rounded-lg aspect-square bg-gray-500">
                    <Image
                        src={product?.node?.medias?.edges[0]?.node.media}
                        alt={product?.node?.name}
                        width={800}
                        height={600}
                        className="rounded-lg w-full h-full object-cover"
                    />
                </div>
                <div className="py-3">
                    <div className="font-[500] text-base ">
                        ZAR {product?.node?.price}
                    </div>
                    <div className="font-[500] truncate text-neutral-400 capitalize text-sm ">
                        {product?.node?.name}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
