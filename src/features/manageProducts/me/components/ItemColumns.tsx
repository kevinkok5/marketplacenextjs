"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
    ArrowUpDown,
    EllipsisVertical,
    Eye,
    Pen,
    Share2,
    Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { DeepPartialItemProduct } from "../../lib/utils";
import { customCapitalize, getAbsoluteUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ItemColumnProps = {
    id: string;
    product: DeepPartialItemProduct;
    name: string;
    price: number;
    status: string;
};

const queryParam = `?from=${encodeURIComponent("me/listings")}`;

export const ItemColumns: ColumnDef<any>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "product",
        header: "Product",
        cell: ({ row, handleDelete }: any) => {
            const originalObj = row.original;

            return (
                <div className="flex gap-4 ">
                    <div className="w-28 h-20 rounded-sm aspect-square bg-neutral-100 dark:bg-neutral-900 overflow-hidden flex justify-center items-center">
                        {originalObj?.product?.node?.medias?.edges !=
                            undefined &&
                        originalObj?.product?.node?.medias?.edges[0]?.node ? (
                            originalObj?.product?.node?.medias?.edges[0].node
                                ?.media && (
                                <Image
                                    src={
                                        originalObj?.product?.node?.medias
                                            ?.edges[0].node?.media
                                    }
                                    alt={
                                        originalObj?.product?.node?.name
                                            ? `${originalObj?.product?.node?.name}-image`
                                            : "image"
                                    }
                                    width={800}
                                    height={600}
                                    className="w-full h-full object-cover"
                                />
                            )
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-8 text-black dark:text-white"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                />
                            </svg>
                        )}
                    </div>
                    <div className="flex flex-col gap-2 py-1">
                        <p className="dark:text-gray-400 text-xs">
                            {originalObj?.product?.node?.availabilityStatus &&
                                customCapitalize(
                                    originalObj?.product?.node
                                        ?.availabilityStatus
                                )}{" "}
                            {originalObj?.product?.node?.availabilityStatus && (
                                <span className="font-bold text-lg">.</span>
                            )}{" "}
                            Listed on{" "}
                            {
                                originalObj?.product?.node?.createdAt?.split(
                                    "T"
                                )[0]
                            }
                        </p>
                        <ul className="flex max-sm:flex-row-reverse justify-between w-40">
                            <li>
                                <Link
                                    href={`/manage/edit/${originalObj?.product?.node?.id}${queryParam}`}
                                >
                                    <div className="p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700">
                                        <Pen size={18} strokeWidth={1} />
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <div className="p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700">
                                    <Eye size={18} strokeWidth={1} />
                                </div>
                            </li>
                            <li>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="h-8 w-8 p-0"
                                        >
                                            <span className="sr-only">
                                                Open menu
                                            </span>
                                            <div className="p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700">
                                                <EllipsisVertical
                                                    size={18}
                                                    strokeWidth={1}
                                                />
                                            </div>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>
                                            Actions
                                        </DropdownMenuLabel>
                                        <DropdownMenuItem
                                            disabled={
                                                originalObj?.product?.node
                                                    ?.productStatus != undefined
                                                    ? customCapitalize(
                                                          originalObj?.product
                                                              ?.node
                                                              ?.productStatus
                                                      ) !== "Published"
                                                    : true
                                            }
                                            onClick={() => {
                                                const id: string = originalObj
                                                    ?.product?.node?.id
                                                    ? originalObj?.product?.node
                                                          ?.id
                                                    : "";
                                                const generatedUrl =
                                                    getAbsoluteUrl(
                                                        `/item/${id}`
                                                    );
                                                navigator.clipboard.writeText(
                                                    generatedUrl
                                                );
                                            }}
                                            className="flex gap-3"
                                        >
                                            <Share2 size={16} strokeWidth={2} />
                                            Copy listing link
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />

                                        {/* <DropdownMenuItem className="flex gap-3">
                                            View payment details
                                        </DropdownMenuItem> */}

                                        <DropdownMenuItem
                                            className="flex gap-3"
                                            onClick={() => {
                                                const id: string = originalObj
                                                    ?.product?.node?.id
                                                    ? originalObj?.product?.node
                                                          ?.id
                                                    : "";
                                                // console.log(
                                                //     "deleting: ",
                                                handleDelete(id);
                                                // );
                                            }}
                                        >
                                            <Trash2 size={16} strokeWidth={2} />
                                            Delete Listing
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </li>
                        </ul>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status");
            if (typeof status == "string") {
                return (
                    <div className="font-medium">
                        {customCapitalize(status)}
                    </div>
                );
            }

            // return <div className="text-right font-medium">{formatted}</div>;
            return status;
        },
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const name = row.getValue("name");
            if (!name || typeof name != "string") {
                return <p className="max-w-40 pr-4 truncate">Untitled</p>;
            }

            // return <div className="text-right font-medium">{formatted}</div>;
            return (
                <p className="max-w-40 pl-4 truncate font-medium">
                    {customCapitalize(name)}
                </p>
            );
        },
    },
    {
        accessorKey: "price",
        // header: () => <div className="text-right">Price</div>,
        header: "Price",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("price"));
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "ZAR",
            }).format(amount);
            return <div className="font-medium">{formatted}</div>;
            // return formatted;
        },
    },
    {
        id: "actions",
        cell: ({ row, table }) => {
            const originalObj = row.original;
            const status = originalObj?.product?.node?.productStatus;
            if (!status) {
                return (
                    <Button
                        className="!bg-blue-600 !text-white text-xs capitalize"
                        disabled={true}
                    >
                        Mark as sold
                    </Button>
                );
            }

            if (customCapitalize(status) === "Published") {
                return (
                    <Button className="!bg-blue-600 !text-white text-xs capitalize dark:hover:!bg-blue-700 hover:!bg-blue-500">
                        Mark as sold
                    </Button>
                );
            } else if (customCapitalize(status) === "Sold") {
                return (
                    <Button className="!bg-blue-600 !text-white text-xs capitalize dark:hover:!bg-blue-700 hover:!bg-blue-500">
                        relist this item
                    </Button>
                );
            } else if (customCapitalize(status) === "Draft") {
                return (
                    <Button className="!bg-blue-600 !text-white text-xs capitalize dark:hover:!bg-blue-700 hover:!bg-blue-500">
                        continue editing
                    </Button>
                );
            }

            return (
                <Button
                    className="!bg-sky-600 !text-white text-xs capitalize dark:hover:!bg-blue-700 hover:!bg-blue-500"
                    disabled={true}
                >
                    Mark as sold
                </Button>
            );
        },
    },
];
