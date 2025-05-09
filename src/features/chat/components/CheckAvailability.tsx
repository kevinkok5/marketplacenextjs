"use client";

import { Button } from "@/components/ui/button";
import { MessageSquareText } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useWebSocket } from "@/hooks/useWebSocket";

// ✅ Validation schema
const formSchema = z.object({
    message: z.string().min(2, {
        message: "Le message doit contenir au moins 2 caractères.",
    }),
});

interface CheckAvailabilityProps {
    storeId: string | undefined;
    token: string | null;
    productId: string | null;
}

const CheckAvailability: React.FC<CheckAvailabilityProps> = ({
    storeId,
    token,
    productId,
}) => {
    const { toast } = useToast();

    // ✅ useForm hook
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { message: "" },
    });

    // ✅ Handle message sending
    const { ws, connectWebSocket } = useWebSocket(`/startChat/${storeId}/`, {
        authorisationHeader: { token: token },
        retry: true,
    });
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
            console.warn("⚠️ WebSocket is closed. Reconnecting...");
            connectWebSocket(); // Reconnect if the WebSocket was closed
        }

        setTimeout(() => {
            if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                const messageData = JSON.stringify({
                    type: "message",
                    content: values.message,
                    productId: productId,
                });
                ws.current.send(messageData);
                console.log("📤 Message sent:", messageData);

                toast({
                    className: "font-bold",
                    title: "Message envoyé ✔️✔️",
                });
                form.reset();
            } else {
                console.error(
                    "❌ Failed to send message: WebSocket is still closed."
                );
            }
        }, 500); // Small delay to allow reconnection
    };

    return (
        <div className="md:bottom-0 md:ml-[1px]  md:p-4 md:border-t md:border-solid dark:border-neutral-600 md:border-neutral-300 text-xs pb-3 flex gap-4 dark:bg-black bg-white w-full z-10 max-md:hidden">
            <div className="flex flex-col w-full gap-2">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold text-sm flex items-center gap-2">
                                        Contactez le Vendeur
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Tapez votre message ici..."
                                            {...field}
                                            className="font-medium text-[13.5px] text-neutral-800 dark:text-neutral-200 w-full resize-none border-[1.5px] border-neutral-300 bg-neutral-100 focus-visible:!ring-blue-50 dark:focus-visible:!ring-blue-950  hover:bg-neutral-200 focus:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-600 rounded-lg h-[10vh]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-full !bg-blue-600 hover:!bg-blue-500 dark:text-white mt-2"
                        >
                            Envoyer
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default CheckAvailability;
