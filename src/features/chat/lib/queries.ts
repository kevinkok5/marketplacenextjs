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
                    updatedAt
                    messages(first: 1) {
                        edges {
                            node {
                                content
                                sender {
                                    id
                                    username
                                }
                            }
                        }
                        pageInfo {
                            endCursor
                            hasNextPage
                            hasPreviousPage
                            startCursor
                        }
                        success
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

export const GET_ALL_CONVERSATION_MESSAGES = gql`
    query GetAllConversationMessages($conversationId: ID!, $forA: ID!) {
        messages(conversationId: $conversationId, forA: $forA) {
            edges {
                cursor
                node {
                    content
                    createdAt
                    id
                    status
                    sender {
                        firstName
                        id
                        isActive
                        username
                    }
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
    }
`;
