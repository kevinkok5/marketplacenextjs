import React from "react";

const ws_endpoint = process.env.NEXT_PUBLIC_GRAPHQL_WS_URL || "";

type UseWebSocketHeadersProps = {
    authorisationHeader?: { token: string | null };
    onmessage?: (event: any) => void;
    onopen?: () => void;
    onclose?: () => void;
    retry?: boolean;
};

export const useWebSocket = (
    url: string,
    headers?: UseWebSocketHeadersProps
) => {
    const wsRef = React.useRef<WebSocket | null>(null);
    const reconnectAttempts = React.useRef(0);
    const reconnectTimeout = React.useRef<NodeJS.Timeout | null>(null);
    const [isConnected, setIsConnected] = React.useState(false);

    const connectWebSocket = React.useCallback(() => {
        const wsUrl = `${ws_endpoint}${url}`;
        wsRef.current = new WebSocket(wsUrl, [
            "jwt",
            (headers && headers.authorisationHeader?.token) || "",
        ]);

        wsRef.current.onopen = () => {
            reconnectAttempts.current = 0;
            headers && headers.onopen && headers.onopen();
        };

        wsRef.current.onerror = (error) =>
            console.error("⚠️ WebSocket error:", error);

        wsRef.current.onclose = () => {
            setIsConnected(false);
            if (headers && headers.retry) {
                // Exponential backoff with a max delay of 5 seconds
                const delay = Math.min(
                    5000,
                    1000 * 2 ** reconnectAttempts.current
                );
                reconnectAttempts.current += 1;

                reconnectTimeout.current = setTimeout(() => {
                    console.log(
                        `Reconnecting WebSocket (attempt #${reconnectAttempts.current})`
                    );
                    connectWebSocket();
                }, delay);
            }
            headers && headers.onclose && headers.onclose();
        };

        wsRef.current.onmessage = (event) => {
            console.log("📩 New message:", event.data);
            headers && headers.onmessage && headers.onmessage(event);
        };
    }, [headers]);

    React.useEffect(() => {
        connectWebSocket();

        console.log("not a loop");
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
    }, [url, connectWebSocket]);

    return { ws: wsRef, isConnected, connectWebSocket };
};
