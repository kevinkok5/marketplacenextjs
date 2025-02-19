"use client";

import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { createStoreSchema } from "../../lib/utils";
import { Textarea } from "@/components/ui/textarea";

const formSchema = createStoreSchema;

interface ItemFormTextereaProps {
    control: Control<z.infer<typeof formSchema>>;
    name: FieldPath<z.infer<typeof formSchema>>;
    label: string;
    description?: string;
}

export function CreateStoreFormTextarea({
    control,
    name,
    label,
    description,
}: ItemFormTextereaProps) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="">{label}</FormLabel>

                    <FormControl>
                        <Textarea
                            placeholder="Be as descriptive as possible"
                            className=" flex h-8 w-full rounded-md border border-neutral-100 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-[0.5px] focus-visible:ring-neutral-950 dark:bg-white focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-sky-600"
                            {...field}
                        />
                    </FormControl>
                    <FormDescription>{description}</FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
