import { createGraphQLClient } from "@/lib/graphqlClient";
import { AllStoreProductsData, SingleProductData } from "../../../lib/utils";
import { GET_STORE_RECENT_PRODUCTS_QUERY } from "../queries";

type PartialProductsNode = Partial<AllStoreProductsData>;
// type PartialProductNode = Partial<SingleProductData>;

export const fetchAllUserRecentProducts = async () => {
    const graphqlClient = await createGraphQLClient(); // Wait for the client to be created with the token
    try {
        const response: PartialProductsNode = await graphqlClient.request(
            GET_STORE_RECENT_PRODUCTS_QUERY
        );
        // Log the response to debug
        console.log("Fetched products response:", response);
        // Ensure type safety when returning the data
        if (!response?.storeProducts) {
            throw new Error("Failed to fetch products: Response is empty.");
        }
        return response.storeProducts;
    } catch (error) {
        // console.error("Error fetching all products:", error);
        throw error;
    }
};
