import CollapsibleSidebarListItems from "@/components/CollapsibleSidebarListItems";
import SidebarLinkListItem from "@/components/SidebarLinkListItem";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { History, MessageSquare, MessageSquareText, X } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/features/user/lib/utils";
import { ItemProduct, Store } from "@/features/manageProducts/lib/utils";
import { Button } from "@/components/ui/button";

export type ProductRightSideBarProps = {
    store: Partial<Store> | undefined;
    product: ItemProduct;
};

const ProductRightSideBar: React.FC<ProductRightSideBarProps> = ({
    store,
    product,
}) => {
    return (
        <div className="flex flex-col min-w-[25rem] md:static md:top-12 md:!h-[calc(100dvh-48px)] ">
            <Separator
                orientation="vertical"
                className="absolute top-0 max-md:hidden h-full"
            />
            <div className="md:flex md:flex-col md:max-h-full h-full justify-between">
                <div className="w-full px-2 overflow-x-hidden md:overflow-y-auto md:flex-grow">
                    <div className=" px-3 flex flex-col">
                        <div className="py-4 flex flex-col gap-2 md:hidden">
                            <h2 className="font-semibold text-xl">
                                {product.name}
                            </h2>
                            <h3 className="font-semibold">
                                {product.price} Fc
                            </h3>
                            <p className="dark:text-neutral-400">
                                Listed 2 weeks ago in Lubumbashi
                            </p>
                        </div>
                        <div className="py-4 flex gap-3">
                            <Avatar className="inline-flex md:w-14 md:h-14 w-10 h-10 ">
                                <AvatarImage
                                    className="w-ful h-full object-cover"
                                    src={
                                        store?.profileImage || "/icons/logo.svg"
                                    }
                                    alt="@shadcn"
                                />
                                <AvatarFallback className="w-full h-full uppercase">
                                    {`${store?.name ? store?.name[0] : "U"}`}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col justify-center capitalize">
                                <h2 className="">{`${
                                    store?.name ? store?.name : "UNTITLED"
                                }`}</h2>
                                <div className="flex text-xs">
                                    <span>⭐</span>
                                    <span>⭐</span>
                                    <span>⭐</span>
                                    <span>⭐</span>
                                    <span>⭐</span>
                                    (75)
                                </div>
                            </div>
                        </div>
                        <div className="text-xs py-3 flex gap-4">
                            <div className="flex gap-1 items-center rounded-md py-[16px] px-4 h-6 bg-input w-fit">
                                <MessageSquareText className="h-5" />
                                Message
                            </div>
                            <div className="flex gap-1 items-center rounded-md py-[16px] px-4 h-6 bg-input w-fit">
                                <MessageSquareText className="h-5" />
                                Message
                            </div>
                            <div className="flex gap-1 items-center rounded-md py-[16px] px-4 h-6 bg-input w-fit">
                                <MessageSquareText className="h-5" />
                                Message
                            </div>
                        </div>
                        <div className="text-xs py-3 flex gap-4 dark:bg-black bg-white w-full z-10 md:hidden">
                            <div className="flex flex-col w-full gap-1">
                                <h3 className="font-bold text-sm flex items-center gap-2">
                                    <MessageSquareText size={20} />
                                    Contacter le Vendeur
                                </h3>
                                <div className="w-full border-[1.5px] border-neutral-300 bg-neutral-100 hover:bg-neutral-200 rounded-lg h-[8vh]"></div>
                                <Button className="w-full !bg-blue-600 hover:!bg-blue-500 dark:text-white mt-2">
                                    Send
                                </Button>
                            </div>
                        </div>
                    </div>
                    <Separator className="my-2" />

                    {product.description && (
                        <div className="px-3">
                            <h3 className="font-semibold text-sm">
                                Description
                            </h3>
                            <p className="font-medium p-2 dark:text-neutral-300 text-neutral-600">
                                {product.description}
                            </p>
                        </div>
                    )}

                    {/* {product.condition && ( */}
                    <div className="px-3 pt-2">
                        <h3 className="font-semibold text-sm">Details</h3>
                        <p className="font-medium dark:text-neutral-300 text-neutral-600 p-2">
                            Condition:{" "}
                            <span className="text-black dark:text-white">
                                New
                            </span>
                        </p>
                    </div>
                    {/* )} */}

                    {/* <Separator className="my-2" /> */}
                </div>
                <div className="md:bottom-0 md:ml-[1px] md:p-4 md:border-t md:border-solid dark:border-neutral-600 md:border-neutral-300 text-xs pb-3 flex gap-4 dark:bg-black bg-white w-full z-10 max-md:hidden">
                    <div className="flex flex-col w-full gap-2">
                        <h3 className="font-bold text-sm flex items-center gap-2">
                            <MessageSquareText size={20} />
                            Contacter le Vendeur
                        </h3>
                        <div className="w-full border-[1.5px] border-neutral-300 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-600 rounded-lg h-[10vh]"></div>
                        <Button className="w-full !bg-blue-600 hover:!bg-blue-500 dark:text-white mt-2">
                            Send
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductRightSideBar;
