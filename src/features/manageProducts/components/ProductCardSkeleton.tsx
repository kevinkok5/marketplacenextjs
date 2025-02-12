import { Skeleton } from "@/components/ui/skeleton";

export function ProductcardSkeleton() {
    return (
        <div className="product-card flex flex-col gap-2">
            <Skeleton className="w-full rounded-sm aspect-square"></Skeleton>
            <Skeleton className="rounded-sm w-[65%] h-[14px]"></Skeleton>
            <Skeleton className="rounded-sm w-[85%] h-[12px]"></Skeleton>
            <Skeleton className="rounded-sm w-[45%] h-[12px]"></Skeleton>
        </div>
    );
}
