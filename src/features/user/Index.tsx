import { ModeToggle } from "@/components/ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUser } from "@/features/user/lib/actions/user.actions";
import Link from "next/link";
import React from "react";
import { UserDropdown } from "./components/UserDropdown";

const Index = async () => {
    const user = await getUser();

    if (!user) {
        return (
            <Link href="/auth">
                <button>Sing in</button>
            </Link>
        );
    }

    return <UserDropdown user={user} />;
};

export default Index;
