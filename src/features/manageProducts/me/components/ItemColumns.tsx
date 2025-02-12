"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
    ArrowUpDown,
    Edit,
    EllipsisVertical,
    Eye,
    MoreHorizontal,
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
import { DeepPartialItemProduct, ProductStatus } from "../../lib/utils";
import { customCapitalize, getAbsoluteUrl } from "@/lib/utils";
import Image from "next/image";
import ButtonLoading from "@/components/ButtonLoading";
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
            console.log;

            return (
                <div className="flex gap-4">
                    <div className="w-28 h-20 rounded-sm aspect-square bg-gray-500 overflow-hidden">
                        {originalObj?.product?.node?.medias?.edges !=
                        undefined ? (
                            <Image
                                src={
                                    originalObj?.product?.node?.medias?.edges[0]
                                        ?.node
                                        ? originalObj?.product?.node?.medias
                                              ?.edges[0].node?.media
                                            ? originalObj?.product?.node?.medias
                                                  ?.edges[0].node?.media
                                            : "/"
                                        : "/"
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
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="flex flex-col gap-2 py-1">
                        <p className="text-gray-400 text-xs">
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
                        <ul className="flex justify-between w-40">
                            <li>
                                <Link
                                    href={`/manage/edit/${originalObj?.product?.node?.id}${queryParam}`}
                                >
                                    <div className="p-2 rounded-lg hover:bg-neutral-700">
                                        <Pen size={18} strokeWidth={1} />
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <div className="p-2 rounded-lg hover:bg-neutral-700">
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
                                            <div className="p-2 rounded-lg hover:bg-neutral-700">
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
                return customCapitalize(status);
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
                <p className="max-w-40 pl-4 truncate">
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
            // return <div className="text-right font-medium">{formatted}</div>;
            return formatted;
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
                        className="!bg-sky-600 !text-white text-xs capitalize"
                        disabled={true}
                    >
                        Mark as sold
                    </Button>
                );
            }

            if (customCapitalize(status) === "Published") {
                return (
                    <Button className="!bg-sky-600 !text-white text-xs capitalize hover:!bg-sky-500">
                        Mark as sold
                    </Button>
                );
            } else if (customCapitalize(status) === "Sold") {
                return (
                    <Button className="!bg-sky-600 !text-white text-xs capitalize">
                        relist this item
                    </Button>
                );
            } else if (customCapitalize(status) === "Draft") {
                return (
                    <Button className="!bg-sky-600 !text-white text-xs capitalize ho">
                        continue editing
                    </Button>
                );
            }

            return (
                <Button
                    className="!bg-sky-600 !text-white text-xs capitalize"
                    disabled={true}
                >
                    Mark as sold
                </Button>
            );
        },
    },
];
