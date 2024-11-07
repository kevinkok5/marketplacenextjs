import * as React from "react";

import { cn } from "@/lib/utils";
// import { SidebarCloseIcon, X } from "lucide-react";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

const GoogleInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, placeholder, ...props }, ref) => {
        return (
            <div className="relative">
                <input
                    type={type}
                    // required
                    className={cn(
                        "outline-none duration-200 peer flex h-8 w-full rounded-md border border-neutral-100 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-[0.5px] focus-visible:ring-neutral-950 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-sky-600  [&:not(:placeholder-shown)~span]:-translate-y-[130%]",
                        className
                    )}
                    ref={ref}
                    placeholder=" "
                    {...props}
                />
                <span className="absolute left-0 top-1/2 -translate-y-1/2 px-1 text-inherit tracking-wide peer-focus:text-indigo-600 pointer-events-none duration-200 peer-focus:text-[10px] peer-focus:-translate-y-[140%] peer-focus:bg-gray-200 ml-2 peer-valid:text-[10px]">
                    {placeholder}
                </span>
            </div>
        );
    }
);
GoogleInput.displayName = "Input";

export { GoogleInput };
