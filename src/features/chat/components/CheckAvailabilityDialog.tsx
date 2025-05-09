"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { MessageSquareText } from "lucide-react";
import CheckAvailabilityDialogForm from "./CheckAvailabilityDialogForm";
import {
    isItemProduct,
    ItemProduct,
    Store,
    VehicleProduct,
} from "@/features/manageProducts/lib/utils";
import Image from "next/image";
import { useState } from "react";

type CheckAvailabilityDialogType = {
    product: ItemProduct | VehicleProduct;
    store: Partial<Store> | undefined;
    token: string | null;
    children?: React.ReactNode;
};

export const CheckAvailabilityDialog: React.FC<CheckAvailabilityDialogType> = ({
    product,
    store,
    token,
    children,
}) => {
    if (isItemProduct(product)) {
        const [open, setOpen] = useState<boolean>(false);
        const handleOpen = () => {
            setOpen(!open);
        };
        return (
            <Dialog open={open} onOpenChange={handleOpen}>
                <DialogTrigger asChild>{children}</DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle className=" flex  font-semibold text-2xl capitalize">
                            Message {store?.name}
                        </DialogTitle>
                        <div className="flex gap-2 py-4 ">
                            <div className="relative w-20 h-20 bg-red-100">
                                {product?.medias?.edges != undefined &&
                                product?.medias?.edges[0]
                                    ? product?.medias?.edges[0].node?.media && (
                                          <Image
                                              src={
                                                  product?.medias?.edges[0].node
                                                      ?.media
                                              }
                                              alt={
                                                  product?.name
                                                      ? `${product?.name}-image`
                                                      : "image"
                                              }
                                              fill
                                              className="w-full h-full object-cover"
                                          />
                                      )
                                    : ""}
                            </div>
                            <div className="h-full py-1">
                                <h3 className="font-semibold mb-[2px]">
                                    {product?.name}
                                </h3>
                                <p className="font-normal text-[13px] text-neutral-500">
                                    {product?.price}Fc
                                </p>
                            </div>
                        </div>
                    </DialogHeader>

                    <CheckAvailabilityDialogForm
                        token={token}
                        storeId={store?.id}
                        productId={product?.id}
                        dialogOnOpenChange={handleOpen}
                    />
                </DialogContent>
            </Dialog>
        );
    }
};
