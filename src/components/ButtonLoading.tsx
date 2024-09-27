// components/LoadingSpinner.tsx
"use client"; // Mark this as a client component

import * as React from "react";

import { useState, useEffect } from "react";
import { Button, ButtonProps } from "./ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ButtonLoadingPros extends ButtonProps {
    children: React.ReactNode;
    href: string;
}

const ButtonLoading = React.forwardRef<HTMLButtonElement, ButtonLoadingPros>(
    (
        { className, variant, size, asChild = false, href, children, ...props },
        ref
    ) => {
        const router = useRouter();
        const [loading, setLoading] = useState(false);
        const [isPending, startTransition] = React.useTransition();

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            setLoading(true);

            // Use the new `router.push` and wait for navigation to finish
            startTransition(() => {
                router.push(href);
                setLoading(false); // Reset loading state when navigation finishes
            });
        };

        return (
            <Button
                disabled={loading}
                variant={variant}
                className={className}
                asChild
                size={size}
                ref={ref}
                {...props}
                onClick={(e) => handleClick(e)}
            >
                <Link href={href}>
                    {loading || isPending ? "loading..." : children}
                </Link>
            </Button>
        );
    }
);

export default ButtonLoading;
