"use client";

import LoginLogoutPopUp from "@/layouts/LoginLogoutDialog";
import { AuthType } from "@/lib/utils";
import React, { useState } from "react";

const Page = () => {
    const [open, setOpen] = useState(true);
    return (
        <LoginLogoutPopUp
            type={AuthType.SignUp}
            open={open}
            onOpenChange={setOpen}
        />
    );
};

export default Page;
