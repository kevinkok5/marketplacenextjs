"use client";

import React, { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { allStores } from "@/features/manageStore/lib/utils";
import { User } from "@/features/user/lib/utils";
import { updateForAId } from "../lib/chat.actions";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

type ConversationsSelectorDialogProps = {
    stores: allStores;
    user: User;
};

const ConversationsSelectorDialog = ({
    stores,
    user,
}: ConversationsSelectorDialogProps) => {
    const queryClient = useQueryClient();

    const userId = user.id || "";
    const params = useParams();
    const { chat } = params;
    const chatId =
        typeof chat == "string" ? decodeURIComponent(chat) : undefined;

    const getCookie = (name: string) => {
        if (typeof document === "undefined") return null; // ✅ Prevents SSR error

        const cookies = document.cookie.split("; ");
        const cookie = cookies.find((row) => row.startsWith(name + "="));
        return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
    };

    const [value, setValue] = useState<string>("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedValue = getCookie("forAId") || userId;
            setValue(storedValue);
        }
    }, [userId]);

    const handleSelect = async (newValue: string) => {
        console.log("chat param: ", chatId);
        if (typeof chatId == "string") {
            queryClient.removeQueries({ queryKey: ["chat"] });
        }

        await updateForAId(newValue, chatId); // Call server action to update cookie + revalidate
        setValue(newValue);
    };

    return (
        <Select value={value} onValueChange={handleSelect}>
            <SelectTrigger className="font-bold !text-xl px-4 border-none focus:border-none dark:focus:border-none dark:ring-transparent ring-transparent focus:ring-transparent focus:ring-offset-transparent ring-offset-transparent  dark:focus:ring-transparent">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value={user?.id}>{user?.firstName}</SelectItem>
                    {stores &&
                        stores.edges?.map(
                            (store) =>
                                store.node?.id && (
                                    <SelectItem
                                        key={store.node.id}
                                        value={store.node.id}
                                    >
                                        {store.node?.name}
                                    </SelectItem>
                                )
                        )}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default ConversationsSelectorDialog;
