import { GET_PRODUCT_DETAILS_QUERY } from "@/features/manageProducts/lib/queries";
import { apiData } from "@/lib/utils";
import { initializeApollo } from "@/lib/apolloClient";
import { ApolloError } from "@apollo/client";

// type PartialProductCategory = Partial<ProductCategoryType>;
// type createStoreProductProps = {
//     product_status: ProductStatus;
//     product_type: ProductType;
//     medias: file;
// };

export async function getProductDetails(id: string): Promise<apiData> {
    const apolloClient = initializeApollo();

    const variables = { id: id };

    let apiData: apiData = {
        data: [],
        errors: "null",
    };

    try {
        const { data } = await apolloClient.query({
            query: GET_PRODUCT_DETAILS_QUERY,
            variables,
        });

        // Ensure type safety when returning the data
        if (!data?.product) {
            throw new Error(`Failed to fetch product details for ID: ${id}`);
        }

        apiData = {
            data: data.product,
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
