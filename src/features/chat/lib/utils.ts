import { Store } from "@/features/manageProducts/lib/utils";
import { User } from "@/features/user/lib/utils";

export interface PageInfo {
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
}

// export interface User {
//     id: string;
//     username: string;
//     firstName: string;
//     lastName: string;
//     dateJoined: string;
//     email: string;
//     isActive: boolean;
//     isShopOwner: boolean;
//     isStaff: boolean;
//     isSuperuser: boolean;
//     lastLogin: string;
// }

export type HasConversation = {
    exists: boolean;
    conversationId: string;
};

export interface Message {
    id: string;
    content: string;
    createdAt: string;
    status: string;
    sender: User;
}

export interface Edge<T> {
    node: T;
    cursor: string;
}

export interface Connection<T> {
    edges: Edge<T>[];
    pageInfo: PageInfo;
}

export interface Conversation {
    id: string;
    client: User;
    store: Store;
    updatedAt: string;
    messages: Connection<Message> & { success: boolean };
    unreadCount: number;
}

export interface AllConversations {
    edges: Edge<Conversation>[];
}

export interface MessagesData {
    edges: Edge<Message>[];
    success: boolean;
    pageInfo: PageInfo;
}

export interface Data {
    allConversations: AllConversations;
    totalUnread: number;
    messages: MessagesData;
}

export interface Response {
    data: Data;
}
