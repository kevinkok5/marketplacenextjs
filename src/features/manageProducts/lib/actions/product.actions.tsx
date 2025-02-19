import {
    CREATE_PRODUCT_MUTATION,
    DELETE_PRODUCT_MUTATION,
    EDIT_PRODUCT_MUTATION,
    GET_ALL_ITEM_CATEGORIES,
    GET_ALL_PRODUCTS_QUERY,
    GET_PRODUCT_DETAILS_QUERY,
    ME_EDIT_PRODUCT_QUERY,
} from "../queries";
import { createGraphQLClient } from "@/lib/graphqlClient";
import {
    AllProductsData,
    createFormSchema,
    CreateFormSchemaProps,
    ProductCategoryType,
    ProductStatus,
    ProductType,
    SingleProductData,
    SingleUserProductData,
    Tag,
} from "../utils";
import { file } from "../../create/components/UploadImage";
import { z } from "zod";
import { apiData } from "@/lib/utils";
import { verifySession } from "@/lib/session";
import { initializeApollo } from "@/lib/apolloClient";
import { ApolloError } from "@apollo/client";

type PartialProductsNode = Partial<AllProductsData>;
type PartialProductNode = Partial<SingleProductData>;
type PartialUserProductNode = Partial<SingleUserProductData>;
// type PartialProductCategory = Partial<ProductCategoryType>;
// type createStoreProductProps = {
//     product_status: ProductStatus;
//     product_type: ProductType;
//     medias: file;
// };

export const fetchAllProducts = async () => {
    const graphqlClient = await createGraphQLClient(); // Wait for the client to be created with the token
    try {
        const response: PartialProductsNode = await graphqlClient.request(
            GET_ALL_PRODUCTS_QUERY
        );
        // Log the response to debug
        // Ensure type safety when returning the data
        if (!response?.allProducts) {
            throw new Error("Failed to fetch products: Response is empty.");
        }
        return response.allProducts;
    } catch (error) {
        throw error;
    }
};

export const fetchProductDetails = async (id: string) => {
    const graphqlClient = await createGraphQLClient();

    const variables = { id };

    try {
        const response: PartialProductNode = await graphqlClient.request(
            GET_PRODUCT_DETAILS_QUERY,
            variables
        );

        // Log the response to debug

        // Ensure type safety when returning the data
        if (!response?.product) {
            throw new Error(`Failed to fetch product details for ID: ${id}`);
        }

        return response.product;
    } catch (error) {
        throw error;
    }
};

// CreateFormSchemaProps
export class StoreProduct {
    type?: ProductType;
    status?: ProductStatus;
    formSchema?: any;

    constructor({
        status = ProductStatus.Published,
        type = ProductType.Item,
    }: Partial<CreateFormSchemaProps>) {
        this.type = type;
        this.status = status;
        this.formSchema = createFormSchema({
            type: this.type,
            status: this.status,
        });

        this.init();
    }
    init() {}

