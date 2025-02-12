"use client";

import { z } from "zod";
import { Control, FieldPath } from "react-hook-form";

// import { toast } from "@/components/hooks/use-toast";
import {
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
import { GoogleSelect } from "@/components/GoogleSelect";

const formSchema = createFormSchema({
    type: ProductType.Item,
    status: ProductStatus.Published,
});

interface ItemFormSelectProps {
    control: Control<z.infer<typeof formSchema>>;
    name: FieldPath<z.infer<typeof formSchema>>;
    placeholder: string;
    options: Record<any, string>;
    description?: string;
}

export function ItemFormSelect({
    control,
    name,
    placeholder,
    options,
    description,
}: ItemFormSelectProps) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <GoogleSelect
                        className="[&+span]:!bg-input !bg-input !border !border-neutral-600 "
                        onChange={field.onChange}
                        options={options}
                        value={field.value}
                        label={placeholder}
                    />

                    <FormDescription>{description}</FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
