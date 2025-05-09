import { gql } from "@apollo/client";

export const GET_ALL_CONVERSATIONS = gql`
    query GetAllConversations($forA: ID!) {
        allConversations(first: 25, forA: $forA) {
            edges {
                node {
                    id
                    client {
                        id
                        username
                        firstName
                    }
                    store {
                        id
                        name
                        profileImage
                    }
                    product {
                        ... on ItemType {
                            id
                            name
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
                        ... on VehicleType {
                            id
                            make
                            model
                            year
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
                    }
                    updatedAt
                    messages(first: 1) {
                        edges {
                            node {
                                content
                                id
                                senderId
                                createdAt
                                status
                            }
                        }
                    }
                }
            }
        }
    }
`;
export const GET_HAS_CONVERSATION = gql`
    query GetHasConversation($productId: ID!) {
        hasConversation(productId: $productId) {
            exists
            conversationId
        }
    }
`;

export const GET_TOTAL_UNREAD = gql`
    query GetTotalUnread($forA: ID!) {
        totalUnread(forA: $forA) {
            unreadCount
        }
    }
`;

export const GET_ALL_CONVERSATION_MESSAGES = gql`
    query GetAllConversationMessages($conversationId: ID!, $forA: ID!) {
        messages(conversationId: $conversationId, forA: $forA) {
            edges {
                cursor
                node {
                    content
                    createdAt
                    id
                    senderId
                    status
                }
            }
            success
            pageInfo {
                endCursor
                hasNextPage
                hasPreviousPage
                startCursor
            }
        }
        conversation(conversationId: $conversationId, forA: $forA) {
            id
            client {
                id
                username
                firstName
            }
            store {
                id
                name
                profileImage
            }
            product {
                ... on ItemType {
                    id
                    name
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
                ... on VehicleType {
                    id
                    make
                    model
                    year
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
            }
            updatedAt
        }
    }
`;
