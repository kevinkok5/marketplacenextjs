"use client";

import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import {
    createFormSchema,
    ProductStatus,
    ProductType,
} from "@/features/manageProducts/lib/utils";
import { GoogleTextarea } from "@/components/GoogleTextarea";

const formSchema = createFormSchema({
    type: ProductType.Item,
    status: ProductStatus.Published,
});

interface ItemFormTextereaProps {
    control: Control<z.infer<typeof formSchema>>;
    name: FieldPath<z.infer<typeof formSchema>>;
    label: string;
    description?: string;
}

export function ItemFormTexterea({
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
                    <FormControl>
                        <GoogleTextarea
                            placeholder=""
                            className="resize-none [&+span]:!bg-input !bg-input !border !border-neutral-600 "
                            label={label}
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
