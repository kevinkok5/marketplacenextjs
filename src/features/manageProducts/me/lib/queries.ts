import { gql } from "@apollo/client";

export const GET_ALL_STORE_PRODUCTS_QUERY = gql`
    query GetAllStoreProducts {
        storeProducts {
            edges {
                node {
                    ... on ItemType {
                        id
                        name
                        availabilityStatus
                        createdAt
                        itemCondition
                        medias(first: 1) {
                            edges {
                                node {
                                    id
                                    media
                                }
                            }
                        }
                        price
                        productStatus
                        productType
                        updatedAt
                    }
                    ... on VehicleType {
                        id
                        createdAt
                        make
                        medias(first: 1) {
                            edges {
                                node {
                                    id
                                    media
                                }
                            }
                        }
                        mileage
                        model
                        price
                        productStatus
                        productType
                        updatedAt
                        vehicleCondition
                        year
                    }
                    ... on HouseType {
                        id
                        createdAt
                        description
                        medias(first: 1) {
                            edges {
                                node {
                                    id
                                    media
                                }
                            }
                        }
                        price
                        productStatus
                        productType
                        updatedAt
                    }
                }
            }
        }
    }
`;
export const GET_STORE_RECENT_PRODUCTS_QUERY = gql`
    query GetStoreRecentProductsQuery {
        storeProducts(first: 5) {
            edges {
                node {
                    ... on ItemType {
                        id
                        name
                        medias(first: 1) {
                            edges {
                                node {
                                    id
                                    media
                                }
                            }
                        }
                        productStatus
                        productType
                    }
                    ... on VehicleType {
                        id
                        make
                        model
                        productStatus
                        productType
                        medias(first: 1) {
                            edges {
                                node {
                                    id
                                    media
                                }
                            }
                        }
                    }
                    ... on HouseType {
                        id
                        description
                        medias(first: 1) {
                            edges {
                                node {
                                    id
                                    media
                                }
                            }
                        }
                        productStatus
                        productType
                    }
                }
            }
        }
    }
`;

export const GET_PRODUCT_DETAILS_QUERY = gql`
    query GetProductDetails($id: ID!) {
        product(id: $id) {
            ... on ItemType {
                id
                name
                owner {
                    firstName
                    id
                    username
                    lastName
                }
                medias(first: 20) {
                    edges {
                        node {
                            id
                            media
                        }
                    }
                }
                productType
                updatedAt
                price
                itemCondition
                latitude
                longitude
                availabilityStatus
                createdAt
                deliveryMethod
                description
                productStatus
            }
            ... on VehicleType {
                id
                createdAt
                description
                latitude
                longitude
                make
                mileage
                model
                price
                productStatus
                productType
                updatedAt
                vehicleCondition
                year
                medias(first: 20) {
                    edges {
                        node {
                            id
                            media
                        }
                    }
                }
                owner {
                    email
                    id
                    firstName
                    dateJoined
                    lastName
                    username
                }
            }
            ... on HouseType {
                id
                description
                medias(first: 20) {
                    edges {
                        node {
                            id
                            media
                        }
                    }
                }
                owner {
                    firstName
                    id
                    lastName
                    username
                }
                price
                productStatus
                productType
                updatedAt
                latitude
                longitude
                createdAt
            }
        }
    }
`;
