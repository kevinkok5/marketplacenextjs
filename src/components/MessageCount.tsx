"use client";

import {
    getConversations,
    getTotalUnread,
} from "@/features/chat/lib/chat.actions";
import { getUser } from "@/features/user/lib/actions/user.actions";
import { User } from "@/features/user/lib/utils";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const MessageCount = ({ user }: { user: User }) => {
    // const user = await getUser();
    const { data, error, isLoading } = useQuery({
        queryKey: ["messageCount", user],
        queryFn: async () => await getTotalUnread(user?.id),
    });

    console.log("message count: ", data?.data);

    return (
        <div className="w-[18px] h-[18px] flex justify-center items-center absolute -top-1 -right-1 rounded-full text-white bg-blue-600 font-semibold text-[9px]">
            {data && data.data.unreadCount}
        </div>
    );
};

export default MessageCount;
