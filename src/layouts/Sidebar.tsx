import SidebarLinkListItem from "@/components/SidebarLinkListItem";
import { Separator } from "@/components/ui/separator";
import { History, X } from "lucide-react";
import React from "react";
import CollapsibleSidebarListItems from "@/components/CollapsibleSidebarListItems";
import { Badge } from "@/components/ui/badge";

const Sidebar = () => {
    return (
        <div className="flex min-w-[22rem] max-md:hidden sticky top-12 !h-[calc(100dvh-48px)]">
            <div className="w-full h-full px-2 py-6">
                <SidebarLinkListItem
                    label="Browse All"
                    active={true}
                    href="/"
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
                                d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                            />
                        </svg>
                    }
                />
                <SidebarLinkListItem
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
                />
                <SidebarLinkListItem
                    label="Buying"
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
                                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                            />
                        </svg>
                    }
                    external={true}
                />
                <SidebarLinkListItem
                    label="Selling"
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
                                d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
                            />
                        </svg>
                    }
                    external={true}
                />
                <Separator className="my-2" />
                <CollapsibleSidebarListItems icon={<History />} label="History">
                    <div className="text-sm pl-8 ">
                        <div className="flex flex-wrap py-1">
                            <Badge
                                className="rounded-sm text-xs flex gap-2 justify-between"
                                variant="outline"
                            >
                                label
                                <X className="w-[14px] h-[14px]" />
                            </Badge>
                        </div>
                    </div>
                </CollapsibleSidebarListItems>
                <CollapsibleSidebarListItems
                    icon={
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
                                d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
                            />
                        </svg>
                    }
                    label="Category"
                >
                    <div className="text-sm ">
                        <ul className="">
                            <li className="pl-8 py-3 rounded-sm items-center transition duration-200 ease-out hover:bg-input font-medium">
                                Category name
                            </li>
                            <li className="pl-8 py-3 rounded-sm items-center transition duration-200 ease-out hover:bg-input font-medium">
                                Category name
                            </li>
                            <li className="pl-8 py-3 rounded-sm items-center transition duration-200 ease-out hover:bg-input font-medium">
                                Category name
                            </li>
                            <li className="pl-8 py-3 rounded-sm items-center transition duration-200 ease-out hover:bg-input font-medium">
                                Category name
                            </li>
                        </ul>
                    </div>
                </CollapsibleSidebarListItems>
            </div>
            <Separator orientation="vertical" />
        </div>
    );
};

export default Sidebar;
