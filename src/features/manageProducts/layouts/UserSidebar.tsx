import SidebarLinkListItem from "@/components/SidebarLinkListItem";
import { Separator } from "@/components/ui/separator";
import {
    ChevronRight,
    History,
    Menu,
    MenuSquare,
    SquareMenuIcon,
    X,
} from "lucide-react";
import React from "react";
import CollapsibleSidebarListItems from "@/components/CollapsibleSidebarListItems";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import SidebarCollapsibleListing from "../components/SidebarCollapsibleListing";
import { type NextRequest } from "next/server";
import { headers } from "next/headers";
import { object } from "zod";
import ResolveFromLinkOnCreate from "../components/ResolveFromLinkOnCreate";

const UserSidebar = () => {
    return (
        <div className="flex min-w-[22rem] max-md:hidden sticky top-12 !h-[calc(100dvh-48px)]">
            <div className="w-full h-full px-2 py-6">
                <SidebarLinkListItem
                    label="Dashboard"
                    active={true}
                    href="/manage"
                    svg={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z"
                            />
                        </svg>
                    }
                />

                <SidebarCollapsibleListing />

                <ResolveFromLinkOnCreate
                    className="bg-sky-950"
                    label="New Listing"
                    // active={true}
                    href="/manage/create"
                    svg={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4.5v15m7.5-7.5h-15"
                            />
                        </svg>
                    }
                />
                {/* <SidebarLinkListItem
                    label="Selected category"
                    href=""
                    svg={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 6h.008v.008H6V6Z"
                            />
                        </svg>
                    }
                /> */}

                <Separator className="my-2" />
                <CollapsibleSidebarListItems icon={<History />} label="History">
                    <div className="text-sm pl-8 ">
                        <div className="flex flex-wrap py-1">
                            <Badge
                                className="rounded-sm text-[13px] font-light flex gap-2 justify-between"
                                variant="outline"
                            >
                                label
                                <X className="w-[14px] h-[14px]" />
                            </Badge>
                        </div>
                    </div>
                </CollapsibleSidebarListItems>
            </div>
            <Separator orientation="vertical" />
        </div>
    );
};

export default UserSidebar;
