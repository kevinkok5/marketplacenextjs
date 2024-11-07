import { User } from "@/features/user/lib/utils";
import { CustomError } from "@/lib/utils";
import { z } from "zod";

export type MediaNode = {
    id: string;
    media: string;
    createdAt: string;
    updatedAt: string;
};

export type MediaEdge = {
    node: MediaNode;
};

export type ProductNode = {
    id: string;
    name: string;
    price: number | null;
    description: string;
    availabilityStatus: string | null;
    condition: string | null;
    status: string;
    deliveryMethod: string | null;
    latitude: string | null;
    longitude: string | null;
    updatedAt: string;
    createdAt: string;
    owner: User;
    medias: {
        edges: MediaEdge[];
    };
};

export type ProductEdge = {
    node: ProductNode;
    cursor: string;
};

export type AllProducts = {
    edges: ProductEdge[];
    pageInfo: {
        endCursor: string;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor: string;
    };
};

export type AllProductsData = {
    allProducts: AllProducts;
};

export type FullResponseType = {
    data: AllProductsData;
};

export type SingleProductData = {
    product: ProductNode;
};

export enum ProductType {
    Item = "item",
    Vehicul = "vehicul",
    Rental = "Rental",
}

export enum ProductStatus {
    Draft = "draft",
    Published = "published",
}

export type CreateFormSchemaProps = {
    type: ProductType;
    status: ProductStatus;
};
export const createFormSchema = ({
    type,
    status,
}: CreateFormSchemaProps): z.ZodObject<{
    name: z.ZodString | z.ZodOptional<z.ZodString>;
    price: z.ZodString | z.ZodOptional<z.ZodString>;
    // dateOfBirth:
    //     | z.ZodOptional<z.ZodString>
    //     | z.ZodEffects<z.ZodString, string, string>;
    // email: z.ZodString | z.ZodOptional<z.ZodTypeAny>;
    // username: z.ZodString;
    // password: z.ZodString;
}> => {
    return z.object({
        // sing up
        name:
            status === ProductStatus.Draft
                ? z.string().optional()
                : z.string().min(3).max(80),
        price:
            status === ProductStatus.Draft
                ? z.string().optional()
                : z.string().min(1).max(9),

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
    });
};
