import React from "react";
// import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
// import { Input } from "./ui/input";
import { z } from "zod";
import { Control, FieldPath } from "react-hook-form";
import { createStoreSchema } from "@/features/manageStore/lib/utils";
import {
    FormControl,
    FormField,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = createStoreSchema;

interface CustomInputProps {
    control: Control<z.infer<typeof formSchema>>;
    name: FieldPath<z.infer<typeof formSchema>>;
    label: string;
    placeholder: string;
    type?: string;
}

const CreateStoreFormInput = ({
    control,
    name,
    label,
    placeholder,
    type = "text",
}: CustomInputProps) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className="form-item">
                    <FormLabel className="">{label}</FormLabel>
                    <div className="flex w-full flex-col">
                        <FormControl>
                            <Input
                                placeholder={placeholder}
                                className="mt-1 py-6 dark:bg-white"
                                type={type}
                                {...field}
                                id={`input${name}`}
                            />
                        </FormControl>
                        <FormMessage className="form-message mt-2" />
                    </div>
                </div>
            )}
        />
    );
};

export default CreateStoreFormInput;
