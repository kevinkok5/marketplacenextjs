import React from "react";
import { z } from "zod";
import { Control, FieldPath } from "react-hook-form";
import { authFormSchema, AuthType } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
    FormControl,
    FormField,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

const formSchema = authFormSchema(AuthType.SignUp);

interface CustomInputProps {
    control: Control<z.infer<typeof formSchema>>;
    name: FieldPath<z.infer<typeof formSchema>>;
    label: string;
    placeholder: string;
    type?: string;
}

const CustomInput = ({
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
                                className="mt-1 py-6"
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

export default CustomInput;
