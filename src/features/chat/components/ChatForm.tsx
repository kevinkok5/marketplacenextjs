// ChatForm.tsx
"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { SendHorizontal } from "lucide-react";

type ChatFormProps = {
    ws: React.RefObject<WebSocket | null>;
    connectWebSocket: () => void;
    forAId: string;
};

const formSchema = z.object({
    message: z.string().min(1, {
        message: "Le message doit contenir au moins 1 caractères.",
    }),
});

const ChatForm = ({ ws, connectWebSocket, forAId }: ChatFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { message: "" },
    });
    const { toast } = useToast();

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
            console.warn("⚠️ WebSocket is closed. Reconnecting...");
            connectWebSocket(); // Reconnect if WebSocket is closed
        }

        setTimeout(() => {
            if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                const messageData = JSON.stringify({
                    type: "message",
                    content: values.message,
                    forAId,
                });
                ws.current.send(messageData);
                console.log("sending");
                form.reset();
            } else {
                console.error(
                    "❌ Failed to send message: WebSocket is still closed."
                );
            }
        }, 500); // Small delay to allow reconnection
    }

    return (
        <div className="p-3">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex justify-center items-center gap-3 p-1 bg-neutral-100 dark:bg-neutral-900 max-h-[124px] h-auto rounded-3xl border dark:border-neutral-700"
                >
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem className="flex-grow">
                                <FormControl>
                                    <Textarea
                                        className="resize-none max-h-[124px] min-h-[20px] px-4 h-10 overflow-y-auto rounded-3xl text-sm font-medium !bg-transparent dark:text-white border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                        placeholder="Veuillez saisir votre message."
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className="!bg-transparent hover:!bg-[#38699227] rounded-full p-0 w-10 h-10"
                    >
                        <SendHorizontal
                            strokeWidth={2.25}
                            className="text-blue-600"
                            size={22}
                        />
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default ChatForm;
