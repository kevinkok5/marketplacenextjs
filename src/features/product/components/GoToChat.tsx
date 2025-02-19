"use client";

import { updateForAId } from "@/features/chat/lib/chat.actions";
import { MessageSquareText } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const GoToChat = ({
    conversationId,
    userId,
}: {
    conversationId: string;
    userId: string;
}) => {
    const router = useRouter();
    const handleGoToChat = async () => {
        await updateForAId(userId);
        router.push(`/inbox/${conversationId}`);
    };

    return (
        // <Link href={`/inbox/${hasConversation.data.conversationId}`}>
        <div
            onClick={handleGoToChat}
            className="flex gap-1 items-center rounded-md py-[16px] px-4 h-6 bg-input w-fit cursor-pointer"
        >
            <MessageSquareText className="h-5" />
            Message
        </div>
        // </Link>
    );
};

export default GoToChat;
