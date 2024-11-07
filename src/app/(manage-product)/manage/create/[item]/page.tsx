import ItemForm from "@/features/product/create/item/layouts/ItemForm";
import Sidebar from "@/features/product/create/item/layouts/Sidebar";
import { ImagePlusIcon } from "lucide-react";
import React from "react";

const page = () => {
    return (
        <div>
            <section className="flex grow p-12 gap-10">
                <div className="min-w-60 w-[368px]  border ">
                    <div className="border-neutral-600 border rounded-sm aspect-square flex flex-col items-center justify-center gap-4 text-[13px]">
                        <svg
                            className="!text-white h-[25%] w-[25%]"
                            focusable="false"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            data-testid="AddToPhotosIcon"
                            fill="currentColor"
                        >
                            <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"></path>
                        </svg>

                        <p>Add photos</p>
                    </div>
                </div>
                <div className="grow flex flex-col gap-4 p-4 overflow-y-auto">
                    <ItemForm />
                </div>
            </section>
        </div>
    );
};

export default page;
