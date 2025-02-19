import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";

type CollapsibleSidebarListItems = {
    icon: React.ReactElement;
    label: string;
    children?: React.ReactNode;
    defaultValue?: string;
    value?: string;
};

const CollapsibleSidebarListItems: React.FC<CollapsibleSidebarListItems> = ({
    children,
    icon,
    label,
    defaultValue,
    value = "item-1",
}) => {
    return (
        <Accordion
            type="single"
            defaultValue={defaultValue}
            collapsible
            className="w-full"
        >
            <AccordionItem value={value} className="border-none">
                <AccordionTrigger className="flex px-3 py-3 gap-2 text-sm hover:no-underline rounded-sm items-center transition duration-200 ease-out  hover:bg-input font-light">
                    <div className="flex gap-2 items-center">
                        {icon}
                        {label}
                    </div>
                    <ChevronDown className="h-4 w-4  shrink-0 transition-transform duration-200" />
                </AccordionTrigger>
                <AccordionContent>{children}</AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default CollapsibleSidebarListItems;
