import { GraphQLClient } from "graphql-request";
import { getAccessToken } from "./manageToken";

const endpoint = "http://127.0.0.1:8000/api/graphql/";
export const createGraphQLClient = async () => {
    const token = await getAccessToken();
    return new GraphQLClient(endpoint, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
