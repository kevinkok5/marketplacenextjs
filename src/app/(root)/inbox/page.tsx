import ChatSidebar from "@/features/chat/layouts/ChatSidebar";
import { MessageCircleMore } from "lucide-react";
import { Suspense } from "react";

const Page = async () => {
    return (
        <>
            <Suspense>
                <ChatSidebar className="md:hidden sm:w-full" />
            </Suspense>
            <div className="w-full flex-grow flex flex-col gap-6 justify-center items-center max-sm:hidden">
                <MessageCircleMore size={50} />
                <div className="text-center max-w-96">
                    <h1 className="font-bold text-3xl mb-1">
                        Select a conversation
                    </h1>
                    <p className="text-base">
                        Pick one from your existing conversations or go and find
                        a product to start one.
                    </p>
                </div>
            </div>
        </>
    );
};

export default Page;
