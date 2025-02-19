import { DeepPartialItemProduct } from "@/features/manageProducts/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ItemProductCard = ({ product }: { product: DeepPartialItemProduct }) => {
    return (
        <div className="product-card ">
            <Link href={`/product/${product?.node?.id}`}>
                <div className="relative w-full rounded-lg aspect-square bg-gray-500">
                    {product?.node?.medias?.edges != undefined ? (
                        <Image
                            src={
                                product?.node?.medias?.edges[0]?.node
                                    ? product.node.medias.edges[0].node?.media
                                        ? product.node.medias.edges[0].node
                                              ?.media
                                        : ""
                                    : ""
                            }
                            alt={
                                product?.node?.name
                                    ? `${product?.node?.name}-image`
                                    : "image"
                            }
                            fill
                            className="rounded-lg w-full h-full object-cover"
                        />
                    ) : (
                        ""
                    )}
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

export default ItemProductCard;
