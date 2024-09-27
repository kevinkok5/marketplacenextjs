import ProductCard from "@/components/ProductCard";
import React from "react";

const page = () => {
    const products = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23,
    ];

    return (
        <div className="product-layout w-full py-6 px-8">
            {products.map((product, index) => (
                <ProductCard index={index} />
            ))}
        </div>
    );
};

export default page;
