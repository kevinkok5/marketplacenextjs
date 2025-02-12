"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { signOut } from "@/lib/actions/auth.actions";
import React from "react";
import { Item } from "./UserDropdown";
import { LogOut } from "lucide-react";

const LogoutDropdownItem = () => {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = React.useState(false);

    async function handleSignOut() {
        setIsLoading(true);
        try {
            const result = await signOut();
            if (result?.error) {
                toast({
                    variant: "destructive",
                    className: "font-bold",
                    description: result.error.message,
                });
            } else {
                toast({
                    variant: "default",
                    className: "font-bold",
                    description: "Logout successfully",
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
                icon={<LogOut size={20} strokeWidth={1.5} />}
            ></Item>
        </DropdownMenuItem>
    );
};

export default LogoutDropdownItem;
