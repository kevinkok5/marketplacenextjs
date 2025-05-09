"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import useStartChatWebSocket from "../hooks/useStartChatWebSocket";
import { useWebSocket } from "@/hooks/useWebSocket";

const formSchema = z.object({
    message: z.string().min(2, {
        message: "Le message doit contenir au moins 2 caractères.",
    }),
});

const CheckAvailabilityDialogForm = ({
    storeId,
    token,
    productId,
    dialogOnOpenChange,
}: {
    storeId: string | undefined;
    token: string | null;
    productId: string | null;
    dialogOnOpenChange: () => void;
}) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            message: "",
        },
    });

    const { toast } = useToast();

    // ✅ Handle message sending
    const { ws, connectWebSocket } = useWebSocket(`/startChat/${storeId}/`, {
        authorisationHeader: { token: token },
        retry: true,
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
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
                dialogOnOpenChange();
            } else {
                console.error(
                    "❌ Failed to send message: WebSocket is still closed."
                );
            }
        }, 500); // Small delay to allow reconnection
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                                <Textarea
                                    className="resize-none min-h-[120px] text-sm font-semibold text-neutral-700"
                                    placeholder="Veuillez saisir votre message."
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription className="text-[13px]">
                                Ne partagez pas votre e-mail, votre numéro de
                                téléphone ou vos informations financières.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end">
                    <Button type="submit">Send</Button>
                </div>
            </form>
        </Form>
    );
};

export default CheckAvailabilityDialogForm;
