"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { createStoreSession } from "@/features/manageStore/lib/storeSession";
import { StoreEdge, StorePayload } from "@/features/manageStore/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { AvatarFallback } from "@radix-ui/react-avatar";
import React, { useState } from "react";

type StoreProps = {
    storeEdges: StoreEdge[];
};

const StoresDropdownItems = ({ storeEdges }: StoreProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<string>();
    const { toast } = useToast();

    const goToStore = async (StorePayload: StorePayload) => {
        setIsLoading(true);
        const storeTokenSession = {
            token: StorePayload,
        };
        try {
            const storeSession = await createStoreSession(storeTokenSession);
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
        return (
            <>
                <DropdownMenuItem
                    key={store.node?.id}
                    className="flex gap-2"
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
                            name: store.node?.name
                                ? store.node.name
                                : "Untitled",
                        });
                    }}
                >
                    <Avatar className="h-6 w-6 !bg-blue-700">
                        {store.node?.profileImage && (
                            <AvatarImage
                                src={store.node.profileImage}
                                alt="@shadcn"
                            />
                        )}
                        <AvatarFallback className="!bg-blue-500">
                            CN
                        </AvatarFallback>
                    </Avatar>
                    <span className="text-xs">
                        {store.node?.name ? store.node.name : "Untitled"}
                    </span>
                </DropdownMenuItem>
            </>
        );
    });
};

export default StoresDropdownItems;
