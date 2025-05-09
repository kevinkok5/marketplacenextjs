import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { type JSX } from "react";

type SidbarLinkListItemProps = {
    svg: React.ReactElement<any>;
    label: string;
    className?: string;
    // onClick?: () => void;
    href: string;
    active?: boolean;
    external?: boolean;
};

const SidbarLinkListItem = ({
    svg,
    label,
    className,
    href,
    active = false,
    external = false,
}: SidbarLinkListItemProps): JSX.Element => {
    return (
        <Link href={href}>
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
                <div className="w-full font-semibold">{label}</div>

                {external && <ChevronRight className="h-5 w-5" />}
            </div>
        </Link>
    );
};

export default SidbarLinkListItem;
