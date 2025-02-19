"use client";
import React from "react";
import { MessagesData } from "../lib/utils";

type ChatProps = {
    chat: MessagesData;
};
const Chat = ({ chat }: ChatProps) => {
    // console.log("Chat: ", chat);
    return (
        <section className="flex flex-col bg-red-100 w-full px-4">
            <div>
                {chat.edges.map((message) => (
                    <div>{message.node.content}</div>
                ))}
            </div>
            <div>new message</div>
        </section>
    );
};

export default Chat;
