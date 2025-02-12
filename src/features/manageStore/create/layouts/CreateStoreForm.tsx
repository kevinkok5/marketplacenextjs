"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { useState } from "react";
import { createStoreSchema } from "../../lib/utils";
import { CreateStoreFormTextarea } from "../components/CreateStoreFormTextarea";
import { useToast } from "@/hooks/use-toast";
import { createUserStore } from "../../lib/actions/store.actions";
import { createStoreSession } from "../../lib/storeSession";
import CreateStoreFormInput from "../components/CreateStoreFormInput";

const CreateStoreForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    let formSchema = createStoreSchema;

    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: undefined,
        },
    });

    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        const userData = {
            name: values.name,
            description: values.description || "",
        };

        try {
            const result = await createUserStore(userData);

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
                const storeTokenSession = {
                    token: {
                        id: result.data.createStore.store.id,
                        name: result.data.createStore.store.name,
                    },
                };

                // console.log("store_toekn: ", result.data.create);
                const storeSession = await createStoreSession(
                    storeTokenSession
                );
            }
        } catch (error) {
            console.log("error:", error);
            toast({
                variant: "destructive",
                className: "font-bold",
                description:
                    "Something went wrong. Check your connection and try again later.",
            });
        }
        setIsLoading(false);
    };

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="overflow-auto h-[310px] flex flex-col gap-4 pt-4 pr-4">
                        <CreateStoreFormInput
                            control={form.control}
                            label="Name"
                            name="name"
                            placeholder="Name"
                        />

                        <CreateStoreFormTextarea
                            control={form.control}
                            label="Description(optional)"
                            name="description"
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button
                            disabled={isLoading}
                            className="dark:bg-black dark:text-white dark:hover:text-black"
                        >
                            Create
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
};

export default CreateStoreForm;
