import React from "react";
import { getUserStore } from "../lib/actions/store.actions";
import { allStores } from "../lib/utils";
import StoreItems from "./StoreItems";

type Stores = {
    allUserStores: allStores;
};
const AllStore = async () => {
    const stores: Stores = await getUserStore();

    return (
        <div className="flex flex-col gap-2 overflow-y-auto max-h-[80%]">
            {stores.allUserStores?.success && (
                <StoreItems storeEdges={stores.allUserStores.edges} />
            )}
        </div>
    );
};

export default AllStore;
