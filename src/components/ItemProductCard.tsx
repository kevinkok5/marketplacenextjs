import { DeepPartialItemProduct } from "@/features/manageProducts/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ItemProductCard = ({ product }: { product: DeepPartialItemProduct }) => {
    return (
        <div className="product-card">
            <Link href={`/product/${product?.node?.id}`}>
                <div className="relative w-full sm:rounded-lg aspect-square border border-neutral-200 dark:border-neutral-800 overflow-hidden">
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
                            className="sm:rounded-lg w-full h-full object-cover"
                        />
                    ) : (
                        ""
                    )}
                </div>
                <div className="sm:py-3 pt-2 pb-3">
                    <div className="sm:font-medium font-bold sm:text-base text-[15px]">
                        ZAR {product?.node?.price}
                    </div>
                    <div className="font-[500] truncate dark:text-neutral-300  capitalize text-sm">
                        {product?.node?.name}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ItemProductCard;
