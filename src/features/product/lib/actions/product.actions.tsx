import { GET_ALL_PRODUCTS_QUERY, GET_PRODUCT_DETAILS_QUERY } from "../queries";
import { createGraphQLClient } from "@/lib/graphqlClient";
import { AllProductsData, SingleProductData } from "../utils";

type PartialProductsNode = Partial<AllProductsData>;
type PartialProductNode = Partial<SingleProductData>;

export const fetchAllProducts = async () => {
    const graphqlClient = await createGraphQLClient(); // Wait for the client to be created with the token

    try {
        const response: PartialProductsNode = await graphqlClient.request(
            GET_ALL_PRODUCTS_QUERY
        );
        return response?.allProducts;
    } catch (error) {
        // Handle errors (e.g., unauthorized access, network issues, etc.)
        console.error("Error fetching user data:", error);
        throw error;
    } // Returning plain object here
};

export const fetchProductDetails = async (id: string) => {
    const graphqlClient = await createGraphQLClient();

    const variables = { id: id };

    try {
        const response: PartialProductNode = await graphqlClient.request(
            GET_PRODUCT_DETAILS_QUERY,
            variables
        );

        return response?.product;
    } catch (error) {
        // Handle errors (e.g., unauthorized access, network issues, etc.)
        console.error("Error fetching user data:", error);
        throw error;
    }
};
