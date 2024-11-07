"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    createFormSchema,
    CreateFormSchemaProps,
    ProductStatus,
    ProductType,
} from "@/features/product/lib/utils";
import { useState } from "react";
import ItemFormInput from "../components/ItemFormInput";

const ItemForm = () => {
    const [createFromSchemaProps, setCreateSchemaProps] =
        useState<CreateFormSchemaProps>({
            type: ProductType.Item,
            status: ProductStatus.Published,
        });

    let formSchema = createFormSchema(createFromSchemaProps);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }

    function saveDraft() {
        console.log("saved draft");
    }

    return (
        <>
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
                        <p
                            className="cursor-pointer text-blue-700"
                            onClick={(event) => {
                                setCreateSchemaProps({
                                    type: ProductType.Rental,
                                    status: ProductStatus.Draft,
                                });
                            }}
                        >
                            Save Draft
                        </p>
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
                        <ItemFormInput
                            control={form.control}
                            label="Title"
                            name="name"
                            placeholder="Title"
                        />
                        <ItemFormInput
                            control={form.control}
                            label="Title"
                            name="name"
                            placeholder="Title"
                        />
                        <ItemFormInput
                            control={form.control}
                            label="Title"
                            name="name"
                            placeholder="Title"
                        />
                        <ItemFormInput
                            control={form.control}
                            label="Title"
                            name="name"
                            placeholder="Title"
                        />
                        <ItemFormInput
                            control={form.control}
                            label="Title"
                            name="name"
                            placeholder="Title"
                        />
                    </div>

                    <div className="flex justify-end items-center absolute h-[8vh] border border-t-neutral-600 bottom-0 w-full overflow-hidden px-8 -translate-x-[472px]">
                        <Button
                            onClick={() => {
                                setCreateSchemaProps({
                                    type: ProductType.Item,
                                    status: ProductStatus.Published,
                                });
                            }}
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
};

export default ItemForm;