    createStoreProduct = async (
        medias: file[],
        data: z.infer<typeof this.formSchema>,
        tags: Tag[]
    ) => {
        const validatedData = this.formSchema.safeParse(data);

        if (!validatedData.success) {
            return {
                errors: validatedData.error.flatten().fieldErrors,
            } as apiData;
        }

        const userData = {
            name: validatedData.data.name || "",
            description: validatedData.data.description || "",
            price: validatedData.data.price || "",
            condition: validatedData.data.condition?.toLowerCase() || "",
            tags: tags || [],
            category_id: validatedData.data.category
                ? { id: validatedData.data.category }
                : null,
        };

        let apiData: apiData = {
            data: [],
            errors: "null",
        };

        try {
            await verifySession();
            const apolloClient = initializeApollo();

            const { data } = await apolloClient.mutate({
                mutation: CREATE_PRODUCT_MUTATION,
                variables: {
                    productData: JSON.stringify(userData),
                    productMedias: medias.map((media) => {
                        if (media.id) {
                            return { id: media.id };
                        }
                        return media;
                    }),
                    productStatus: this.status?.toLowerCase() || "",
                    productType: this.type?.toLowerCase() || "",
                },
            });

            // if (!data || !data?.createStore) {
            //     console.log("error creating: ");
            //     throw new Error("User data not found");
            // }
            apiData = {
                data: data,
                errors: null,
            };
        } catch (error) {
            // console.log("an error occurred: ", error);

            // Step 5: Handle GraphQL and network errors
            if (error instanceof ApolloError) {
                // Handle GraphQL-specific errors
                if (error.graphQLErrors.length > 0) {
                    // Django or GraphQL-specific error returned from the server
                    // console.error("GraphQL Errors: ", error.graphQLErrors);
                    apiData = {
                        data: [],
                        errors: {
                            message: "Oops, Something went wrong",
                            error:
                                error.graphQLErrors[0].message ||
                                "GraphQL Error",
                            success: false,
                        },
                    };
                }
                if (error.networkError) {
                    // Network-related error (e.g., unable to reach the server)
                    // console.error("Network Error: ", error.networkError);
                    apiData = {
                        data: [],
                        errors: {
                            success: false,
                            message:
                                "Network Error: Could not reach the server",
                            error:
                                error.networkError ||
                                "Network Error: Could not reach the server",
                        },
                    };
                }
            } else {
                // Step 6: Handle any other type of error (e.g., session errors, runtime errors)
                // console.error("Unexpected Error: ", error);
                apiData = {
                    data: [],
                    errors: {
                        success: false,
                        message: "An unexpected error occurred",
                    },
                };
            }
        }
        return JSON.parse(JSON.stringify(apiData));
    };
    updateStoreProduct = async (
        productId: string,
        medias: file[],
        data: z.infer<typeof this.formSchema>,
        tags: Tag[]
    ) => {
        const validatedData = this.formSchema.safeParse(data);

        if (!validatedData.success) {
            return {
                errors: validatedData.error.flatten().fieldErrors,
            } as apiData;
        }

        const userData = {
            name: validatedData.data.name || "",
            description: validatedData.data.description || "",
            price: validatedData.data.price || "",
            condition: validatedData.data.condition?.toLowerCase() || "",
            tags: tags || [],
            category_id: validatedData.data.category
                ? { id: validatedData.data.category }
                : null,
        };

        let apiData: apiData = {
            data: [],
            errors: "null",
        };

        try {
            if (!productId) {
                throw new Error("Product ID is required");
            }
            await verifySession();
            const apolloClient = initializeApollo();

            const { data } = await apolloClient.mutate({
                mutation: EDIT_PRODUCT_MUTATION,
                variables: {
                    productData: JSON.stringify(userData),
                    productMedias: medias.map((media) => {
                        if (media.id) {
                            return { id: media.id };
                        }
                        return media;
                    }),
                    productStatus: this.status?.toLowerCase() || "",
                    id: productId,
                    // productType: this.type?.toLowerCase() || "",
                },
            });

            // if (!data || !data?.createStore) {
            //     console.log("error creating: ");
            //     throw new Error("User data not found");
            // }
            apiData = {
                data: data,
                errors: null,
            };
        } catch (error) {
            // console.log("an error occurred: ", error);

            // Step 5: Handle GraphQL and network errors
            if (error instanceof ApolloError) {
                // Handle GraphQL-specific errors
                if (error.graphQLErrors.length > 0) {
                    // Django or GraphQL-specific error returned from the server
                    // console.error("GraphQL Errors: ", error.graphQLErrors);
                    apiData = {
                        data: [],
                        errors: {
                            message: "Oops, Something went wrong",
                            error:
                                error.graphQLErrors[0].message ||
                                "GraphQL Error",
                            success: false,
                        },
                    };
                }
                if (error.networkError) {
                    // Network-related error (e.g., unable to reach the server)
                    // console.error("Network Error: ", error.networkError);
                    apiData = {
                        data: [],
                        errors: {
                            success: false,
                            message:
                                "Network Error: Could not reach the server",
                            error:
                                error.networkError ||
                                "Network Error: Could not reach the server",
                        },
                    };
                }
            } else {
                // Step 6: Handle any other type of error (e.g., session errors, runtime errors)
                // console.error("Unexpected Error: ", error);
                apiData = {
                    data: [],
                    errors: {
                        success: false,
                        message: "An unexpected error occurred",
                    },
                };
            }
        }
        return JSON.parse(JSON.stringify(apiData));
    };
}

