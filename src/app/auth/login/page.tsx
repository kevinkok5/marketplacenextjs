"use client";

import LoginLogoutPopUp from "@/layouts/LoginLogoutDialog";
import { AuthType } from "@/lib/utils";
import React, { useState } from "react";

const page = () => {
    const [open, setOpen] = useState(true);
    return (
        <LoginLogoutPopUp
            type={AuthType.SignIn}
            open={open}
            onOpenChange={setOpen}
        />
    );
};

export default page;
