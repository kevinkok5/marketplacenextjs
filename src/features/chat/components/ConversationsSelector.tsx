import React from "react";

import { allStores } from "@/features/manageStore/lib/utils";
import { getUserStore } from "@/features/manageStore/lib/actions/store.actions";
import ConversationsSelectorDialog from "./ConversationsSelectorDialog";
import { User } from "@/features/user/lib/utils";

type Stores = {
    allUserStores: allStores;
};

type ConversationsSelectorProps = {
    user: User;
};

const ConversationsSelector = async ({ user }: ConversationsSelectorProps) => {
    const stores: Stores = await getUserStore();

    return (
        <div className="w-full py-6 border-b border-solid border-neutral-600">
            <ConversationsSelectorDialog
                user={user}
                stores={stores.allUserStores}
            />
        </div>
    );
};

export default ConversationsSelector;
