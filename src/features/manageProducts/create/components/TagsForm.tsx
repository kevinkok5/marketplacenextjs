import React from "react";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
// import { Input } from "./ui/input";
import { z } from "zod";
import { Control, FieldPath } from "react-hook-form";
import {
    createFormSchema,
    ProductStatus,
    ProductType,
    Tag,
} from "@/features/manageProducts/lib/utils";
import { GoogleInput } from "@/components/GoogleInput";
import { Badge } from "@/components/ui/badge";

const formSchema = createFormSchema({
    type: ProductType.Item,
    status: ProductStatus.Published,
});

interface TagsFormProps {
    control: Control<z.infer<typeof formSchema>>;
    name: FieldPath<z.infer<typeof formSchema>>;
    label?: string;
    placeholder: string;
    description?: string;
    type?: string;
    tags: Tag[];
    addTag: (tag: string) => void;
    removeTag: (tag: string) => void;
}

const TagsForm = ({
    control,
    name,
    label,
    placeholder,
    description,
    type = "text",
    tags,
    addTag,
    removeTag,
}: TagsFormProps) => {
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
                                id={`input${label}`}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        addTag(e.currentTarget.value);
                                        e.currentTarget.value = "";
                                    }
                                }}
                            />
                        </FormControl>
                        <div className="flex flex-wrap mt-2 space-x-2">
                            {tags.map((tag) => (
                                <Badge
                                    key={tag.name}
                                    className="cursor-pointer"
                                    onClick={() => removeTag(tag?.name)}
                                >
                                    {tag.name} ✕
                                </Badge>
                            ))}
                        </div>
                        <FormDescription>{description}</FormDescription>
                        <FormMessage className="form-message mt-2" />
                    </div>
                </div>
            )}
        />
    );
};

export default TagsForm;
