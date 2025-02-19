import React from "react";
import {
    FormControl,
    FormDescription,
    FormField,
    FormMessage,
} from "@/components/ui/form";
// import { Input } from "./ui/input";
import { z } from "zod";
import { Control, FieldPath } from "react-hook-form";
import {
    createFormSchema,
    ProductStatus,
    ProductType,
} from "@/features/manageProducts/lib/utils";
import { GoogleInput } from "@/components/GoogleInput";

const formSchema = createFormSchema({
    type: ProductType.Item,
    status: ProductStatus.Published,
});

interface ItemFormInputProps {
    control: Control<z.infer<typeof formSchema>>;
    name: FieldPath<z.infer<typeof formSchema>>;
    label?: string;
    placeholder: string;
    description?: string;
    type?: string;
}

const ItemFormInput = ({
    control,
    name,
    placeholder,
    description,
    type = "text",
}: ItemFormInputProps) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className="form-item">
                    {/* <FormLabel className="">{label}</FormLabel> */}
                    <div className="flex w-full flex-col">
                        <FormControl>
                            <GoogleInput
                                placeholder={placeholder}
                                className="[&+span]:!bg-input mt-1 py-4 !bg-input !border !border-neutral-600"
                                type={type}
                                {...field}
                                id={`input${name}`}
                            />
                        </FormControl>
                        <FormDescription>{description}</FormDescription>
                        <FormMessage className="form-message mt-2" />
                        {/* {field.value = ["name"]} */}
                    </div>
                </div>
            )}
        />
    );
};

export default ItemFormInput;
