"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
    createFormSchema,
    CreateFormSchemaProps,
    ItemProduct,
    ProductCategoryType,
    productConditionObj,
    ProductConditionType,
    ProductStatus,
    ProductType,
    Tag,
} from "@/features/manageProducts/lib/utils";
import { useState } from "react";
import ItemFormInput from "../components/ItemFormInput";
import { ItemFormSelect } from "../components/ItemFormSelect";
import { ItemFormTexterea } from "../components/ItemFormTextarea";
import TagsForm from "../../components/TagsForm";
import UploadImage, {
    file,
    UpoloadFilesErrors,
} from "../../components/UploadImage";
import { StoreProduct } from "@/features/manageProducts/lib/actions/product.actions";
import { useToast } from "@/hooks/use-toast";

type ItemFormEditProps = {
    productData: ItemProduct;
    categoryData: ProductCategoryType;
};

const ItemFormEdit = ({ productData, categoryData }: ItemFormEditProps) => {
    let categories = {};
    categoryData?.edges.forEach((category) => {
        if (category.node?.id) {
            categories = {
                ...categories,
                [category.node?.id]: category.node?.name,
            };
        }
    });

    const [product, setProduct] = useState<ItemProduct>(productData);
    const productType = ProductType.Item;
    const [productStatus, setProductStatus] = useState<ProductStatus>(
        ProductStatus.Published
    );

    const [createFromSchemaProps, setCreateSchemaProps] =
        useState<CreateFormSchemaProps>({
            type: productType,
            status: ProductStatus.Published,
        });

    const [files, setFiles] = useState<file[]>([]);
    const [filesErrors, setFilesErrors] = useState<UpoloadFilesErrors>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { toast } = useToast();

    let formSchema = createFormSchema(createFromSchemaProps);

    const userTags: Tag[] | undefined = product.tags?.edges
        ? product.tags?.edges.map((tag): Tag => {
              return {
                  id: tag.node?.id,
                  name: tag.node?.name,
              } as Tag;
          })
        : undefined;

    const [tags, setTags] = useState<Tag[]>(userTags || []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: product?.name || "",
            price: product?.price || "",
            description: product?.description || "",
            tag: "",
            condition: product?.condition || ProductConditionType.New,
            category: product?.category?.id || "",
        },
    });

    // Add a tag
    const addTag = (tag: string) => {
        if (tag && !tags.some((existingTag) => existingTag.name === tag)) {
            const newTags = [...tags, { name: tag }];
            setTags(newTags);
            // setValue("tags", newTags); // Sync with form state
        }
    };

    // Remove a tag
    const removeTag = (tag: string) => {
        const newTags = tags.filter((t) => t.name !== tag);
        setTags(newTags);
        // setValue("tags", newTags); // Sync with form state
    };
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);

        setFilesErrors({
            fileLength: null,
        });
        if (productStatus !== ProductStatus.Draft && files.length <= 0) {
            setFilesErrors({
                fileLength: "The product should at least have one image",
            });
            return;
        }

        const storeProduct = new StoreProduct({
            status: productStatus,
            type: productType,
        });

        try {
            const result = await storeProduct.updateStoreProduct(
                product.id,
                files,
                values,
                tags
            );

            if (result?.errors) {
                if ("message" in result.errors) {
                    toast({
                        variant: "destructive",
                        className: "font-bold",
                        description: result.errors?.message,
                    });
                }
            } else {
                toast({
                    variant: "default",
                    className: "font-bold",
                    description: "Successfully Created.",
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                className: "font-bold",
                description:
                    "Something went wrong. Check your connection and try again later.",
            });
        }
        setIsLoading(false);
    }

    return (
        <>
            <div className="min-w-60 w-[368px]  border ">
                <UploadImage
                    files={files}
                    setFiles={setFiles}
                    errors={filesErrors}
                    setErrors={setFilesErrors}
                />
            </div>
            <div className="grow flex flex-col gap-4 p-4 overflow-y-auto">
                <Form {...form}>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            form.handleSubmit(onSubmit)();
                        }}
                        className="space-y-6"
                    >
                        <div className="flex  justify-between">
                            <div></div>
                            <button
                                className="cursor-pointer text-blue-700"
                                onClick={() => {
                                    setCreateSchemaProps({
                                        type: productType,
                                        status: ProductStatus.Draft,
                                    });
                                    setProductStatus(ProductStatus.Draft);
                                }}
                            >
                                Save Draft
                            </button>
                        </div>

                        <div className="overflow-auto h-[310px] flex flex-col gap-4 pr-4">
                            <h3>Required</h3>
                            <ItemFormInput
                                control={form.control}
                                label="Title"
                                name="name"
                                placeholder="Title"
                            />
                            <ItemFormInput
                                control={form.control}
                                label="Price"
                                name="price"
                                placeholder="Price"
                                type="number"
                            />
                            <ItemFormSelect
                                control={form.control}
                                placeholder="Condition"
                                name="condition"
                                options={productConditionObj}
                            />
                            <ItemFormSelect
                                control={form.control}
                                placeholder="category"
                                name="category"
                                options={categories}
                            />

                            <h3>Optional</h3>
                            <ItemFormTexterea
                                control={form.control}
                                label="Description"
                                name="description"
                            />
                            <TagsForm
                                control={form.control}
                                name="tag"
                                label="Tag"
                                placeholder="Tag"
                                addTag={addTag}
                                removeTag={removeTag}
                                tags={tags}
                            />
                        </div>

                        <div className="flex justify-end items-center absolute h-[8vh] border border-t-neutral-600 bottom-0 w-full overflow-hidden px-8 -translate-x-[472px]">
                            <Button
                                onClick={() => {
                                    setCreateSchemaProps({
                                        type: productType,
                                        status: ProductStatus.Published,
                                    });
                                    setProductStatus(ProductStatus.Published);
                                }}
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </>
    );
};

export default ItemFormEdit;
