"use client";

import React, { useState } from "react";
import { StoreEdge, StorePayload } from "../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createStoreSession } from "../lib/storeSession";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

type StoreProps = {
    storeEdges: StoreEdge[];
};
const StoreItems = ({ storeEdges }: StoreProps) => {
    const router = useRouter();
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
            if (storeSession.success) router.push("/manage");
        } catch (err) {
            toast({
                variant: "destructive",
                className: "font-bold",
                description: "Ooops! try again",
            });
        }
        setIsLoading(false);
    };
    return storeEdges?.map((store) => {
        return (
            store.node && (
                <div key={store.node?.id}>
                    <div
                        className="flex font-medium items-center gap-4 cursor-pointer hover:!bg-neutral-200 dark:hover:!bg-neutral-900 rounded-lg dark:bg-neutral-950 p-2 pr-4 justify-between"
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
                            <Avatar className="dark:!bg-neutral-800 dark:text-neutral-300 text-neutral-700">
                                {store.node?.profileImage && (
                                    <AvatarImage
                                        src={store.node.profileImage}
                                        alt="@shadcn"
                                    />
                                )}
                                <AvatarFallback className="dark:!bg-neutral-800 !bg-neutral-100  font-semibold uppercase">
                                    {store.node.name ? store.node.name[0] : "U"}
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
                        <div className="rounded-full flex items-center justify-center w-6 h-6 text-xs font-bold bg-blue-500 dark:bg-transparent text-white dark:text-white scroll-smooth">
                            78
                        </div>
                    </div>
                </div>
            )
        );
    });
};

export default StoreItems;
