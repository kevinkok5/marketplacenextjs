import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS_QUERY = gql`
    query GetAllProducts {
        allProducts {
            edges {
                node {
                    id
                    name
                    price
                    medias(first: 2) {
                        edges {
                            node {
                                id
                                media
                            }
                        }
                    }
                }
                cursor
            }
            pageInfo {
                endCursor
                hasNextPage
                hasPreviousPage
                startCursor
            }
        }
    }
`;

export const GET_PRODUCT_DETAILS_QUERY = gql`
    query MyQuery($id: ID!) {
        product(id: $id) {
            id
            name
            price
            description
            condition
            availabilityStatus
            createdAt
            deliveryMethod
            latitude
            longitude
            status
            updatedAt
            medias(first: 10) {
                edges {
                    node {
                        id
                        media
                    }
                }
            }
            owner {
                id
                firstName
                lastName
                username
                dateJoined
            }
        }
    }
`;
