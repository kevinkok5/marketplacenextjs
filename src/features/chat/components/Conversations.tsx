"use client";
import React, { useEffect, useRef, useState } from "react";
import Conversation from "./Conversation";
import { User } from "@/features/user/lib/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getConversations } from "../lib/chat.actions";
import {
    AllConversations,
    Conversation as ConversationType,
    Edge,
} from "../lib/utils";
import { useWebSocket } from "@/hooks/useWebSocket";

type ConversationsProps = {
    token: string | null;
    user: User;
    forAId: string;
};

const Conversations = ({ forAId, user, token }: ConversationsProps) => {
    // const ws = useRef<WebSocket | null>(null);
    // const [isConnected, setIsConnected] = useState(false);
    // const reconnectAttempts = useRef(0);
    // const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);
    const queryClient = useQueryClient();

    // const connectWebSocket = () => {
    //     if (!forAId) return;

    //     const wsUrl = `${ws_endpoint}/startChat/${forAId}/`;
    //     ws.current = new WebSocket(wsUrl);

    //     ws.current.onopen = () => {
    //         ws.current?.send(JSON.stringify({ type: "auth", token }));
    //         setIsConnected(true);
    //         reconnectAttempts.current = 0;
    //     };

    //     ws.current.onerror = (error) =>
    //         console.error("⚠️ WebSocket error:", error);

    //     ws.current.onclose = () => {
    //         setIsConnected(false);
    //         const delay = Math.min(5000, 1000 * 2 ** reconnectAttempts.current);
    //         reconnectAttempts.current += 1;
    //         reconnectTimeout.current = setTimeout(() => {
    //             console.log(
    //                 `♻️ Attempting WebSocket reconnect (#${reconnectAttempts.current})`
    //             );
    //             connectWebSocket();
    //         }, delay);
    //     };

    //     ws.current.onmessage = (event) => {
    //         const data = JSON.parse(event.data);
    //         console.log("📩 New message:", data);

    //         // Assume the message event contains enough information
    //         // to identify which conversation it belongs to.
    //         // For example, data might include conversationId and message details.
    //         if (data.id && data.messages) {
    //             // Update the React Query cache directly for an instant UI update.
    //             queryClient.setQueryData(
    //                 ["Conversations", forAId],
    //                 (oldData: any) => {
    //                     if (!oldData || oldData.errors) return oldData;

    //                     let added = false;
    //                     // Object.keys(oldData.data).forEach((key) =>
    //                     //     console.log(key)
    //                     // );
    //                     const updatedEdges = oldData.data?.edges
    //                         ? oldData.data.edges?.map((edge: any) => {
    //                               if (edge.node.id === data.id) {
    //                                   // Append the new message to the conversation's messages array.
    //                                   // Adjust this based on your actual data shape.
    //                                   console.log(
    //                                       "updating the conversation edge"
    //                                   );
    //                                   added = true;
    //                                   return {
    //                                       ...edge,
    //                                       node: {
    //                                           ...edge.node,
    //                                           ...data,
    //                                       },
    //                                   };
    //                               }
    //                               return edge;
    //                           })
    //                         : [];
    //                     if (!added) {
    //                         console.log("adding a new edge to conversation");
    //                         updatedEdges?.push({ node: data });
    //                     }
    //                     // Re-sort the conversations based on updated_at (most recent first)
    //                     updatedEdges.sort(
    //                         (
    //                             a: Edge<ConversationType>,
    //                             b: Edge<ConversationType>
    //                         ) => {
    //                             // parseDate;
    //                             return (
    //                                 new Date(b.node.updatedAt).getTime() -
    //                                 new Date(a.node.updatedAt).getTime()
    //                             );
    //                         }
    //                     );
    //                     return {
    //                         data: { ...oldData.data, edges: updatedEdges },
    //                     };
    //                 }
    //             );
    //         }
    //     };
    // };

    const handleOnMessage = (event: any) => {
        const data = JSON.parse(event.data);
        console.log("📩 New message:", data);

        // Assume the message event contains enough information
        // to identify which conversation it belongs to.
        // For example, data might include conversationId and message details.
        if (data.id && data.messages) {
            // Update the React Query cache directly for an instant UI update.
            queryClient.setQueryData(
                ["Conversations", forAId],
                (oldData: any) => {
                    if (!oldData || oldData.errors) return oldData;

                    let added = false;
                    // Object.keys(oldData.data).forEach((key) =>
                    //     console.log(key)
                    // );
                    const updatedEdges = oldData.data?.edges
                        ? oldData.data.edges?.map((edge: any) => {
                              if (edge.node.id === data.id) {
                                  // Append the new message to the conversation's messages array.
                                  // Adjust this based on your actual data shape.
                                  console.log("updating the conversation edge");
                                  added = true;
                                  return {
                                      ...edge,
                                      node: {
                                          ...edge.node,
                                          ...data,
                                      },
                                  };
                              }
                              return edge;
                          })
                        : [];
                    if (!added) {
                        console.log("adding a new edge to conversation");
                        updatedEdges?.push({ node: data });
                    }
                    // Re-sort the conversations based on updated_at (most recent first)
                    updatedEdges.sort(
                        (
                            a: Edge<ConversationType>,
                            b: Edge<ConversationType>
                        ) => {
                            // parseDate;
                            return (
                                new Date(b.node.updatedAt).getTime() -
                                new Date(a.node.updatedAt).getTime()
                            );
                        }
                    );
                    return {
                        data: { ...oldData.data, edges: updatedEdges },
                    };
                }
            );
        }
    };

    // useEffect(() => {
    //     connectWebSocket();

    //     return () => {
    //         console.log("🛑 Cleaning up WebSocket connection...");
    //         if (ws.current) {
    //             ws.current.onclose = null;
    //             ws.current.close();
    //         }
    //         if (reconnectTimeout.current) {
    //             clearTimeout(reconnectTimeout.current);
    //         }
    //     };
    // }, [forAId]);

    // ✅ Handle message sending

    const { isConnected } = useWebSocket(`/startChat/${forAId}/`, {
        authorisationHeader: { token: token },
        retry: true,
        onmessage: handleOnMessage,
    });

    const { data, error, isLoading } = useQuery({
        queryKey: ["Conversations", forAId],
        queryFn: async () => await getConversations(user?.id),
    });

    if (isLoading) {
        return <div>Loading.....</div>;
    }

    if (error || data?.errors) {
        return <div>An error occurred</div>;
    }

    const conversations: AllConversations = data?.data;

    return (
        conversations?.edges && (
            <div className="w-full h-full px-2 py-6 overflow-y-auto">
                {conversations.edges?.map((conversation) => {
                    const date = new Date(
                        conversation.node.updatedAt
                    ).getTime();
                    const link = encodeURIComponent(conversation.node.id);
                    return (
                        <Conversation
                            key={conversation.node.id}
                            user={user}
                            forAId={forAId}
                            conversation={conversation.node}
                            active={false}
                            href={`/inbox/${link}`}
                        />
                    );
                })}
            </div>
        )
    );
};

export default Conversations;
