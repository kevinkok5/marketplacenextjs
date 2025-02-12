import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS_QUERY = gql`
    query GetAllProducts {
        allProducts(first: 20, productStatus: "published") {
            edges {
                cursor
                node {
                    ... on ItemType {
                        id
                        name
                        price
                        createdAt
                        productType
                        medias(first: 2) {
                            edges {
                                node {
                                    id
                                    media
                                }
                            }
                        }
                    }
                    ... on VehicleType {
                        id
                        make
                        model
                        year
                        price
                        createdAt
                        productType
                        medias(first: 2) {
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
                        price
                        createdAt
                        productType
                        medias(first: 2) {
                            edges {
                                node {
                                    id
                                    media
                                }
                            }
                        }
                    }
                }
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
export const GET_ALL_ITEM_CATEGORIES = gql`
    query AllItemCategories {
        allItemCategories {
            edges {
                node {
                    id
                    name
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
                store {
                    name
                    id
                    profileImage
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
                store {
                    name
                    id
                    profileImage
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
                store {
                    name
                    id
                    profileImage
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

export const CREATE_PRODUCT_MUTATION = gql`
    mutation CreateProduct(
        $productData: String!
        $productMedias: [MediaInput]
        $productStatus: String!
        $productType: String!
    ) {
        createProduct(
            productData: $productData
            productStatus: $productStatus
            productType: $productType
            productMedias: $productMedias
        ) {
            error
            product {
                ... on ItemType {
                    id
                    name
                    availabilityStatus
                }
            }
        }
    }
`;
export const EDIT_PRODUCT_MUTATION = gql`
    mutation updateProduct(
        $id: ID!
        $productData: String!
        $productMedias: [MediaInput]
        $productStatus: String!
    ) {
        updateProduct(
            id: $id
            productData: $productData
            productStatus: $productStatus
            productMedias: $productMedias
        ) {
            error
            product {
                ... on ItemType {
                    id
                    name
                    availabilityStatus
                }
            }
        }
    }
`;
export const DELETE_PRODUCT_MUTATION = gql`
    mutation DeleteProduct($id: ID!) {
        deleteProduct(id: $id) {
            success
        }
    }
`;

export const ME_EDIT_PRODUCT_QUERY = gql`
    query MeEditProduct($id: ID!) {
        userProduct(id: $id) {
            ... on ItemType {
                id
                name
                availabilityStatus
                category {
                    id
                    name
                }
                deliveryMethod
                description
                itemCondition
                latitude
                longitude
                price
                productStatus
                productType
                tags {
                    edges {
                        node {
                            id
                            name
                        }
                    }
                }
                medias {
                    edges {
                        node {
                            id
                            media
                        }
                    }
                }
            }
            ... on VehicleType {
                id
                description
                category {
                    id
                    name
                }
                latitude
                longitude
                make
                medias {
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
                year
                vehicleCondition
                tags {
                    edges {
                        node {
                            id
                            name
                        }
                    }
                }
            }
        }
    }
`;
