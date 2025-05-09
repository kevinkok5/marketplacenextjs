import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { type JSX } from "react";
import { Conversation as ConversationType } from "../lib/utils";
import { User } from "@/features/user/lib/utils";
import {
    HouseProduct,
    isHouseProduct,
    isItemProduct,
    isVehicleProduct,
    ItemProduct,
    VehicleProduct,
} from "@/features/manageProducts/lib/utils";

type ConversationProps = {
    className?: string;
    // onClick?: () => void;
    href: string;
    active?: boolean;
    external?: boolean;
    conversation: ConversationType;
    user: User;
    forAId: string;
};

const Conversation = ({
    className,
    href,
    active = false,
    external = false,
    conversation,
    user,
    forAId,
}: ConversationProps): JSX.Element => {
    const name =
        forAId == conversation.client?.id
            ? conversation.store?.name
            : conversation.client?.firstName;

    return (
        <Link href={href}>
            <div
                className={cn(
                    "flex px-3 py-3 gap-4 text-sm rounded-sm items-center transition duration-200 ease-out hover:bg-input font-light",
                    {
                        "bg-input": active,
                    },
                    className
                )}
            >
                {conversation.product && (
                    <Avatar className="w-12 h-12">
                        {conversation?.product.medias?.edges != undefined &&
                        conversation?.product.medias?.edges[0]
                            ? conversation?.product.medias?.edges[0].node
                                  ?.media && (
                                  <AvatarImage
                                      src={
                                          conversation?.product.medias?.edges[0]
                                              .node?.media
                                      }
                                      alt="product-image"
                                  />
                              )
                            : ""}

                        <AvatarFallback className="!bg-input">U</AvatarFallback>
                    </Avatar>
                )}
                <div className="flex-grow  h-12 flex flex-col justify-between">
                    <div>
                        <ProductName product={conversation.product} />
                        <p className="text-xs/[1] font-semibold dark:text-neutral-300">
                            : {name}
                        </p>
                        {/* <p className="text-base/[1] font-semibold">{name}</p> */}
                    </div>

                    <small className="text-sm dark:text-neutral-300 text-neutral-700 line-clamp-1">
                        {conversation.messages?.edges &&
                            conversation.messages.edges[0]?.node.content}
                    </small>
                </div>

                {external && <ChevronRight className="h-5 w-5" />}
            </div>
        </Link>
    );
};

const ProductName = ({
    product,
}: {
    product: ItemProduct | VehicleProduct | HouseProduct;
}) => {
    if (isItemProduct(product)) {
        return (
            <p className="text-sm/[1] font-semibold dark:text-neutral-300 line-clamp-1">
                {product.name}
            </p>
        );
    } else if (isVehicleProduct(product)) {
        return (
            <p className="text-sm/[1] font-semibold dark:text-neutral-300 line-clamp-1">
                {product.make} {product.model} {product.year}
            </p>
        );
    } else if (isHouseProduct(product)) {
        return (
            <p className="text-sm/[1] font-semibold dark:text-neutral-300 line-clamp-1">
                {product.description}
            </p>
        );
    } else
        return (
            <p className="text-sm/[1] font-semibold dark:text-neutral-300 line-clamp-1">
                UNTITLED
            </p>
        );
};

export default Conversation;
