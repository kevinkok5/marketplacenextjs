import { useQueryClient } from "@tanstack/react-query";
import React from "react";

const ws_endpoint = process.env.NEXT_PUBLIC_GRAPHQL_WS_URL || "";

const useStartChatWebSocket = (
    storeId: string | undefined,
    token: string | null
) => {
    const queryClient = useQueryClient();

    const wsRef = React.useRef<WebSocket | null>(null);
    const reconnectAttempts = React.useRef(0);
    const reconnectTimeout = React.useRef<NodeJS.Timeout | null>(null);
    const [isConnected, setIsConnected] = React.useState(false);

    const connectWebSocket = React.useCallback(() => {
        if (!storeId) return;

        const wsUrl = `${ws_endpoint}/startChat/${storeId}/`;
        wsRef.current = new WebSocket(wsUrl);

        wsRef.current.onopen = () => {
            reconnectAttempts.current = 0;
        };

        wsRef.current.onerror = (error) =>
            console.error("⚠️ WebSocket error:", error);

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
            console.log("📩 New message:", event.data);
        };
    }, [storeId, token, queryClient]);

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
    }, [storeId, connectWebSocket]);

    return { ws: wsRef, isConnected, connectWebSocket };
};

export default useStartChatWebSocket;
