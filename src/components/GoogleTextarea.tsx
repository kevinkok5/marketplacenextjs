import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextereaProps extends React.ComponentProps<"textarea"> {
    label: string;
}

const GoogleTextarea = React.forwardRef<HTMLTextAreaElement, TextereaProps>(
    ({ className, label, ...props }, ref) => {
        return (
            <div className="relative">
                <textarea
                    className={cn(
                        "min-h-[80px] outline-none duration-200 peer flex h-8 w-full rounded-md border border-neutral-100 bg-white px-3 py-1 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-[0.5px] focus-visible:ring-neutral-950 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-sky-600  [&:not(:placeholder-shown)~span]:-translate-y-[90%]",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                <span className="absolute left-0 top-[5%] -translate-y-[5%] px-1 text-inherit tracking-wide peer-focus:text-indigo-600 pointer-events-none duration-200 peer-focus:text-[10px] peer-focus:-translate-y-[90%] peer-focus:bg-gray-200 ml-2 peer-valid:text-[10px]">
                    {label}
                </span>
            </div>
        );
    }
);
GoogleTextarea.displayName = "Textarea";

export { GoogleTextarea };
