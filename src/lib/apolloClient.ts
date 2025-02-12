// lib/apolloClient.ts
import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
    NormalizedCacheObject,
    ApolloLink,
} from "@apollo/client";
import { useMemo } from "react";
import { setContext } from "@apollo/client/link/context";
import { RetryLink } from "@apollo/client/link/retry";
import { getAccessToken, getStoreSession } from "./manageToken";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

const createApolloClient = () => {
    const httpLink = new HttpLink({
        uri: process.env.NEXT_PUBLIC_API_BASE_GRAPHQL_URL, // Your GraphQL endpoint
    });
    const uploadLink = createUploadLink({
        uri: process.env.NEXT_PUBLIC_API_BASE_GRAPHQL_URL, // Your GraphQL endpoint
    });

    // Optionally, add an authorization token to the headers
    const authLink = setContext(async (_, { headers }) => {
        const token = await getAccessToken();
        const storeId = await getStoreSession();
        // console.log("StoreId: ", storeId);

        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
                "x-store-id": storeId || "",
            },
        };
    });

    // // Retry Link
    const retryLink = new RetryLink({
        delay: {
            initial: 300,
            max: Infinity,
            jitter: true,
        },
        attempts: {
            max: 5,
            retryIf: (error, _operation) => !!error,
        },
    });

    const link = ApolloLink.from([authLink, retryLink, uploadLink, httpLink]);
    // const link = ApolloLink.from([authLink, retryLink, httpLink]);

    return new ApolloClient({
        ssrMode: typeof window === "undefined", // Set to true for SSR
        link, // Combine auth link with HTTP link
        cache: new InMemoryCache(),
    });
};

// Initialize Apollo Client
export const initializeApollo = (
    initialState: NormalizedCacheObject | null = null
) => {
    const _apolloClient = apolloClient ?? createApolloClient();

    // Hydrate initial state if present
    if (initialState) {
        _apolloClient.cache.restore(initialState);
    }

    // For SSR, always create a new Apollo Client
    if (typeof window === "undefined") return _apolloClient;

    // For the client-side, reuse the Apollo Client
    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient;
};

// Hook to use Apollo client in components
export const useApollo = (initialState: NormalizedCacheObject | null) => {
    return useMemo(() => initializeApollo(initialState), [initialState]);
};
