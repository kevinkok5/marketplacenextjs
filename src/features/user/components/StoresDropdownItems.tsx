"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { createStoreSession } from "@/features/manageStore/lib/storeSession";
import { StoreEdge, StorePayload } from "@/features/manageStore/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type StoreProps = {
    storeEdges: StoreEdge[];
};

const StoresDropdownItems = ({ storeEdges }: StoreProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<string>();
    const { toast } = useToast();
    const router = useRouter();

    const goToStore = async (StorePayload: StorePayload) => {
        setIsLoading(true);
        const storeTokenSession = {
            token: StorePayload,
        };
        try {
            const storeSession = await createStoreSession(storeTokenSession);
            if (storeSession.success) {
                router.push("/manage");
            }
        } catch (err) {
            toast({
                variant: "destructive",
                className: "font-bold",
                description: "Ooops! try again",
            });
        }
        setIsLoading(false);
    };

    return storeEdges.map((store) => {
        if (!store.node) return null;
        return (
            <DropdownMenuItem
                key={store.node?.id}
                className="flex gap-2 sm:w-40 w-[40vw]"
                onClick={() => {
                    if (!store.node?.id) {
                        toast({
                            variant: "destructive",
                            className: "font-bold",
                            description:
                                "Ooops! Reload the page and try again.",
                        });
                        return;
                    }
                    setSelectedId(store.node?.id);
                    goToStore({
                        id: store.node?.id,
                        name: store.node?.name ? store.node.name : "Untitled",
                    });
                }}
            >
                <Avatar className="h-6 w-6">
                    {store.node?.profileImage && (
                        <AvatarImage
                            src={store.node.profileImage}
                            alt="@shadcn"
                        />
                    )}
                    <AvatarFallback className="!bg-input w-full text-[10px] grid place-content-center uppercase">
                        {store.node?.name ? store.node.name[0] : "U"}
                    </AvatarFallback>
                </Avatar>
                <p className="text-[13px] font-medium truncate">
                    {store.node?.name ? store.node.name : "Untitled"}
                </p>
            </DropdownMenuItem>
        );
    });
};

export default StoresDropdownItems;
