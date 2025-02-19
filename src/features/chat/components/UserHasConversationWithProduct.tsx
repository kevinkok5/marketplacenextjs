import React from "react";
import { getHasConversation } from "../lib/chat.actions";
import CheckAvailability from "./CheckAvailability";

const UserHasConversationWithProduct = async ({
    productId,
}: {
    productId: string;
}) => {
    const hasConversation = await getHasConversation(productId);
    console.log(hasConversation);

    return hasConversation?.errors || !hasConversation?.data?.exists ? (
        <CheckAvailability conversationId={25} />
    ) : (
        <></>
    );
};

export default UserHasConversationWithProduct;
