"use client";

import { Button } from "@/components/ui/button";
import { updateForAId } from "@/features/chat/lib/chat.actions";
import { MessageSquareText } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

type GoToChatProps = {
    conversationId: string;
    userId: string;
    children: React.ReactNode;
};

const GoToChat: React.FC<GoToChatProps> = ({
    conversationId,
    userId,
    children,
}) => {
    const router = useRouter();
    const handleGoToChat = async () => {
        await updateForAId(userId);
        const link = encodeURIComponent(conversationId);
        router.push(`/inbox/${link}`);
    };

    return <div onClick={handleGoToChat}>{children}</div>;
};

export default GoToChat;
