"use client";

import Carousel, { CarouselSettingsProps } from "@/components/Carousel";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchProductDetails } from "@/features/manageProducts/lib/actions/product.actions";
import ProductRightSideBar from "@/layouts/ProductRightSideBar";

const page = ({ params }: { params: { itemId: string } }) => {
    const router = useRouter();

    const { itemId: id } = params;
    const [carouselActive, setCarouselActive] = useState<number>(0);

    const { data, error, isLoading } = useQuery({
        queryKey: ["productDetails", id],
        queryFn: () => fetchProductDetails(id),
    });

    if (error) {
        return <div>error fetching data...</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

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

    const courselSetting: CarouselSettingsProps = {
        itemsCount: data?.medias?.edges ? data?.medias?.edges.length : 0,
        visibleItems: 1,
        startIndex: carouselActive,
        activeItemIndex: carouselActive,
        ChangeActive: setCarouselActive,
    };

    return (
        <>
            <div className="h-full overflow-hidden w-full">
                <div className="h-full flex flex-col w-full max-md:max-h-[60vh]">
                    <Carousel
                        className="flex-grow !h-full"
                        settings={courselSetting}
                    >
                        {data?.medias?.edges?.map((media, index) => {
                            return (
                                <div
                                    key={index}
                                    className="w-full overflow-hidden mx-auto h-full !max-h-full"
                                >
                                    <div
                                        key={index}
                                        className="md:w-fit w-full min-h-full h-full max-h-full m-auto flex"
                                    >
                                        <Image
                                            className="object-cover md:w-fit w-full h-full max-h-full"
                                            // className="object-cover !max-h-full !h-full !min-h-full"
                                            // src={product.node.media}
                                            src={
                                                media?.node?.media
                                                    ? media.node.media
                                                    : "/"
                                            }
                                            alt="image"
                                            width="1000"
                                            height="191"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </Carousel>
                    <div className="flex max-md:hidden h-fit p-3 gap-4 justify-center w-full">
                        {/* <dflex> */}
                        {data?.medias?.edges?.map((media, index) => {
                            return (
                                <div className="w-12 rounded-sm bg-neutral-800 aspect-square">
                                    <Image
                                        className="object-cover h-full rounded-sm w-full max-h-full min-h-full"
                                        src={
                                            media?.node?.media
                                                ? media.node.media
                                                : "/"
                                        }
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
            <ProductRightSideBar store={data?.store} product={data as any} />
        </>
    );
};

export default page;
