import Sidebar from "@/features/manageProducts/create/layouts/Sidebar";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const page = () => {
    redirect("/manage/me/listings");
};

export default page;
