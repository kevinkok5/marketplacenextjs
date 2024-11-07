import Sidebar from "@/features/product/create/layouts/Sidebar";
import Link from "next/link";
import React from "react";

const page = () => {
    return (
        // <div>
        <section className="flex items-center justify-center gap-4 grow">
            <Link href="/manage/create/item">
                <div className="border border-neutral-600 h-44 w-36 rounded-sm flex items-center justify-center">
                    Item
                </div>
            </Link>
            <Link href="/manage/create/item">
                <div className="border border-neutral-600 h-44 w-36 rounded-sm flex items-center justify-center">
                    Vehicul
                </div>
            </Link>
            <Link href="/manage/create/item">
                <div className="border border-neutral-600 h-44 w-36 rounded-sm flex items-center justify-center">
                    Rental
                </div>
            </Link>
        </section>
        // </div>
    );
};

export default page;
