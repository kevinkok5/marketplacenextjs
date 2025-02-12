import { GraphQLClient } from "graphql-request";
import { getAccessToken, getStoreSession } from "./manageToken";

const endpoint = "http://127.0.0.1:8000/api/graphql/";
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
