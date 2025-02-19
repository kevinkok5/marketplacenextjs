import { DeepPatialHouseProduct } from "@/features/manageProducts/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HouseProductCard = ({ product }: { product: DeepPatialHouseProduct }) => {
    return (
        <div className="product-card ">
            <Link href={`/item/${product?.node?.id}`}>
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
                                product?.node?.productType
                                    ? `${product?.node?.productType} ${product?.node?.productType} image`
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
                        {product?.node?.description}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default HouseProductCard;
