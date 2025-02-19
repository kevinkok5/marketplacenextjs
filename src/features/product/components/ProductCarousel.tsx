"use client";
import Carousel, { CarouselSettingsProps } from "@/components/Carousel";
import { MediaEdge } from "@/features/manageProducts/lib/utils";
import Image from "next/image";
import React, { useState } from "react";

type ProductCarouselProps = {
    mediaEdges: MediaEdge[];
};

const ProductCarousel = ({ mediaEdges }: ProductCarouselProps) => {
    const [carouselActive, setCarouselActive] = useState<number>(0);

    const courselSetting: CarouselSettingsProps = {
        itemsCount: mediaEdges ? mediaEdges.length : 0,
        visibleItems: 1,
        startIndex: carouselActive,
        activeItemIndex: carouselActive,
        ChangeActive: setCarouselActive,
    };
    return (
        <div className="h-full overflow-hidden flex-grow">
            <div className="h-full flex flex-col w-full max-md:max-h-[60vh] max-md:h-[60vh]">
                <Carousel
                    className="flex-grow !h-full"
                    settings={courselSetting}
                >
                    {mediaEdges?.map((media, index) => {
                        return (
                            <div
                                key={index}
                                className="w-full overflow-hidden mx-auto h-full !max-h-full"
                            >
                                <div
                                    key={index}
                                    // className="relative bg-red-500 md:h-full w-full min-h-[60vh] h-full[60vh] max-h-full md:max-w-[800px] mx-auto"
                                    className="relative xl:max-w-[85%] max-w-full h-full w-auto max-md:h-[60vh] max-md:w-full mx-auto"
                                >
                                    <Image
                                        // className="object-cover md:max-w-min md:h-full w-full h-full max-h-full"
                                        className="object-cover md:max-w-fit mx-auto"
                                        src={
                                            media?.node?.media
                                                ? media.node.media
                                                : ""
                                        }
                                        alt="image"
                                        fill
                                        // width="1000"
                                        // height="191"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </Carousel>
                <div className="flex max-md:hidden h-fit p-3 gap-4 justify-center w-full">
                    {/* <dflex> */}
                    {mediaEdges?.map((media, index) => {
                        return (
                            <div
                                key={media?.node?.id}
                                className="w-12 rounded-sm bg-neutral-800 aspect-square"
                            >
                                <Image
                                    className="object-cover h-full rounded-sm w-full max-h-full min-h-full"
                                    src={
                                        media?.node?.media
                                            ? media.node.media
                                            : ""
                                    }
                                    alt="image"
                                    width="100"
                                    height="100"
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

export default ProductCarousel;