export const deleteStoreProduct = async (productId: string) => {
    let apiData: apiData = {
        data: [],
        errors: "null",
    };

    try {
        if (!productId) {
            throw new Error("Product ID is required");
        }
        await verifySession();
        const apolloClient = initializeApollo();

        const { data } = await apolloClient.mutate({
            mutation: DELETE_PRODUCT_MUTATION,
            variables: {
                id: productId,
                // productType: this.type?.toLowerCase() || "",
            },
        });

        // if (!data || !data?.createStore) {
        //     console.log("error creating: ");
        //     throw new Error("User data not found");
        // }
        apiData = {
            data: data,
            errors: null,
        };
    } catch (error) {
        // console.log("an error occurred: ", error);

        // Step 5: Handle GraphQL and network errors
        if (error instanceof ApolloError) {
            // Handle GraphQL-specific errors
            if (error.graphQLErrors.length > 0) {
                // Django or GraphQL-specific error returned from the server
                // console.error("GraphQL Errors: ", error.graphQLErrors);
                apiData = {
                    data: [],
                    errors: {
                        message: "Oops, Something went wrong",
                        error:
                            error.graphQLErrors[0].message || "GraphQL Error",
                        success: false,
                    },
                };
            }
            if (error.networkError) {
                // Network-related error (e.g., unable to reach the server)
                // console.error("Network Error: ", error.networkError);
                apiData = {
                    data: [],
                    errors: {
                        success: false,
                        message: "Network Error: Could not reach the server",
                        error:
                            error.networkError ||
                            "Network Error: Could not reach the server",
                    },
                };
            }
        } else {
            // Step 6: Handle any other type of error (e.g., session errors, runtime errors)
            // console.error("Unexpected Error: ", error);
            apiData = {
                data: [],
                errors: {
                    success: false,
                    message: "An unexpected error occurred",
                },
            };
        }
    }
    return JSON.parse(JSON.stringify(apiData));
};

export const fetchProductEdit = async (id: string) => {
    const graphqlClient = await createGraphQLClient();

    const variables = { id };

    let apiData: apiData = {
        data: [],
        errors: "null",
    };

    try {
        const response: PartialUserProductNode = await graphqlClient.request(
            ME_EDIT_PRODUCT_QUERY,
            variables
        );

        // Log the response to debug

        // Ensure type safety when returning the data
        if (!response?.userProduct) {
            throw new Error(`Failed to fetch product details for ID: ${id}`);
        }
        apiData = {
            data: response.userProduct,
            errors: null,
        };

        return JSON.parse(JSON.stringify(apiData));
    } catch (error) {
        apiData = {
            data: [],
            errors: {
                success: false,
                message: "An unexpected error occurred",
            },
        };
        return JSON.parse(JSON.stringify(apiData));
    }
};

export const fetchAllItemCategories = async () => {
    const graphqlClient = await createGraphQLClient();
    let apiData: apiData = {
        data: [],
        errors: "null",
    };
    try {
        const response: { allItemCategories: ProductCategoryType } =
            await graphqlClient.request(GET_ALL_ITEM_CATEGORIES);

        // Ensure type safety when returning the data
        if (!response?.allItemCategories) {
            throw new Error(`Failed to fetch item category`);
        }

        apiData = {
            data: response.allItemCategories,
            errors: null,
        };

        return JSON.parse(JSON.stringify(apiData));
    } catch (error) {
        console.error("Error fetching product details:", error);
        apiData = {
            data: [],
            errors: {
                success: false,
                message: "An unexpected error occurred",
            },
        };
        return JSON.parse(JSON.stringify(apiData));
    }
};

// export const fetchAllHouseCategories = async (
//     id: string
// ): Promise<ItemProduct | VehicleProduct | HouseProduct> => {
//     const graphqlClient = await createGraphQLClient();

//     const variables = { id };

//     try {
//         const response: PartialUserProductNode = await graphqlClient.request(
//             ME_EDIT_PRODUCT_QUERY,
//             variables
//         );

//         // Log the response to debug
//         console.log("Fetched product details response:", response);

//         // Ensure type safety when returning the data
//         if (!response?.userProduct) {
//             throw new Error(`Failed to fetch product details for ID: ${id}`);
//         }

//         return response.userProduct;
//     } catch (error) {
//         console.error("Error fetching product details:", error);
//         return [];
//     }
// };
