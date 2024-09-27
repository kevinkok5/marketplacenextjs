import Link from "next/link";
import React from "react";

const ProductCard = ({ index }: { index: number }) => {
    return (
        <div className="product-card ">
            <Link href={`/item/${index}`}>
                <div className="w-full rounded-lg aspect-square bg-gray-500"></div>
            </Link>
            <div>description</div>
        </div>
    );
};

export default ProductCard;
