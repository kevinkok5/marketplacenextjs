"use client";
import React from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

const SearchSheet = () => {
    return (
        <Sheet>
            <SheetTrigger>
                <p className="sm:hidden !bg-neutral-200 p-3 dark:!bg-neutral-800 text-black dark:text-neutral-100 hover:!bg-neutral-300 dark:hover:!bg-neutral-700 rounded-full">
                    <Search strokeWidth={2.5} size={16} />
                </p>
            </SheetTrigger>
            <SheetContent className=" p-2 pt-6">
                <SheetHeader className=" h-full">
                    <SheetTitle className="text-left hidden">
                        MarketPlace
                    </SheetTitle>
                    {/* <SheetDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                    </SheetDescription> */}
                    <div className="flex flex-col h-full">
                        <div className="py-4">
                            <div className="relative">
                                <Input
                                    placeholder="Search..."
                                    className="rounded-2xl !bg-input pl-8"
                                />
                                <Search
                                    size={18}
                                    className="absolute left-2 top-1/2 -translate-y-1/2"
                                />
                            </div>
                            {/* <CategoryCarousel /> */}
                        </div>
                        <div className="flex-grow text-left ">
                            <div className="w-full overflow-y-auto">
                                <div className="w-full flex justify-between items-center font-medium p-2">
                                    <p>cars</p>
                                    <X size={15} />
                                </div>
                                <div className="w-full flex justify-between items-center font-medium p-2">
                                    <p>samsung s4 ultra</p>
                                    <X size={15} />
                                </div>
                                <div className="w-full flex justify-between items-center font-medium p-2">
                                    <p>Ford figo 2021</p>
                                    <X size={15} />
                                </div>
                                <div className="w-full flex justify-between items-center font-medium p-2">
                                    <p>nike sneakers</p>
                                    <X size={15} />
                                </div>
                                <div className="w-full flex justify-between items-center font-medium p-2">
                                    <p>cars</p>
                                    <X size={15} />
                                </div>
                                <div className="w-full flex justify-between items-center font-medium p-2">
                                    <p>samsung s4 ultra</p>
                                    <X size={15} />
                                </div>
                                <div className="w-full flex justify-between items-center font-medium p-2">
                                    <p>Ford figo 2021</p>
                                    <X size={15} />
                                </div>
                                <div className="w-full flex justify-between items-center font-medium p-2">
                                    <p>nike sneakers</p>
                                    <X size={15} />
                                </div>
                                <div className="w-full flex justify-between items-center font-medium p-2">
                                    <p>cars</p>
                                    <X size={15} />
                                </div>
                                <div className="w-full flex justify-between items-center font-medium p-2">
                                    <p>samsung s4 ultra</p>
                                    <X size={15} />
                                </div>
                                <div className="w-full flex justify-between items-center font-medium p-2">
                                    <p>Ford figo 2021</p>
                                    <X size={15} />
                                </div>
                                <div className="w-full flex justify-between items-center font-medium p-2">
                                    <p>nike sneakers</p>
                                    <X size={15} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="aspect-square"></div>
                                <div className="aspect-square"></div>
                                <div className="aspect-square"></div>
                                <div className="aspect-square"></div>
                                <div className="aspect-square"></div>
                                <div className="aspect-square"></div>
                            </div>
                        </div>
                    </div>
                    <p>Meta</p>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
};

export default SearchSheet;
