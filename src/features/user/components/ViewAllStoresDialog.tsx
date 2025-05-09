"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import StoreItems from "@/features/manageStore/components/StoreItems";
import { getUserStores_reactQuery } from "@/features/manageStore/lib/actions/store.actions";
import { allStores, StoreEdge } from "@/features/manageStore/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ViewAllStoresDialog = () => {
    const searchParams = useSearchParams();
    const showStores = searchParams.get("stores") || "false";
    const searchPath = usePathname();
    const router = useRouter();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        setIsOpen(showStores === "true");
    }, [showStores]);
    const onOpenChange = () => {
        setIsOpen((prev) => !prev);
        router.push(`${searchPath}`);
    };
    const { data, error, isLoading } = useQuery({
        queryKey: ["userStores"],
        queryFn: async () => await getUserStores_reactQuery(),
    });

    const stores: { allUserStores: allStores } = data?.data;

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogTrigger asChild className="hidden"></DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className=" flex  font-semibold text-2xl capitalize">
                        Stores
                    </DialogTitle>
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        !(error || data?.errors) && (
                            <div className="h-[40vh] overflow-y-auto flex flex-col gap-3">
                                {stores?.allUserStores && (
                                    <StoreItems
                                        storeEdges={stores.allUserStores.edges}
                                    />
                                )}
                            </div>
                        )
                    )}
                    {/* <div className="flex gap-2 py-4 ">
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
                    </div> */}
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default ViewAllStoresDialog;
