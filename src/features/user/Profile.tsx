import { getUser } from "@/features/user/lib/actions/user.actions";
import Link from "next/link";
import React from "react";
import { UserDropdown } from "./components/UserDropdown";
import { User } from "./lib/utils";

const Profile = async ({ user }: { user: User }) => {
    // const user = await getUser();

    if (!user) {
        return (
            <Link href="/auth">
                <button>Sing in</button>
            </Link>
        );
    }

    return <UserDropdown user={user} />;
};

export default Profile;
