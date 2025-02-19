import { AllProducts } from "@/features/manageProducts/lib/utils";
import { User } from "@/features/user/lib/utils";
import { z } from "zod";

export type Owner = User;

export type StoreNode = {
    id: string;
    name: string;
    profileImage: string;
    owner: Owner;
    products: AllProducts;
    permissions: string;
    storeStatus: "ACTIVE" | "PAUSED" | "PENDING";
    updatedAt?: string;
    createdAt?: string;
    description?: string;
};

export type StoreEdge = {
    cursor?: string;
    node: StoreNode | undefined;
};

export type PageInfo = {
    endCursor: string | null;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string | null;
};

export type allStores = {
    edges: StoreEdge[];
    pageInfo: PageInfo;
    success: boolean;
};

export interface StorePayload {
    id: string;
    name: string;
}

export const createStoreSchema = z.object({
    // sing up
    name: z.string().min(3).max(80),
    description: z.string().max(500).optional(),
});
