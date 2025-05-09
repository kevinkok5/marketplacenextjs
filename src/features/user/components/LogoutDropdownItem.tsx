"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { signOut } from "@/lib/actions/auth.actions";
import React from "react";
import { Item } from "./UserDropdown";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

const LogoutDropdownItem = () => {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = React.useState(false);
    const router = useRouter();

    async function handleSignOut() {
        setIsLoading(true);
        try {
            const result = await signOut();
            if (result?.success) {
                router.push("/"); // Use client-side navigation

                toast({
                    variant: "default",
                    className: "font-bold",
                    description: "Logout successfully",
                });
            } else if (result?.error) {
                toast({
                    variant: "destructive",
                    className: "font-bold",
                    description: result.error.message,
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                className: "font-bold",
                description:
                    "Something went wrong. Check your connection and try again later.",
            });
        }
        setIsLoading(false);
    }
    return (
        <DropdownMenuItem onClick={handleSignOut}>
            <Item
                label="Log out"
                icon={<LogOut size={16} strokeWidth={1.5} />}
            />
        </DropdownMenuItem>
    );
};

export default LogoutDropdownItem;
