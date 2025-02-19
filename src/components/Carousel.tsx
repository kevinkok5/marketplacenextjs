"use client";
import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { useEffect } from "react";

interface ItemsPerBreakPoint {
    mobile?: number;
    tablet?: number;
    desktop?: number;
}

interface Controls {
    style?: React.CSSProperties;
    className?: string;
    icon?: React.ReactElement;
}

// interfact const VisibleItems:

export interface CarouselSettingsProps {
    itemsCount: number;
    startIndex?: number;
    ChangeActive: React.Dispatch<React.SetStateAction<number>>;
    activeItemIndex: number;
    visibleItems?: ItemsPerBreakPoint | number;
    visibleNextElement?: boolean;
    spaceInBetween?: number;
    paddingInline?: string;
    prev?: Controls;
    next?: Controls;
}

interface CarouselProps {
    children: React.ReactNode;
    settings: CarouselSettingsProps;
    className?: string;
}

const Carousel: React.FC<CarouselProps> = ({
    children,
    settings,
    className,
}) => {
    const {
        itemsCount,
        startIndex = 0,
        ChangeActive,
        activeItemIndex,
        visibleItems,
        spaceInBetween = 0,
        visibleNextElement = false,
        paddingInline = "20px",
        prev,
        next,
    } = settings;

    const getVisibleItems = (): number => {
        if (visibleItems && typeof visibleItems !== "number") {
            if (window.innerWidth < 600)
                return visibleItems?.mobile ? visibleItems.mobile : 2;
            else if (window.innerWidth < 1024)
                return visibleItems?.tablet ? visibleItems.tablet : 3;
            else return visibleItems.desktop ? visibleItems.desktop : 3;
        }
        return visibleItems ? visibleItems : 3;
    };

    const containerRef = useRef<HTMLDivElement | null>(null);
    // const [index, ChangeActive] = useState<number>(startIndex);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [startX, setStartX] = useState<number>(startIndex);
    const [translateX, setTranslateX] = useState<number>(0);
    const [currrentVisibleItems, setCurrentVisisbleItems] = useState<number>(
        getVisibleItems()
    );
    const handleNext = () => {
        if (itemsCount > activeItemIndex + currrentVisibleItems) {
            ChangeActive(activeItemIndex + 1);
        }
    };
    const handlePrev = () => {
        if (activeItemIndex > 0) {
            ChangeActive(activeItemIndex - 1);
        }
    };

    const containerStyle = {
        maxWidth: "100%",
        height: "100%",
        // transition: "transform .3s ease-out",
        paddingInline: visibleNextElement ? paddingInline : 0,
    };

    const itmesStyle = {
        gap: spaceInBetween * 4,
        maxWidth: `calc(100% - ${
            !!spaceInBetween
                ? spaceInBetween * 4 * (currrentVisibleItems - 1)
                : 0
        }px)`,
        transition: "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    };

    const childStyle = {
        minWidth: `calc(${100 / currrentVisibleItems}%)`,
    };

    // SWIPE CONTROL
    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        setIsDragging(true);
        setStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (isDragging) {
            const diff = e.touches[0].clientX - startX;
            setTranslateX(diff);

            if (containerRef.current) {
                const threshold = containerRef.current.offsetWidth / 6; // 25% of the container width

                if (diff > threshold && activeItemIndex > 0) {
                    handlePrev();
                    setIsDragging(false);
                } else if (
                    diff < -threshold &&
                    activeItemIndex < itemsCount - currrentVisibleItems
                ) {
                    handleNext();
                    setIsDragging(false);
                }
            }
        }
    };

    // const handleTouchEnd = () => {
    //     setIsDragging(false);
    //     if (translateX > 50 && activeItemIndex > 0) {
    //         handlePrev();
    //     } else if (
    //         translateX < -50 &&
    //         activeItemIndex < itemsCount.length - currrentVisibleItems
    //     ) {
    //         handleNext();
    //     }
    //     setTranslateX(0);
    // };

    useEffect(() => {
        function handleResize() {
            setCurrentVisisbleItems(getVisibleItems());
        }
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (containerRef.current)
            containerRef.current.style.transform = `translateX(calc(-${
                (100 / currrentVisibleItems) * activeItemIndex
            }% - ${spaceInBetween * 4 * activeItemIndex}px))`;
    }, [activeItemIndex, visibleItems]);

    return (
        <div
            className={cn(
                "multi-carousel overflow-hidden w-full max-w-full relative",
                className
            )}
        >
            <div className="multi-carousel_container" style={containerStyle}>
                <div
                    className="multi-courousel_items h-full flex"
                    style={itmesStyle}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    // onTouchEnd={handleTouchEnd}
                    ref={containerRef}
                >
                    {React.Children.map(
                        children,
                        (child) =>
                            React.isValidElement<{
                                style?: React.CSSProperties;
                                // className?: string;
                                // ref?: React.Ref<any>;
                                // id?: string;
                                // onClick?: () => void;
                            }>(child)
                                ? React.cloneElement(child, {
                                      style: {
                                          ...childStyle,
                                          ...child.props.style,
                                      },
                                      //   className: `${
                                      //       child.props.className || ""
                                      //   } custom-class`,
                                      //   ref: child.ref,
                                      //   id: child.props.id || "default-id", // Example of adding an ID
                                      //   onClick: () => {
                                      //       console.log("Child clicked!");
                                      //   }, // Example of adding an onClick handler
                                  })
                                : child // Return the child as is if it's not a valid ReactElement
                    )}
                </div>
            </div>
            <button
                id="next"
                onClick={handleNext}
                disabled={itemsCount <= activeItemIndex + currrentVisibleItems}
                style={next?.style}
                className={cn(
                    "absolute cursor-pointer border-none right-2 top-[40%] w-11 h-11 bg-slate-400 rounded-full grid place-items-center disabled:bg-slate-400 disabled:text-slate-500",
                    next?.className
                )}
            >
                {next?.icon ? next.icon : "next"}
            </button>
            <button
                id="prev"
                onClick={handlePrev}
                disabled={activeItemIndex <= 0}
                style={prev?.style}
                className={cn(
                    "absolute cursor-pointer border-none left-2 top-[40%] w-11 h-11 bg-slate-400 rounded-full grid place-items-center disabled:bg-slate-400 disabled:text-slate-500",
                    prev?.className
                )}
            >
                {prev?.icon ? prev.icon : "prev"}
            </button>
        </div>
    );
};

export default Carousel;
