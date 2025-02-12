import {
    ChartNoAxesGantt,
    ChevronDown,
    CirclePlus,
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    Store,
    User as UserIcon,
    UserPlus,
    Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
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
import { signOut } from "@/lib/actions/auth.actions";
import React from "react";
import { useToast } from "@/hooks/use-toast";
import LogoutDropdownItem from "./LogoutDropdownItem";
import { User } from "../lib/utils";
import Link from "next/link";
import { getStore } from "@/features/manageStore/lib/actions/store.actions";
import { allStores } from "@/features/manageStore/lib/utils";
import StoresDropdownItems from "./StoresDropdownItems";

type UserDropdownProps = {
    user: User;
};

export function UserDropdown({ user }: UserDropdownProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="user rounded-sm flex gap-2 items-center hover:bg-neutral-800 p-1">
                    <Avatar className="h-7 w-7 !bg-blue-700">
                        <AvatarImage
                            // src="https://github.com/shadcn.png"
                            alt="@shadcn"
                        />
                        <AvatarFallback className="!bg-blue-500">
                            {user.firstName && user.firstName[0]}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-2">
                        <p className="capitalize">{user.firstName}</p>
                        <ChevronDown
                            className="mt-[1px]"
                            size={15}
                            strokeWidth={1.5}
                        />
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60">
                <div className="user rounded-sm flex flex-col gap-2 items-center py-5">
                    <Avatar className="h-14 w-14 !bg-blue-700">
                        <AvatarImage
                            // src="https://github.com/shadcn.png"
                            alt="@shadcn"
                        />
                        <AvatarFallback className="!bg-blue-500 uppercase">
                            {user.firstName?.split("", 1)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-center ">
                        <p className="capitalize">
                            {user.firstName} {user.lastName}
                        </p>
                        <span className="text-xs text-neutral-400">
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

                <DropdownMenuItem disabled>
                    <Cloud />
                    <span>API</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <LogoutDropdownItem />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

type ItemProps = {
    icon?: React.ReactElement;
    label: string;
    children?: React.ReactNode;
    // defaultValue?: string;
    // value?: string;
};

export const Item: React.FC<ItemProps> = ({ icon, label, children }) => {
    return (
        <DropdownMenuItem>
            <div className="flex gap-3 items-center">
                {icon}
                <span className="text-sm">{label}</span>
            </div>

            {children}
        </DropdownMenuItem>
    );
};

type Stores = {
    allStores: allStores;
};

const StoresDropdown: React.FC = async () => {
    const stores: Stores = await getStore();

    return (
        <DropdownMenuSub>
            <DropdownMenuSubTrigger
                className="flex gap-3 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                // disabled
            >
                <ChartNoAxesGantt size={20} strokeWidth={1.5} />
                <span className="text-sm">Manage</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
                <DropdownMenuSubContent>
                    {stores.allStores?.success && (
                        <StoresDropdownItems
                            storeEdges={stores.allStores.edges}
                        />
                    )}

                    <Link href="/store">
                        <div>
                            <DropdownMenuItem className="flex gap-2">
                                <span className="text-sm">View all</span>
                            </DropdownMenuItem>
                        </div>
                    </Link>
                </DropdownMenuSubContent>
            </DropdownMenuPortal>
        </DropdownMenuSub>
    );
};
