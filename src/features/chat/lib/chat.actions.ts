"use server";

import { initializeApollo } from "@/lib/apolloClient";
import { apiData } from "@/lib/utils";
import { ApolloError } from "@apollo/client";
import {
    GET_ALL_CONVERSATION_MESSAGES,
    GET_ALL_CONVERSATIONS,
    GET_HAS_CONVERSATION,
} from "../lib/queries";
import { User } from "@/features/user/lib/utils";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { HasConversation } from "./utils";

export async function getConversations(): Promise<apiData> {
    const forAId = cookies().get("forAId")?.value;
    const apolloClient = initializeApollo();

    let apiData: apiData = {
        data: [],
        errors: "null",
    };

    try {
        const { data } = await apolloClient.query({
            query: GET_ALL_CONVERSATIONS,
            variables: { forA: forAId },
        });

        // Ensure type safety when returning the data
        if (!data?.allConversations) {
            throw new Error(`Failed to fetch user conversations`);
        }

        apiData = {
            data: data.allConversations,
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
                        message: "Oops, Something went wrong",
                        error:
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
                        message: "Network Error: Could not reach the server",
                        error:
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
    return apiData;
}

export async function getConversationMessages(id: string): Promise<apiData> {
    const forAId = cookies().get("forAId")?.value;

    const apolloClient = initializeApollo();

    const variables = { conversationId: id, forA: forAId };

    let apiData: apiData = {
        data: [],
        errors: "null",
    };

    try {
        const { data } = await apolloClient.query({
            query: GET_ALL_CONVERSATION_MESSAGES,
            variables,
        });

        // Ensure type safety when returning the data
        if (!data?.messages) {
            throw new Error(`Failed to fetch product details for ID: ${id}`);
        }

        apiData = {
            data: data.messages,
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
                        message: "Oops, Something went wrong",
                        error:
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
                        message: "Network Error: Could not reach the server",
                        error:
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
    return apiData;
}
export async function getHasConversation(id: string): Promise<apiData> {
    const apolloClient = initializeApollo();

    const variables = { productId: id };

    let apiData: apiData = {
        data: [],
        errors: "null",
    };

    try {
        const { data } = await apolloClient.query({
            query: GET_HAS_CONVERSATION,
            variables,
        });

        // Ensure type safety when returning the data
        if (!data?.hasConversation) {
            throw new Error(
                `Failed to fetch if has the user has conversation with product ID: ${id}`
            );
        }

        apiData = {
            data: data.hasConversation as HasConversation,
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
                        message: "Oops, Something went wrong",
                        error:
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
                        message: "Network Error: Could not reach the server",
                        error:
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
    return apiData;
}

export async function updateForAId(newForAId: string) {
    cookies().set("forAId", newForAId); // Set the cookie
    revalidatePath("/inbox"); // Revalidate the chat page
}
