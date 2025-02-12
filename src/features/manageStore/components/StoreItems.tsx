"use client";

import React, { useState } from "react";
import { StoreEdge, StorePayload } from "../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createStoreSession } from "../lib/storeSession";
import { useToast } from "@/hooks/use-toast";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { CreditCard } from "lucide-react";
import { Loader2 } from "lucide-react";

type StoreProps = {
    storeEdges: StoreEdge[];
};
const StoreItems = ({ storeEdges }: StoreProps) => {
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
                <li
                    key={store.node?.id}
                    className="flex font-semibold items-center gap-4 cursor-pointer hover:bg-neutral-300 rounded-lg bg-neutral-200 p-2 justify-between"
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
                    <div className="flex gap-4 items-center">
                        <Avatar className="!bg-neutral-200 text-neutral-700">
                            {store.node?.profileImage && (
                                <AvatarImage
                                    src={store.node.profileImage}
                                    alt="@shadcn"
                                />
                            )}
                            <AvatarFallback className="!bg-neutral-100 font-semibold">
                                CN
                            </AvatarFallback>
                        </Avatar>
                        {store.node?.name ? store.node.name : "Untitled"}
                    </div>

                    {isLoading && selectedId == store.node?.id && (
                        <Loader2
                            strokeWidth={2.75}
                            className="h-6 w-6 animate-spin text-gray-400"
                        />
                    )}
                </li>
            </>
        );
    });
};

export default StoreItems;
