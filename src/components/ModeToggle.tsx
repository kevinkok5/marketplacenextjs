"use client";

import * as React from "react";
import { Moon, Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";

import {
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
    const { setTheme } = useTheme();

    return (
        <>
            <DropdownMenuSub>
                <DropdownMenuSubTrigger className="flex gap-3">
                    <SunMoon size={20} strokeWidth={1.5} />
                    <span className="sm:text-[13px] text-sm font-medium">
                        Theme
                    </span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                        <DropdownMenuItem
                            className="flex gap-2"
                            onClick={() => setTheme("light")}
                        >
                            <Sun size={15} strokeWidth={1.5} />
                            <span className="text-xs">Light</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="flex gap-2"
                            onClick={() => setTheme("dark")}
                        >
                            <Moon size={15} strokeWidth={1.5} />

                            <span className="text-xs">Dark</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                            <span>System</span>
                        </DropdownMenuItem>
                    </DropdownMenuSubContent>
                </DropdownMenuPortal>
            </DropdownMenuSub>

            {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end"></DropdownMenuContent>
            </DropdownMenu> */}
        </>
    );
}
