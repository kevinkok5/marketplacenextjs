import { ApolloClient, InMemoryCache, ApolloLink, split } from "@apollo/client";
import { useMemo } from "react";
import { setContext } from "@apollo/client/link/context";
import { RetryLink } from "@apollo/client/link/retry";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { getAccessToken, getStoreSession } from "./manageToken";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

let apolloClient: ApolloClient<any> | null = null;

const createApolloClient = () => {
    // Create the upload link (for queries and mutations, including file uploads)
    const uploadLink = createUploadLink({
        uri: process.env.NEXT_PUBLIC_API_BASE_GRAPHQL_URL, // GraphQL HTTP endpoint
    });

    // Auth link to add authorization and additional headers
    const authLink = setContext(async (_, { headers }) => {
        const token = await getAccessToken();
        const storeId = await getStoreSession();
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
                "x-store-id": storeId || "",
            },
        };
    });

    // Retry link to automatically retry failed requests
    const retryLink = new RetryLink({
        delay: {
            initial: 300,
            max: Infinity,
            jitter: true,
        },
        attempts: {
            max: 5,
            retryIf: (error) => !!error,
        },
    });

    // Compose the HTTP link chain: auth -> retry -> upload
    const httpLink = ApolloLink.from([authLink, retryLink, uploadLink]);

    // Create a WebSocket link for handling subscriptions

    const wsLink = new GraphQLWsLink(
        createClient({
            url:
                process.env.NEXT_PUBLIC_GRAPHQL_WS_URL ||
                "wss://default-ws-url.com",
        })
    );

    // Split based on operation type: route subscriptions to wsLink and others to httpLink
    const splitLink = split(
        ({ query }) => {
            const definition = getMainDefinition(query);
            return (
                definition.kind === "OperationDefinition" &&
                definition.operation === "subscription"
            );
        },
        wsLink,
        httpLink
    );

    return new ApolloClient({
        ssrMode: typeof window === "undefined",
        link: splitLink,
        cache: new InMemoryCache(),
    });
};

export const initializeApollo = (initialState: any = null) => {
    const _apolloClient = apolloClient ?? createApolloClient();

    if (initialState) {
        _apolloClient.cache.restore(initialState);
    }

    // For SSG and SSR always create a new Apollo Client
    if (typeof window === "undefined") return _apolloClient;
    if (!apolloClient) apolloClient = _apolloClient;
    return _apolloClient;
};

export const useApollo = (initialState: any) => {
    return useMemo(() => initializeApollo(initialState), [initialState]);
};

// import { ApolloClient, InMemoryCache, ApolloLink } from "@apollo/client";
// import { useMemo } from "react";
// import { setContext } from "@apollo/client/link/context";
// import { RetryLink } from "@apollo/client/link/retry";
// import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
// import { getAccessToken, getStoreSession } from "./manageToken";

// let apolloClient: ApolloClient<any> | null = null;

// const createApolloClient = () => {
//     const uploadLink = createUploadLink({
//         uri: process.env.NEXT_PUBLIC_API_BASE_GRAPHQL_URL, // ✅ Utiliser `createUploadLink` au lieu de `HttpLink`
//     });

//     // 🔥 Authentification
//     const authLink = setContext(async (_, { headers }) => {
//         const token = await getAccessToken();
//         const storeId = await getStoreSession();

//         return {
//             headers: {
//                 ...headers,
//                 authorization: token ? `Bearer ${token}` : "",
//                 "x-store-id": storeId || "",
//             },
//         };
//     });

//     // 🔥 Retry Link
//     const retryLink = new RetryLink({
//         delay: {
//             initial: 300,
//             max: Infinity,
//             jitter: true,
//         },
//         attempts: {
//             max: 5,
//             retryIf: (error) => !!error,
//         },
//     });

//     // ✅ Construire le lien Apollo correctement
//     const link = ApolloLink.from([authLink, retryLink, uploadLink]); // ❌ Ne pas mélanger `HttpLink` et `createUploadLink`

//     return new ApolloClient({
//         ssrMode: typeof window === "undefined",
//         link,
//         cache: new InMemoryCache(),
//     });
// };

// // 🔥 Initialisation d'Apollo
// export const initializeApollo = (initialState = null) => {
//     const _apolloClient = apolloClient ?? createApolloClient();

//     if (initialState) {
//         _apolloClient.cache.restore(initialState);
//     }

//     if (typeof window === "undefined") return _apolloClient;

//     if (!apolloClient) apolloClient = _apolloClient;

//     return _apolloClient;
// };

// // 🔥 Hook pour utiliser Apollo dans les composants
// export const useApollo = (initialState: any) => {
//     return useMemo(() => initializeApollo(initialState), [initialState]);
// };
