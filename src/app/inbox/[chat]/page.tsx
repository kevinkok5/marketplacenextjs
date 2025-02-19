import Chat from "@/features/chat/layouts/Chat";
import { getConversationMessages } from "@/features/chat/lib/chat.actions";
import { MessageCircleMore } from "lucide-react";

const Page = async ({ params }: { params: { chat: string } }) => {
    const { chat: chatId } = params;

    const data = await getConversationMessages(chatId);

    // if (data.errors) return <div>Error</div>;

    return data?.errors ? (
        <div className="w-full flex-grow flex flex-col gap-6 justify-center items-center">
            <MessageCircleMore size={50} />
            <div className="text-center max-w-96">
                <h1 className="font-bold text-3xl mb-1">
                    Select a conversation
                </h1>
                <p className="text-base">
                    Pick one from your existing conversations or go and find a
                    product to start one.
                </p>
            </div>
        </div>
    ) : (
        <Chat chat={data.data} />
    );
};

export default Page;
