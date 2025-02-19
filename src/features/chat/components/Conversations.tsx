"use client";
import React, { useEffect, useState } from "react";
import { AllConversations } from "../lib/utils";
import Conversation from "./Conversation";
import { User } from "@/features/user/lib/utils";
// import Cookies from "js-cookie";

type ConversationsProps = {
    data: AllConversations;
    user: User;
    forAId: string;
};

const Conversations = ({ forAId, data, user }: ConversationsProps) => {
    // const [forA, setForA] = useState("");

    // useEffect(() => {
    //     const getCookie = (name: string) => {
    //         const cookies = document.cookie.split("; ");
    //         const cookie = cookies.find((row) => row.startsWith(name + "="));
    //         return cookie ? cookie.split("=")[1] : null;
    //     };

    //     setForA(getCookie("username") || "Guest");
    // }, []);

    return (
        <>
            <div className="w-full h-full px-2 py-6">
                {data.edges.map((conversation) => (
                    <Conversation
                        key={conversation.node.id}
                        user={user}
                        forAId={forAId}
                        conversation={conversation.node}
                        active={false}
                        href={`/inbox/${conversation.node.id}`}
                    />
                ))}
            </div>
        </>
    );
};

export default Conversations;
