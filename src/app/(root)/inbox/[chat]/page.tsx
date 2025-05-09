import Chat from "@/features/chat/layouts/Chat";
import { getUser } from "@/features/user/lib/actions/user.actions";
import { getAccessToken } from "@/lib/manageToken";
import { cookies } from "next/headers";

const Page = async (props: { params: Promise<{ chat: string }> }) => {
    const params = await props.params;
    const { chat } = params;
    const chatId: string = decodeURIComponent(chat);
    const user = await getUser();
    const forAId = (await cookies()).get("forAId")?.value || user?.id;
    const token = await getAccessToken();

    // if (data.errors) return <div>Error</div>;

    return <Chat chatId={chatId} forAId={forAId} token={token} />;
};

export default Page;
