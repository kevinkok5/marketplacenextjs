import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Conversation as ConversationType } from "../lib/utils";
import { User } from "@/features/user/lib/utils";

type ConversationProps = {
    className?: string;
    // onClick?: () => void;
    href: string;
    active?: boolean;
    external?: boolean;
    conversation: ConversationType;
    user: User;
    forAId: string;
};

const Conversation = ({
    className,
    href,
    active = false,
    external = false,
    conversation,
    user,
    forAId,
}: ConversationProps): JSX.Element => {
    const name =
        forAId == conversation.client.id
            ? conversation.store.name
            : conversation.client.firstName;

    return (
        <Link href={href}>
            <div
                className={cn(
                    "flex px-3 py-3 gap-4 text-sm rounded-sm items-center transition duration-200 ease-out hover:bg-input font-light",
                    {
                        "bg-input": active,
                    },
                    className
                )}
            >
                <Avatar className="w-12 h-12">
                    <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                    />
                    <AvatarFallback className="!bg-green-400">
                        CN
                    </AvatarFallback>
                </Avatar>
                <div className="flex-grow  h-12 flex flex-col gap-1">
                    <p className="text-base/[1.4] font-semibold">{name}</p>
                    <small className="text-sm text-neutral-300">
                        {conversation.messages.edges[0].node.content}
                    </small>
                </div>

                {external && <ChevronRight className="h-5 w-5" />}
            </div>
        </Link>
    );
};

export default Conversation;
