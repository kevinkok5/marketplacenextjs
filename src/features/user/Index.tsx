import { ModeToggle } from "@/components/ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUser } from "@/features/user/lib/actions/user.actions";
import Link from "next/link";
import React from "react";

const Index = async () => {
    const user = await getUser();
    console.log("User: " + user);

    if (!user) {
        return (
            <Link href="/auth">
                <button>Sing in</button>
            </Link>
        );
    }

    return (
        <div className="user flex gap-2 items-center">
            <Link href="/">
                <Avatar className="h-8 w-8">
                    <AvatarImage
                        // src="https://github.com/shadcn.png"
                        alt="@shadcn"
                    />
                    <AvatarFallback>k</AvatarFallback>
                </Avatar>
            </Link>
            <div className="flex items-center gap-1">
                <p>User</p>
                <ModeToggle />
            </div>
        </div>
    );
};

export default Index;
