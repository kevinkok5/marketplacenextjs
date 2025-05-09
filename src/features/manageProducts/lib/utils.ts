import { StoreNode } from "@/features/manageStore/lib/utils";
import { User } from "@/features/user/lib/utils";
import { DeepPartial } from "@/lib/utils";
import { z } from "zod";

export const productConditionObj = {
    NEW: "New",
    USED_LIKE_NEW: "Used (like new)",
    USED_GOOD: "Used (good)",
    USED: "Used",
};

export const productAvailabilityStatusObj = {
    single_item: "List as Single Item",
    in_stock: "List as In Stock",
};

// export enum ProductAvailabilityStatusType {
//     singleItem = "single_item",
//     inStock = "in_stock",
// }

// Enums for product condition, availability, type, and status
export enum ProductConditionType {
    New = "NEW",
    UsedLikeNew = "USED_LIKE_NEW",
    UsedGood = "USED_GOOD",
    Used = "USED",
}

export enum ProductAvailabilityStatusType {
    SingleItem = "SINGLE_ITEM",
    InStock = "IN_STOCK",
}

export enum ProductType {
    Item = "ITEM",
    Vehicle = "VEHICLE",
    House = "HOUSE",
}

export enum ProductStatus {
    Draft = "DRAFT",
    Published = "PUBLISHED",
}

export type Tag = {
    id?: string;
    name: string;
};

export type TagEdge = {
    cursor?: string;
    node: Tag | undefined;
};

export type TagType = {
    edges: TagEdge[];
    pageInfo?: PageInfo;
};

// Shared types
export type ProductCategory = {
    id: string;
    name: string;
};

export type ProductCategoryEdge = {
    cursor?: string;
    node: ProductCategory | undefined;
};

export type ProductCategoryType = {
    edges: TagEdge[];
    pageInfo?: PageInfo;
};

export type MediaNode = {
    id: string;
    media: string;
    createdAt?: string;
    updatedAt?: string;
};

export type MediaEdge = {
    cursor?: string;
    node: MediaNode | undefined;
};

export type MeidaType = {
    edges: MediaEdge[];
    pageInfo?: PageInfo;
};

export type Store = StoreNode;

export type PageInfo = {
    endCursor: string | null;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string | null;
};

// Base Product type
export interface BaseProduct {
    id: string;
    category: ProductCategory;
    createdAt: string;
    updatedAt: string;
    description: string;
    latitude: string | null;
    longitude: string | null;
    price: string | null;
    productType: "ITEM" | "VEHICLE" | "HOUSE";
    productStatus: "PUBLISHED" | "DRAFT";
    medias: {
        edges: MediaEdge[];
        pageInfo?: PageInfo;
    };
    store: Store;
    tags: TagType | null;
}

// Specific product types
export interface ItemProduct extends BaseProduct {
    name: string;
    availabilityStatus: "IN_STOCK" | "SINGLE_ITEM";
    deliveryMethod: string | null;
    condition: ProductConditionType | null;
}

export interface VehicleProduct extends BaseProduct {
    make: string;
    model: string;
    year: number;
    mileage: number;
    condition: ProductConditionType | null;
    vehicleCondition: string | null;
}

export interface HouseProduct extends BaseProduct {}

// Product Edge and Query Types
export type ProductEdge = {
    cursor: string;
    node: ItemProduct | VehicleProduct | HouseProduct;
};
export type ItemEdge = {
    cursor: string;
    node: ItemProduct;
};
export type VehicleEdge = {
    cursor: string;
    node: VehicleProduct;
};
export type HouseEdge = {
    cursor: string;
    node: HouseProduct;
};

export type AllProducts = {
    edges: ProductEdge[];
    pageInfo: PageInfo;
};
export type AllStoreProducts = {
    edges: ProductEdge[];
    pageInfo: PageInfo;
};

export type AllItemProducts = {
    edges: ItemEdge[];
    pageInfo?: PageInfo;
};
export type AllVehicleProducts = {
    edges: VehicleEdge[];
    pageInfo?: PageInfo;
};
export type AllHouseProducts = {
    edges: HouseEdge[];
    pageInfo?: PageInfo;
};

