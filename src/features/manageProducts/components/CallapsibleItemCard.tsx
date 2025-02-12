import React from "react";
import { MediaEdge } from "../lib/utils";

export type CollapsibleItemCardProps = {
    media: MediaEdge | undefined;
    name: string | undefined;
    productType: "ITEM";
};
const CollapsibleItemCard = ({
    media,
    name,
    productType,
}: CollapsibleItemCardProps) => {
    return <div></div>;
};

export default CollapsibleItemCard;
