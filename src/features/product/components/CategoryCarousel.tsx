"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const CategoryCarousel = () => {
    const categories = [
        "Cars",
        "Houses",
        "Clothes",
        "Sneakers",
        "Toys",
        "Books",
        "Rentals",
        "Gifts",
        "Furnitures",
        "Beds",
        "Furnitures",
        "Mobiles",
        "Tele-visions",
        "Couches",
        "Couches",
        "Couches",
    ];

    const [totalWidth, setTotalWidth] = useState(0);
    const [visibleWidth, setVisibleWidth] = useState(0);
    const [currentScrollAmount, setCurrentScrollAmount] = useState(0);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const itemsRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let calculateWidthsTimeout: NodeJS.Timeout;

        const calculateWidths = () => {
            clearTimeout(calculateWidthsTimeout);
            calculateWidthsTimeout = setTimeout(() => {
                if (containerRef.current && itemsRef.current) {
                    const TotalWidth = itemsRef.current.offsetWidth;
                    const VisibleWidth = containerRef.current.offsetWidth;

                    setTotalWidth(TotalWidth);

                    setVisibleWidth(VisibleWidth);
                    // setSpacebetween(TotalWidth / categories.length);
                }
            }, 500);
        };

        calculateWidths();

        window.addEventListener("resize", calculateWidths);
        return () => {
            clearTimeout(calculateWidthsTimeout);
            window.removeEventListener("resize", calculateWidths);
        };
    }, []);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        const calculateCurrentScrollAmountOnResize = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                if (containerRef.current && itemsRef.current) {
                    const VisibleWidth = containerRef.current.offsetWidth;
                    const TotalWidth = itemsRef.current.offsetWidth;

                    console.log(
                        "current visible: ",
                        VisibleWidth,
                        " before: ",
                        visibleWidth,
                        " widht",
                        VisibleWidth - visibleWidth
                    );

                    !(totalWidth - currentScrollAmount > VisibleWidth) &&
                        (visibleWidth < VisibleWidth
                            ? setCurrentScrollAmount((prev) => {
                                  return Math.max(
                                      0,
                                      prev - (VisibleWidth - visibleWidth)
                                  );
                              })
                            : setCurrentScrollAmount((prev) =>
                                  Math.max(
                                      Math.min(
                                          TotalWidth,
                                          prev + (VisibleWidth - visibleWidth)
                                      ),
                                      prev - (VisibleWidth - visibleWidth)
                                  )
                              ));
                }
            }, 500);
        };
        window.addEventListener("resize", calculateCurrentScrollAmountOnResize);
        return () => {
            clearTimeout(timeout);
            window.removeEventListener(
                "resize",
                calculateCurrentScrollAmountOnResize
            );
        };
    });

    console.log("current visible width:", visibleWidth);

    const scrollStep = totalWidth * 0.1;

    const canScrollLeft = currentScrollAmount > 0;
    const canScrollRight =
        totalWidth - (currentScrollAmount + visibleWidth) > 0;

    console.log("currentScrollAmount: ", currentScrollAmount);

    const nextSlide = () => {
        if (canScrollRight) {
            setCurrentScrollAmount(
                (prev) =>
                    prev +
                    Math.min(scrollStep, totalWidth - (prev + visibleWidth))
            );
        }
    };

    const prevSlide = () => {
        if (canScrollLeft) {
            setCurrentScrollAmount((prev) => prev - Math.min(scrollStep, prev));
        }
    };

    return (
        <>
            <div
                className="relative sm:sticky top-12 z-10 max-w-full flex-grow px-10 max-sm:hidden bg-background md:border-b
            md:border-neutral-200 md:dark:border-neutral-800 "
            >
                <div
                    className="max-w-full flex-grow sm:overflow-hidden"
                    ref={containerRef}
                >
                    {/* <div className="max-sm:hidde md:hidde bg-background  md:border-b md:border-neutral-800 flex flex-nowrap gap-2 flex-grow overflow-x-scroll py-2 md:px-8 sm:px-4 px-1"> */}
                    <div
                        className="flex gap-4 py-2 transition-transform duration-300 ease-in-out w-fit "
                        style={{
                            transform: `translateX(-${currentScrollAmount}px)`,
                        }}
                        ref={itemsRef}
                    >
                        <Button
                            size="sm"
                            className="dark:!bg-neutral-200 !bg-blue-500 rounded-lg text-xs !text-white dark:!text-black "
                        >
                            Tous
                        </Button>
                        {categories?.map((category, index) => (
                            <Button
                                key={index}
                                size="sm"
                                className="!bg-input rounded-lg text-xs !text-black dark:!text-white "
                            >
                                {category}
                            </Button>
                        ))}
                    </div>

                    <Button
                        size="sm"
                        onClick={prevSlide}
                        disabled={!canScrollLeft}
                        className="left-2 top-3 h-fit absolute z-10 rounded-full max-sm:hidden p-1 !bg-background !text-black dark:!text-white hover:!bg-[#7aadff9a] dark:hover:!bg-neutral-800 hover:!text-black dark:hover:!text-white"
                    >
                        <ChevronLeft size={16} />
                    </Button>

                    <Button
                        size="sm"
                        onClick={nextSlide}
                        disabled={!canScrollRight}
                        className="right-2 h-fit p-1 top-3 absolute z-10 rounded-full max-sm:hidden shadow-lg !bg-background !text-black dark:!text-white hover:!bg-[#7aadff9a] dark:hover:!bg-neutral-800 hover:!text-black  dark:hover:!text-white"
                    >
                        <ChevronRight size={16} />
                    </Button>
                </div>
            </div>
            <div className="relative max-w-full flex-grow px-2 sm:hidden bg-background md:border-b md:border-neutral-800">
                <div className="max-w-full flex-grow sm:hidden overflow-x-scroll no-scrollbar">
                    {/* <div className="max-sm:hidde md:hidde bg-background  md:border-b md:border-neutral-800 flex flex-nowrap gap-2 flex-grow overflow-x-scroll py-2 md:px-8 sm:px-4 px-1"> */}
                    <div className="flex gap-4 pt-2 transition-transform duration-300 ease-in-out w-fit ">
                        <Button
                            size="sm"
                            className="dark:!bg-neutral-200 !bg-blue-500 rounded-lg text-xs !text-white dark:!text-black"
                        >
                            Tous
                        </Button>
                        {categories?.map((category, index) => (
                            <Button
                                key={index}
                                size="sm"
                                className="!bg-input rounded-lg text-xs !text-black dark:!text-white"
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoryCarousel;
