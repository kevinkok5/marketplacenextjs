import { verifySession } from "@/lib/session";
import { initializeApollo } from "../../../../lib/apolloClient";
import { GET_ME } from "../queries";
import { ApolloError } from "@apollo/client";

export const getUser = async () => {
    try {
        await verifySession();
        const apolloClient = initializeApollo();

        const { data } = await apolloClient.query({
            query: GET_ME,
            fetchPolicy: "network-only", // Ensures fresh data
        });

        // if (!data || !data.me) {
        //     throw new Error("User data not found");
        // }
        console.log("me: ", data);
        return data.me;
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
