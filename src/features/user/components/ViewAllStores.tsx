"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const ViewAllStores = () => {
    const searchPath = usePathname();

    return (
        <Link href={`${searchPath}?stores=true`}>
            <div>
                <DropdownMenuItem className="flex gap-2">
                    <span className="text-sm font-semibold">View all</span>
                </DropdownMenuItem>
            </div>
        </Link>
    );
};

export default ViewAllStores;
