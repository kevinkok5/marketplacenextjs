import React from "react";
import { Conversation } from "../lib/utils";
import { ChevronLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

type ChatNavbarProps = {
    className?: string;
    // onClick?: () => void;
    conversation: Conversation;
    forAId: string;
};

const ChatNavbar = ({ conversation, forAId, className }: ChatNavbarProps) => {
    if (!conversation) return null;
    const name =
        forAId == conversation.client?.id
            ? conversation.store?.name
            : conversation.client?.firstName;

    const profileImage =
        forAId == conversation.client?.id
            ? conversation.store?.profileImage
            : undefined;

    return (
        <Link href="/inbox">
            <div className="flex items-center p-3 bg-neutral-50 dark:bg-neutral-950">
                <ChevronLeft className="text-neutral-600" />
                <Avatar className="inline-flex w-10 h-10 ">
                    {profileImage && (
                        <AvatarImage
                            className="w-ful h-full object-cover"
                            src={profileImage}
                            alt={`${name}-profile-image`}
                        />
                    )}
                    <AvatarFallback className="w-full h-full uppercase">
                        {`${name ? name[0] : "U"}`}
                    </AvatarFallback>
                </Avatar>
                <p className="text-base font-medium ml-2">{name}</p>
            </div>
        </Link>
    );
};

export default ChatNavbar;
