"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

type OnClosePopUpProps = {
    children?: React.ReactNode;
    className?: string;
};

const OnClosePopUp: React.FC<OnClosePopUpProps> = ({ children, className }) => {
    const searchParams = useSearchParams();
    const pageComingFrom = searchParams.get("from") || "";

    // console.log("Search from: ", pageComingFrom);
    return (
        <Link href={`/manage/${pageComingFrom}`} className={className}>
            {children}
        </Link>
    );
};

export default OnClosePopUp;
