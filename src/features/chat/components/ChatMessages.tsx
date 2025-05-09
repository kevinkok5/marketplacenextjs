"use client";
import React, { useEffect, useRef, useState } from "react";
import { MessagesData } from "../lib/utils";
import { cn, formatDateTime } from "@/lib/utils";
import { ChevronsDown } from "lucide-react";

type ChatProps = {
    chat: MessagesData;
    forAId: string;
};
const ChatMessages = ({ chat, forAId }: ChatProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isAtBottom, setIsAtBottom] = useState(true);
    const [showNewMessagesBtn, setShowNewMessagesBtn] = useState(false);

    // Threshold in pixels to consider the user "at bottom"
    const scrollThreshold = 60;
    const ticking = useRef(false);

    // Function to scroll to the bottom of the container
    const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
        containerRef.current?.scrollTo({
            top: containerRef.current.scrollHeight,
            behavior,
        });
    };

    // On initial mount, scroll to bottom immediately
    useEffect(() => {
        scrollToBottom("auto");
    }, []);

    // When new messages are received:
    // - Auto-scroll if the user is at the bottom.
    // - Otherwise, show a "New Messages" button.
    useEffect(() => {
        if (isAtBottom) {
            scrollToBottom();
        } else {
            setShowNewMessagesBtn(true);
        }
    }, [chat, isAtBottom]);

    // Throttled scroll event handler using requestAnimationFrame
    const handleScroll = () => {
        if (!containerRef.current) return;

        if (!ticking.current) {
            window.requestAnimationFrame(() => {
                const { scrollTop, scrollHeight, clientHeight } =
                    containerRef.current!;
                const atBottom =
                    scrollHeight - scrollTop - clientHeight <= scrollThreshold;
                setIsAtBottom(atBottom);
                if (atBottom) {
                    setShowNewMessagesBtn(false);
                }
                ticking.current = false;
            });
            ticking.current = true;
        }
    };

    // Add scroll event listener with passive option for performance improvements
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.addEventListener("scroll", handleScroll, { passive: true });
        return () => container.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        // <div className="relative">
        <div className="relative flex flex-col overflow-y-hidden flex-grow">
            <div
                ref={containerRef}
                className="flex flex-col max-w-full gap-4 px-4 overflow-y-auto pb-4 [&>div:last-child>small]:block"
            >
                {chat.edges.map((message) => {
                    // console.log(
                    //     "for a id: ",
                    //     forAId,
                    //     " sender id: ",
                    //     message.node.senderId
                    // );
                    return (
                        <div key={message.node.id} className="flex flex-col">
                            <p className="self-center font-medium text-xs mb-1 text-neutral-600 dark:text-neutral-300">
                                {formatDateTime(message.node?.createdAt)}
                            </p>
                            <div
                                key={message.node?.id}
                                className={cn(
                                    "bg-input w-fit max-w-[60%] rounded-3xl px-4 py-3 text-wrap whitespace-break-spaces font-normal text-[15px]",
                                    {
                                        "self-end":
                                            forAId == message.node.senderId,
                                        "dark:bg-blue-600 bg-blue-500":
                                            forAId == message.node.senderId,
                                        "text-white dark:text-neutral-200":
                                            forAId == message.node.senderId,
                                        "rounded-br-none":
                                            forAId == message.node.senderId,
                                        "rounded-bl-none":
                                            forAId != message.node.senderId,
                                    }
                                )}
                            >
                                {message.node.content}
                            </div>
                            <small
                                className={cn(
                                    "dark:text-neutral-300 text-dark lowercase italic hidden",
                                    {
                                        "self-end":
                                            forAId == message.node.senderId,

                                        "!hidden":
                                            forAId != message.node.senderId,
                                    }
                                )}
                            >
                                {message.node.status}
                            </small>
                        </div>
                    );
                })}
            </div>
            {showNewMessagesBtn && (
                <button
                    onClick={() => {
                        scrollToBottom();
                        setShowNewMessagesBtn(false);
                    }}
                    className="absolute bottom-5 right-5 transform -translate-x-5 bg-blue-500 dark:bg-neutral-900 border-neutral-800 text-white px-4 py-2 rounded-full"
                >
                    <ChevronsDown strokeWidth={2.25} size={18} />
                </button>
            )}
        </div>
    );
};

export default ChatMessages;