export type AllProductsData = {
    allProducts: AllProducts;
};
export type AllStoreProductsData = {
    storeProducts: AllStoreProducts;
};

export type SingleProductData = {
    product: ItemProduct | VehicleProduct | HouseProduct;
};
export type SingleUserProductData = {
    userProduct: ItemProduct | VehicleProduct | HouseProduct;
};

// Full Query Response
export type FullResponseType = {
    allProducts: AllProducts;
    user: User | null;
    houseCategory: ProductCategory | null;
    itemCategory: ProductCategory | null;
    allVehicleCategories: {
        edges: {
            cursor: string;
            node: ProductCategory;
        }[];
        pageInfo: PageInfo;
    };
    allUsers: {
        edges: {
            cursor: string;
            node: User;
        }[];
        pageInfo: PageInfo;
    };
    vehicleCategory: ProductCategory | null;
    me: User | null;
    product: ItemProduct | VehicleProduct | HouseProduct | null;
};

// Validation Schema for Forms
export type CreateFormSchemaProps = {
    type: ProductType;
    status: ProductStatus;
};

export type DeepPartialItemProduct = DeepPartial<ItemEdge>;
export type DeepPartialVehicleProduct = DeepPartial<VehicleEdge>;
export type DeepPatialHouseProduct = DeepPartial<HouseEdge>;

export const createFormSchema = ({ type, status }: CreateFormSchemaProps) => {
    return z.object({
        name:
            status === ProductStatus.Draft
                ? z.string().max(80).default("UNTITLED").optional()
                : z.string().min(3).max(80),
        price:
            status === ProductStatus.Draft
                ? z.string().max(9).optional()
                : z.string().min(1).max(9),
        tag:
            status === ProductStatus.Draft
                ? z.string().max(7).optional()
                : z.string().max(7),
        description:
            status === ProductStatus.Draft
                ? z.string().max(500).optional()
                : z.string().max(500),
        condition:
            status === ProductStatus.Draft
                ? z.nativeEnum(ProductConditionType).optional()
                : z.nativeEnum(ProductConditionType),
        category:
            status === ProductStatus.Draft
                ? z.string().max(100).optional()
                : z.string().max(100),
    });

    // address1:
    //     type === AuthType.SignIn ? z.string().optional() : z.string().max(50),
    // city: type === AuthType.SignIn ? z.string().optional() : z.string().max(50),
    // state:
    //     type === AuthType.SignIn
    //         ? z.string().optional()
    //         : z.string().min(2).max(2),
    // postalCode:
    //     type === AuthType.SignIn
    //         ? z.string().optional()
    //         : z.string().min(3).max(6),
    // dateOfBirth:
    //     type === AuthType.SignIn
    //         ? z.string().optional()
    //         : z.string().refine((value) => dayjs(value).isValid(), {
    //               message: "please enter a valid date of birth",
    //           }),
    // ssn: type === AuthType.SignIn ? z.string().optional() : z.string().min(3),
    // both sign up and sign up
};

// type Payment = {
//     id: string;
//     amount: number;
//     status: "pending" | "processing" | "success" | "failed";
//     email: string;
// };

// export const payments: Payment[] = [
//     {
//         id: "728ed52f",
//         amount: 100,
//         status: "pending",
//         email: "m@example.com",
//     },
//     {
//         id: "489e1d42",
//         amount: 125,
//         status: "processing",
//         email: "example@gmail.com",
//     },
//     // ...
// ];

export const isItemProduct = (data: {
    productType: string;
}): data is ItemProduct => {
    return data?.productType?.toUpperCase() === "ITEM";
};
export const isVehicleProduct = (data: {
    productType: string;
}): data is VehicleProduct => {
    return data?.productType?.toUpperCase() === "VEHICLE";
};
export const isHouseProduct = (data: {
    productType: string;
}): data is HouseProduct => {
    return data?.productType?.toUpperCase() === "HOUSE";
};
