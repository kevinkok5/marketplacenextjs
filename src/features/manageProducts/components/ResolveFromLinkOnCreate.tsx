"use client";

// this is a normale SidebarLinkListItem but add the "?from" search param to the link

import { cn } from "@/lib/utils";
import { link } from "fs";
import {
    ArrowDown10,
    ArrowRight,
    ChevronLeftCircle,
    ChevronRight,
    MoveLeft,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

type SidbarLinkListItemProps = {
    svg: React.ReactElement;
    label: string;
    className?: string;
    // onClick?: () => void;
    href: string;
    active?: boolean;
    external?: boolean;
};

const ResolveFromLinkOnCreate = ({
    svg,
    label,
    className,
    href,
    active = false,
    external = false,
}: SidbarLinkListItemProps): JSX.Element => {
    const searchPath = usePathname();
    console.log("searchPath", searchPath);

    let queryParam = "";
    if (searchPath.startsWith("/manage/")) {
        const strippedPath = searchPath.replace("/manage/", "");
        queryParam = `?from=${encodeURIComponent(strippedPath)}`;
    }

    return (
        <Link href={href + queryParam}>
            <div
                className={cn(
                    "flex px-3 py-3 gap-4 text-sm rounded-sm items-center transition duration-200 ease-out hover:bg-input font-light",
                    {
                        "bg-input": active,
                    },
                    className
                )}
            >
                <div>{svg}</div>
                <div className="w-full">{label}</div>

                {external && <ChevronRight className="h-5 w-5" />}
            </div>
        </Link>
    );
};

export default ResolveFromLinkOnCreate;
