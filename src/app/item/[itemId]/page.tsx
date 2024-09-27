"use client";
import Carousel, { CarouselSettingsProps } from "@/components/Carousel";
import { Settings } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const page = () => {
    const [carouselActive, setCarouselActive] = useState<number>(0);
    const products = [
        {
            imageUrl:
                "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            imageUrl:
                "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            imageUrl:
                "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            imageUrl:
                "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            imageUrl:
                "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            imageUrl:
                "https://images.unsplash.com/photo-1564540583246-934409427776?q=80&w=2053&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            imageUrl:
                "https://i.pinimg.com/564x/a9/cf/02/a9cf0250a99536ce45e6a082105cbf28.jpg",
        },
        {
            imageUrl:
                "https://i.pinimg.com/736x/23/84/44/2384447f579b4b8887120186a258493b.jpg",
        },
        {
            imageUrl:
                "https://i.pinimg.com/564x/b1/a8/7f/b1a87f0bbada69e1b8ab2f5d63280d24.jpg",
        },
    ];

    const courselSetting: CarouselSettingsProps = {
        itemsCount: products.length,
        visibleItems: 1,
        startIndex: carouselActive,
        activeItemIndex: carouselActive,
        ChangeActive: setCarouselActive,
    };

    return (
        <div className="h-full overflow-hidden w-full">
            <div className="h-full flex flex-col w-full">
                <Carousel className="flex-grow" settings={courselSetting}>
                    {products.map((product, index) => {
                        return (
                            <div
                                key={index}
                                className="w-full overflow-hidden mx-auto h-full !max-h-full"
                            >
                                <div
                                    key={index}
                                    className="w-fit !h-full m-auto"
                                >
                                    <Image
                                        className="object-cover w-fit h-full max-h-full"
                                        src={product.imageUrl}
                                        alt="image"
                                        width="1200"
                                        height="991"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </Carousel>
                <div className="flex h-fit p-3 gap-4 justify-center w-full">
                    {/* <dflex> */}
                    {products.map((product, index) => {
                        return (
                            <div className="w-12 rounded-sm bg-red-500 aspect-square">
                                <Image
                                    className="object-cover h-full rounded-sm w-full max-h-full min-h-full"
                                    src={product.imageUrl}
                                    alt="image"
                                    width="600"
                                    height="400"
                                    onClick={() => setCarouselActive(index)}
                                />
                            </div>
                        );
                    })}
                    {/* </dflex> */}
                </div>
            </div>
        </div>
    );
};

export default page;
