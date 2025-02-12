import {
    ItemColumns,
    ItemColumnProps,
} from "@/features/manageProducts/me/components/ItemColumns";
import { ListingsDataTable } from "@/features/manageProducts/me/layout/ListingsDataTable";
import React from "react";
import {
    VehicleColumnProps,
    vehicleColumns,
} from "../components/VehicleColumns";

type vehicleListingProps = {
    vehiclesData: VehicleColumnProps[];
};

const VehicleListing = ({ vehiclesData }: vehicleListingProps) => {
    return (
        <div className="mx-auto pt-4 pb-18">
            <ListingsDataTable
                columns={vehicleColumns}
                data={vehiclesData}
                filterField="make"
            />
        </div>
    );
};

export default VehicleListing;
