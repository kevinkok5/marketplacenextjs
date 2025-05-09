import { Separator } from "@/components/ui/separator";
import React from "react";

import Conversations from "../components/Conversations";
import { getUser } from "@/features/user/lib/actions/user.actions";
import ConversationsSelector from "../components/ConversationsSelector";
// import { getConversations } from "../lib/chat.actions";
import { cookies } from "next/headers";
import { getAccessToken } from "@/lib/manageToken";
import { cn } from "@/lib/utils";

const ChatSidebar = async ({ className }: { className?: string }) => {
    // const data = await getConversations();
    const user = await getUser();
    const forAId = (await cookies()).get("forAId")?.value || user?.id;
    const token = await getAccessToken();

    // const store = await getStore();

    // if (data.errors) return;

    return (
        <div
            className={cn(
                "flex flex-col sm:min-w-[28rem] w-full sticky top-12 max-h-[calc(100dvh-48px)]",
                className
            )}
        >
            <ConversationsSelector user={user} />

            <Conversations forAId={forAId} user={user} token={token} />
            <Separator
                orientation="vertical"
                className="absolute right-0 max-sm:hidden"
            />
        </div>
    );
};

export default ChatSidebar;
