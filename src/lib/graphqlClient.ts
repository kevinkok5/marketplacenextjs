import { GraphQLClient } from "graphql-request";
import { getAccessToken, getStoreSession } from "./manageToken";

const endpoint = process.env.NEXT_PUBLIC_API_BASE_GRAPHQL_URL || "";
export const createGraphQLClient = async () => {
    const token = await getAccessToken();
    const storeId = await getStoreSession();
    // console.log("StoreId: ", storeId);

    return new GraphQLClient(endpoint, {
        headers: {
            Authorization: `Bearer ${token}`,
            "x-store-id": storeId || "",
        },
    });
};
