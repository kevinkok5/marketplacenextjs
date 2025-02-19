"use client";
import React, { useState } from "react";
import { join } from "../../lib/actions/store.actions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const ConfirmJoinBtn = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter(); // Initialize the router
    const { toast } = useToast();

    const handleClick = async () => {
        setIsLoading(true);

        try {
            // Step 1: Call the `join` action
            const joinResponse = await join();
            if (joinResponse.becomeShopOwner.success) {
                // Step 2: Revalidate the user data
                toast({
                    variant: "default",
                    className: "font-bold",
                    description: "You've Joined Succefully",
                });

                router.push("/store");
            } else {
                toast({
                    variant: "destructive",
                    className: "font-bold",
                    description: "Failed to join",
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                className: "font-bold",
                description: "Failed to join",
            });
        } finally {
            setIsLoading(false);
        }

        return (
            <Button onClick={handleClick} disabled={isLoading}>
                {isLoading ? "Loading..." : "Join and Go to Store"}
            </Button>
        );
    };

    return (
        <Button onClick={handleClick} disabled={isLoading}>
            {isLoading ? "Loading..." : "Join and Go to Store"}
        </Button>
    );
};

export default ConfirmJoinBtn;
