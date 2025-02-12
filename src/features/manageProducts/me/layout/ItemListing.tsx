import {
    ItemColumns,
    ItemColumnProps,
} from "@/features/manageProducts/me/components/ItemColumns";
import { ListingsDataTable } from "@/features/manageProducts/me/layout/ListingsDataTable";
import React from "react";

type ItemListingProps = {
    itemsData: ItemColumnProps[];
};

const ItemListing = ({ itemsData }: ItemListingProps) => {
    return (
        <div className="mx-auto pt-4 pb-18">
            <ListingsDataTable
                columns={ItemColumns}
                data={itemsData}
                filterField="name"
            />
        </div>
    );
};

export default ItemListing;
