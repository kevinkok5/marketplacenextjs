import { gql } from "@apollo/client";

export const JOIN_MUTATION = gql`
    mutation Join {
        becomeShopOwner {
            success
        }
    }
`;

export const CREATE_STORE_MUTATION = gql`
    mutation CreateStore($name: String!, $description: String) {
        createStore(name: $name, description: $description) {
            store {
                id
                name
                permissions
            }
        }
    }
`;

export const GET_ALL_USER_STORE = gql`
    query getAllUsersStore($first: Int) {
        allUserStores(first: $first) {
            edges {
                node {
                    id
                    name
                    profileImage
                }
            }
            success
        }
    }
`;
