"use client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

type NavigateBackProps = {
    children: React.ReactNode;
    className?: string;
};

const NavigateBack: React.FC<NavigateBackProps> = ({ className, children }) => {
    const router = useRouter();

    const navigateBack = () => {
        router.back(); // Go back only if dialog closes
    };
    return (
        <div
            onClick={navigateBack}
            className={cn("cursor-pointer w-max h-max", className)}
        >
            {children}
        </div>
    );
};

export default NavigateBack;
