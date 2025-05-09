"use client";

import { Button } from "@/components/ui/button";
import { Store } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ViewAllStoreMobile = () => {
    const searchPath = usePathname();

    return (
        <Link href={`${searchPath}?stores=true`}>
            <Button
                size="icon"
                className="!bg-neutral-200 dark:!bg-neutral-800 text-black dark:text-neutral-100 hover:!bg-neutral-300 dark:hover:!bg-neutral-700 rounded-full"
            >
                <Store size={16} />
            </Button>
        </Link>
    );
};

export default ViewAllStoreMobile;
