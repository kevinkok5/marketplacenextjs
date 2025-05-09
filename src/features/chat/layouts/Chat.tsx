// Chat.tsx
"use client";
import React, { useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Conversation, Edge, Message, MessagesData } from "../lib/utils";
import { getConversationMessages } from "../lib/chat.actions";
import ChatMessages from "../components/ChatMessages";
import ChatForm from "../components/ChatForm";
import ChatNavbar from "../components/ChatNavbar";
import { Separator } from "@/components/ui/separator";
import { MessageCircleMore } from "lucide-react";
import { useWebSocket } from "@/hooks/useWebSocket";

const ws_endpoint = process.env.NEXT_PUBLIC_GRAPHQL_WS_URL || "";

// Custom hook for WebSocket handling
const useChatWebSocket = (chatId: string, token: string | null) => {
    const queryClient = useQueryClient();

    const wsRef = React.useRef<WebSocket | null>(null);
    const reconnectAttempts = React.useRef(0);
    const reconnectTimeout = React.useRef<NodeJS.Timeout | null>(null);
    const [isConnected, setIsConnected] = React.useState(false);

    const connectWebSocket = React.useCallback(() => {
        if (!chatId) return;

        const wsUrl = `${ws_endpoint}/chat/${chatId}/`;
        wsRef.current = token
            ? new WebSocket(wsUrl, ["jwt", token]) // Pass token in subprotocols
            : new WebSocket(wsUrl); // No token, standard WebSocket

        wsRef.current.onopen = () => {
            wsRef.current?.send(JSON.stringify({ type: "auth", token }));
            setIsConnected(true);
            reconnectAttempts.current = 0;
        };

        wsRef.current.onerror = (error) =>
            console.error("WebSocket error:", error);

        wsRef.current.onclose = () => {
            setIsConnected(false);
            // Exponential backoff with a max delay of 5 seconds
            const delay = Math.min(5000, 1000 * 2 ** reconnectAttempts.current);
            reconnectAttempts.current += 1;

            reconnectTimeout.current = setTimeout(() => {
                console.log(
                    `Reconnecting WebSocket (attempt #${reconnectAttempts.current})`
                );
                connectWebSocket();
            }, delay);
        };

        wsRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            // console.log("New message:", data);

            if (data?.id && data?.content) {
                queryClient.setQueryData(["chat", chatId], (oldData: any) => {
                    if (!oldData || oldData.errors) return oldData;

                    let updatedEdges = oldData.data?.messages?.edges || [];
                    const existingIndex = updatedEdges.findIndex(
                        (edge: any) => edge.node.id === data.id
                    );

                    if (existingIndex !== -1) {
                        // Update the existing message
                        updatedEdges[existingIndex] = {
                            ...updatedEdges[existingIndex],
                            node: {
                                ...updatedEdges[existingIndex].node,
                                ...data,
                            },
                        };
                    } else {
                        // Append the new message
                        updatedEdges = [...updatedEdges, { node: data }];
                    }

                    // Sort messages in ascending order (oldest first)
                    updatedEdges.sort(
                        (a: Edge<Message>, b: Edge<Message>) =>
                            new Date(a.node.createdAt).getTime() -
                            new Date(b.node.createdAt).getTime()
                    );

                    return {
                        data: {
                            ...oldData.data,
                            messages: {
                                ...oldData.data.messages,
                                edges: updatedEdges,
                            },
                        },
                    };
                });
            }
        };
    }, [chatId, token, queryClient]);

    React.useEffect(() => {
        connectWebSocket();

        return () => {
            console.log("Cleaning up WebSocket connection...");
            if (wsRef.current) {
                wsRef.current.onclose = null;
                wsRef.current.close();
            }
            if (reconnectTimeout.current) {
                clearTimeout(reconnectTimeout.current);
            }
        };
    }, [chatId, connectWebSocket]);

    return { ws: wsRef, isConnected, connectWebSocket };
};

type ChatProps = {
    chatId: string;
    forAId: string;
    token: string | null;
};

const Chat = ({ chatId, forAId, token }: ChatProps) => {
    const queryClient = useQueryClient();

    const handleOnMessage = (event: any) => {
        const data = JSON.parse(event.data);
        // console.log("New message:", data);

        if (data?.id && data?.content) {
            queryClient.setQueryData(["chat", chatId], (oldData: any) => {
                if (!oldData || oldData.errors) return oldData;

                let updatedEdges = oldData.data?.messages?.edges || [];
                const existingIndex = updatedEdges.findIndex(
                    (edge: any) => edge.node.id === data.id
                );

                if (existingIndex !== -1) {
                    // Update the existing message
                    updatedEdges[existingIndex] = {
                        ...updatedEdges[existingIndex],
                        node: {
                            ...updatedEdges[existingIndex].node,
                            ...data,
                        },
                    };
                } else {
                    // Append the new message
                    updatedEdges = [...updatedEdges, { node: data }];
                }

                // Sort messages in ascending order (oldest first)
                updatedEdges.sort(
                    (a: Edge<Message>, b: Edge<Message>) =>
                        new Date(a.node.createdAt).getTime() -
                        new Date(b.node.createdAt).getTime()
                );

                return {
                    data: {
                        ...oldData.data,
                        messages: {
                            ...oldData.data.messages,
                            edges: updatedEdges,
                        },
                    },
                };
            });
        }
    };

    const { ws, connectWebSocket } = useWebSocket(`/chat/${chatId}/`, {
        authorisationHeader: { token: token },
        retry: true,
        onmessage: handleOnMessage,
    });

    const { data, error, isLoading } = useQuery({
        queryKey: ["chat", chatId],
        queryFn: async () => await getConversationMessages(chatId),
    });

    // Memoize sorted messages to avoid unnecessary recalculations
    const sortedChat: MessagesData | undefined = useMemo(() => {
        const messages = data?.data?.messages;
        if (!messages) return undefined;
        const sortedEdges = [...(messages.edges || [])].sort(
            (a: Edge<Message>, b: Edge<Message>) =>
                new Date(a.node.createdAt).getTime() -
                new Date(b.node.createdAt).getTime()
        );
        return { ...messages, edges: sortedEdges };
    }, [data]);

    if (isLoading) return <div>Loading...</div>;

    if (error || data?.errors) {
        return (
            <div className="w-full flex-grow flex flex-col gap-6 justify-center items-center">
                <MessageCircleMore size={50} />
                <div className="text-center max-w-96">
                    <h1 className="font-bold text-3xl mb-1">
                        Select a conversation
                    </h1>
                    <p className="text-base">
                        Pick one from your existing conversations or go and find
                        a product to start one.
                    </p>
                </div>
            </div>
        );
    }

    const conversation: Conversation = data?.data?.conversation;

    return (
        <section className="flex flex-col w-full justify-between max-h-[calc(100dvh-48px)]">
            <ChatNavbar forAId={forAId} conversation={conversation} />
            <Separator className="dark:bg-neutral-800" />
            {sortedChat && <ChatMessages forAId={forAId} chat={sortedChat} />}
            <Separator />
            <ChatForm
                ws={ws}
                connectWebSocket={connectWebSocket}
                forAId={forAId}
            />
        </section>
    );
};

export default Chat;
