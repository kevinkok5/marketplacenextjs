import { Separator } from "@/components/ui/separator";
import React from "react";

import Conversations from "../components/Conversations";
import { getUser } from "@/features/user/lib/actions/user.actions";
import ConversationsSelector from "../components/ConversationsSelector";
import { getConversations } from "../lib/chat.actions";
import { cookies } from "next/headers";

const ChatSidebar = async () => {
    const data = await getConversations();
    const user = await getUser();
    const forAId = cookies().get("forAId")?.value || user?.id;
    // const store = await getStore();

    // if (data.errors) return;

    return (
        <div className="flex flex-col min-w-[28rem] max-md:hidden sticky top-12 !h-[calc(100dvh-48px)]">
            <ConversationsSelector user={user} />

            {data.errors ? (
                <div className="w-full h-full px-2 py-6">
                    <div className="flex px-3 py-3 gap-4 text-sm rounded-sm items-center transition duration-200 ease-out hover:bg-input font-light">
                        Error
                    </div>
                </div>
            ) : (
                <>
                    <Conversations
                        forAId={forAId}
                        user={user}
                        data={data.data}
                    />
                </>
            )}
            <Separator orientation="vertical" className="absolute right-0" />
        </div>
    );
};

export default ChatSidebar;
