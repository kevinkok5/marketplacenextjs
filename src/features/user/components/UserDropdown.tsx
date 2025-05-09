import {
    ChartNoAxesGantt,
    ChevronDown,
    Cloud,
    Plus,
    Settings,
    Store,
    User as UserIcon,
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/ModeToggle";
import React, { Suspense } from "react";
import LogoutDropdownItem from "./LogoutDropdownItem";
import { User } from "../lib/utils";
import Link from "next/link";
import { getUserStore } from "@/features/manageStore/lib/actions/store.actions";
import { allStores } from "@/features/manageStore/lib/utils";
import StoresDropdownItems from "./StoresDropdownItems";
import ViewAllStores from "./ViewAllStores";

type UserDropdownProps = {
    user: User;
};

export function UserDropdown({ user }: UserDropdownProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="user rounded-sm flex gap-2 items-center p-1 cursor-pointer">
                    <Avatar className="h-7 w-7">
                        <AvatarImage
                            // src="https://github.com/shadcn.png"
                            alt="@shadcn"
                        />
                        <AvatarFallback className="!bg-blue-500 font-semibold text-white uppercase">
                            {user.firstName && user.firstName[0]}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-2 font-semibold">
                        <p className="capitalize max-sm:hidden">
                            {user.firstName}
                        </p>
                        <ChevronDown
                            className="mt-[1px]"
                            size={15}
                            strokeWidth={1.5}
                        />
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="sm:w-60 w-[52vw]">
                <div className="user rounded-sm flex flex-col gap-2 items-center sm:py-5 py-3 ">
                    <Avatar className="h-14 w-14 !bg-blue-700 font-semibold text-white">
                        <AvatarImage
                            // src="https://github.com/shadcn.png"
                            alt="@shadcn"
                        />
                        <AvatarFallback className="!bg-blue-500 uppercase">
                            {user.firstName?.split("", 1)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-center font-semibold">
                        <p className="capitalize">
                            {user.firstName} {user.lastName}
                        </p>
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">
                            @{user.username}
                        </span>
                    </div>
                </div>
                <DropdownMenuSeparator />

                <DropdownMenuLabel className="text-sm">
                    My Account
                </DropdownMenuLabel>
                <DropdownMenuGroup>
                    <ModeToggle />
                    <Item
                        label="Profile"
                        icon={<UserIcon size={20} strokeWidth={1.5} />}
                    >
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </Item>
                    <Item
                        label="Settings"
                        icon={<Settings size={20} strokeWidth={1.5} />}
                    >
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </Item>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-sm">
                    Stores
                </DropdownMenuLabel>
                <DropdownMenuGroup>
                    <StoresDropdown />
                    {user.isShopOwner ? (
                        <Item
                            label="Add Store"
                            icon={<Plus size={20} strokeWidth={1.5} />}
                        />
                    ) : (
                        <Link href="/store/join">
                            <Item
                                label="Join"
                                icon={<Store size={20} strokeWidth={1.5} />}
                            />
                        </Link>
                    )}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                {/* <DropdownMenuItem disabled>
                    <Cloud />
                    <span>API</span>
                </DropdownMenuItem> */}
                {/* <DropdownMenuSeparator /> */}
                <LogoutDropdownItem />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

type ItemProps = {
    icon?: React.ReactElement<any>;
    label: string;
    children?: React.ReactNode;
    // defaultValue?: string;
    // value?: string;
};

export const Item: React.FC<ItemProps> = ({ icon, label, children }) => {
    return (
        <DropdownMenuItem>
            <div className="flex gap-3 items-center font-medium">
                {icon}
                <span className="sm:text-[13px] text-sm">{label}</span>
            </div>

            {children}
        </DropdownMenuItem>
    );
};

type UserStores = {
    allUserStores: allStores;
};

const StoresDropdown: React.FC = async () => {
    const stores: UserStores = await getUserStore({ first: 5 });

    return (
        <DropdownMenuSub>
            <DropdownMenuSubTrigger
                className="flex gap-3 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                // disabled
            >
                <ChartNoAxesGantt size={20} strokeWidth={1.5} />
                <span className="sm:text-[13px] text-sm font-medium">
                    Manage
                </span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
                <DropdownMenuSubContent>
                    {stores.allUserStores?.success && (
                        <StoresDropdownItems
                            storeEdges={stores.allUserStores.edges}
                        />
                    )}
                    <ViewAllStores />
                </DropdownMenuSubContent>
            </DropdownMenuPortal>
        </DropdownMenuSub>
    );
};
