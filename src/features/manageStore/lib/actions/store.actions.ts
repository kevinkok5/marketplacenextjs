"use server";

import { verifySession } from "@/lib/session";
import { initializeApollo } from "../../../../lib/apolloClient";
import { ApolloError } from "@apollo/client";
import {
    CREATE_STORE_MUTATION,
    GET_ALL_USER_STORE,
    JOIN_MUTATION,
} from "../queries";
import { z } from "zod";
import { createStoreSchema } from "../utils";
import { apiData } from "@/lib/utils";
import { createGraphQLClient } from "@/lib/graphqlClient";

export const join = async () => {
    try {
        await verifySession();
        const apolloClient = initializeApollo();

        const { data } = await apolloClient.mutate({
            mutation: JOIN_MUTATION,
            // fetchPolicy: "network-only", // Ensures fresh data
        });

        // if (!data || !data.me) {
        //     throw new Error("User data not found");
        // }
        return data;
    } catch (error) {
        // Step 5: Handle GraphQL and network errors
        if (error instanceof ApolloError) {
            // Handle GraphQL-specific errors
            if (error.graphQLErrors.length > 0) {
                // Django or GraphQL-specific error returned from the server
                console.error("GraphQL Errors: ", error.graphQLErrors);
                return {
                    success: false,
                    message: error.graphQLErrors[0].message || "GraphQL Error",
                };
            }
            if (error.networkError) {
                // Network-related error (e.g., unable to reach the server)
                console.error("Network Error: ", error.networkError);
                return {
                    success: false,
                    message: "Network Error: Could not reach the server",
                };
            }
        } else {
            // Step 6: Handle any other type of error (e.g., session errors, runtime errors)
            console.error("Unexpected Error: ", error);
            return {
                success: false,
                message: "An unexpected error occurred",
            };
        }
    }
};

export const createUserStore = async (
    data: z.infer<typeof createStoreSchema>
) => {
    const validatedData = createStoreSchema.safeParse(data);

    if (!validatedData.success) {
        return {
            errors: validatedData.error.flatten().fieldErrors,
        } as apiData;
    }

    let apiData: apiData = {
        data: [],
        errors: "null",
    };

    try {
        await verifySession();
        const apolloClient = initializeApollo();

        const { data } = await apolloClient.mutate({
            mutation: CREATE_STORE_MUTATION,
            variables: {
                name: validatedData.data.name,
                description: validatedData.data.description || "",
            },
        });

        // if (!data || !data?.createStore) {
        //     console.log("error creating: ");
        //     throw new Error("User data not found");
        // }
        apiData = {
            data: data,
            errors: null,
        };
    } catch (error) {
        // console.log("an error occurred: ", error);

        // Step 5: Handle GraphQL and network errors
        if (error instanceof ApolloError) {
            // Handle GraphQL-specific errors
            if (error.graphQLErrors.length > 0) {
                // Django or GraphQL-specific error returned from the server
                // console.error("GraphQL Errors: ", error.graphQLErrors);
                apiData = {
                    data: [],
                    errors: {
                        message:
                            error.graphQLErrors[0].message || "GraphQL Error",
                        success: false,
                    },
                };
            }
            if (error.networkError) {
                // Network-related error (e.g., unable to reach the server)
                // console.error("Network Error: ", error.networkError);
                apiData = {
                    data: [],
                    errors: {
                        success: false,
                        message:
                            error.networkError ||
                            "Network Error: Could not reach the server",
                    },
                };
            }
        } else {
            // Step 6: Handle any other type of error (e.g., session errors, runtime errors)
            // console.error("Unexpected Error: ", error);
            apiData = {
                data: [],
                errors: {
                    success: false,
                    message: "An unexpected error occurred",
                },
            };
        }
    }
    return JSON.parse(JSON.stringify(apiData));
};

export const getUserStore = async (
    queryParams?: Record<string, string | number>
) => {
    try {
        await verifySession();
        const apolloClient = initializeApollo();

        const { data } = await apolloClient.query({
            query: GET_ALL_USER_STORE,
            fetchPolicy: "network-only", // Ensures fresh data
            variables: { ...queryParams },
        });

        if (!data || !data.allUserStores) {
            throw new Error("User data not found");
        }
        return data;
    } catch (error) {
        // Step 5: Handle GraphQL and network errors
        if (error instanceof ApolloError) {
            // Handle GraphQL-specific errors
            if (error.graphQLErrors.length > 0) {
                // Django or GraphQL-specific error returned from the server
                console.error("GraphQL Errors: ", error.graphQLErrors);
                return {
                    success: false,
                    message: error.graphQLErrors[0].message || "GraphQL Error",
                };
            }
            if (error.networkError) {
                // Network-related error (e.g., unable to reach the server)
                console.error("Network Error: ", error.networkError);
                return {
                    success: false,
                    message: "Network Error: Could not reach the server",
                };
            }
        } else {
            // Step 6: Handle any other type of error (e.g., session errors, runtime errors)
            console.error("Unexpected Error: ", error);
            return {
                success: false,
                message: "An unexpected error occurred",
            };
        }
    }
};

export const getUserStores_reactQuery = async (
    queryParams?: Record<string, string | number>
) => {
    const graphqlClient = await createGraphQLClient(); // Wait for the client to be created with the token

    let apiData: apiData = {
        data: [],
        errors: "null",
    };
    const variables = { ...queryParams };

    try {
        await verifySession();

        const response: any = await graphqlClient.request(
            GET_ALL_USER_STORE,
            variables
        );

        if (!response || !response.allUserStores) {
            throw new Error("User data not found");
        }
        apiData = {
            data: response,
            errors: null,
        };
    } catch (error) {
        apiData = {
            data: [],
            errors: {
                message: "Oops, Something went wrong",
                error: error || "GraphQL Error",
                success: false,
            },
        };
    }
    return apiData;
};
