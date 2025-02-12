import React from "react";
import { LinearChart } from "@/components/LinearChart";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardDescription, CardTitle } from "@/components/ui/card";

import {
    Bookmark,
    Eye,
    MessageSquareMore,
    TrendingDown,
    TrendingUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const page = () => {
    return (
        <section className="w-full min-h-full columns-3 gap-4 overflow-x-auto px-8 py-12">
            <div className="break-inside-avoid gap-8 flex flex-col mb-4 border px-4 py-6 bg-neutral-950 border-neutral-800 h-fit min-w-[18rem] max-w-full rounded-2xl">
                <CardTitle>Latest Product Performance</CardTitle>
                <LinearChart />
                <div>
                    <h3 className="text-lg font-semibold">Last messages</h3>
                    <CardDescription className="pb-4">
                        In the past 7 days
                    </CardDescription>
                    <ul className="flex flex-col gap-4">
                        <li className="w-full grid gap-3 grid-flow-col">
                            <div className="flex gap-3">
                                <div className="w-14 h-10">
                                    <Image
                                        width={60}
                                        height={60}
                                        src="https://github.com/shadcn.png"
                                        alt="@shadcn"
                                        className="w-full h-full object-cover rounded-sm"
                                    />
                                </div>

                                <div>
                                    <p className="truncate w-[70%] pb-1 capitalize text-sm">
                                        Title falksdjf alksjfd alsdkjf alskdjf
                                        asldfkjasldkfj aslfd
                                    </p>
                                    <ul className="flex justify-between w-[55%]">
                                        <li className="flex items-center gap-1 text-xs">
                                            <MessageSquareMore className="w-4 h-4" />
                                            <span>7</span>
                                        </li>
                                        <li className="flex items-center gap-2 text-xs">
                                            <Eye className="w-4 h-4" />
                                            <span>90</span>
                                        </li>
                                        <li className="flex items-center gap-2 text-xs">
                                            <Bookmark className="w-4 h-4" />
                                            <span>90</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li className="w-full grid gap-3 grid-flow-col">
                            <div className="flex gap-3">
                                <div className="w-14 h-10">
                                    <Image
                                        width={60}
                                        height={60}
                                        src="https://github.com/shadcn.png"
                                        alt="@shadcn"
                                        className="w-full h-full object-cover rounded-sm"
                                    />
                                </div>

                                <div>
                                    <p className="truncate w-[70%] pb-1 capitalize text-sm">
                                        Title falksdjf alksjfd alsdkjf alskdjf
                                        asldfkjasldkfj aslfd
                                    </p>
                                    <ul className="flex justify-between w-[55%]">
                                        <li className="flex items-center gap-1 text-xs">
                                            <MessageSquareMore className="w-4 h-4" />
                                            <span>7</span>
                                        </li>
                                        <li className="flex items-center gap-2 text-xs">
                                            <Eye className="w-4 h-4" />
                                            <span>90</span>
                                        </li>
                                        <li className="flex items-center gap-2 text-xs">
                                            <Bookmark className="w-4 h-4" />
                                            <span>90</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li className="w-full grid gap-3 grid-flow-col">
                            <div className="flex gap-3">
                                <div className="w-14 h-10">
                                    <Image
                                        width={60}
                                        height={60}
                                        src="https://github.com/shadcn.png"
                                        alt="@shadcn"
                                        className="w-full h-full object-cover rounded-sm"
                                    />
                                </div>

                                <div>
                                    <p className="truncate w-[70%] pb-1 capitalize text-sm">
                                        Title falksdjf alksjfd alsdkjf alskdjf
                                        asldfkjasldkfj aslfd
                                    </p>
                                    <ul className="flex justify-between w-[55%]">
                                        <li className="flex items-center gap-1 text-xs">
                                            <MessageSquareMore className="w-4 h-4" />
                                            <span>7</span>
                                        </li>
                                        <li className="flex items-center gap-2 text-xs">
                                            <Eye className="w-4 h-4" />
                                            <span>90</span>
                                        </li>
                                        <li className="flex items-center gap-2 text-xs">
                                            <Bookmark className="w-4 h-4" />
                                            <span>90</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <Link href="#">
                        <div className="font-semibold hover:underline pt-8 pb-6 mx-auto text-center">
                            View More...
                        </div>
                    </Link>
                </div>
            </div>
            <div className="break-inside-avoid flex flex-col mb-4 gap-8 border px-4 py-6 bg-neutral-950 border-neutral-800 h-fit  min-w-[18rem] max-w-full rounded-2xl">
                <CardTitle>Shop Analytics</CardTitle>

                <div className="flex gap-2 flex-col">
                    <h4 className="text-base font-semibold">
                        Current Followers
                    </h4>
                    <h1 className="text-3xl">6,350</h1>
                    <p className="text-sm">+623 in last 30 days</p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold">Summary</h3>
                    <CardDescription className="pb-4">
                        Last 30 days
                    </CardDescription>
                    <ul className="flex flex-col gap-2">
                        <li className="flex justify-between">
                            <p>Total Views</p>
                            <p className="flex gap-2 items-center">
                                <span>4.2K</span>{" "}
                                <TrendingUp className="h-3 w-3" />
                            </p>
                        </li>
                        <li className="flex justify-between">
                            <p>Total Appearances</p>
                            <p className="flex gap-2 items-center">
                                <span>38.2K</span>{" "}
                                <TrendingDown className="h-3 w-3" />
                            </p>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-base font-semibold">Top Product</h4>
                    <CardDescription className="pb-4">
                        Last 7 days - views
                    </CardDescription>
                    <ul className="flex flex-col gap-2">
                        <li className="flex gap-2 justify-between">
                            <p className="truncate ">Porduct title</p>
                            <span>500</span>
                        </li>
                        <li className="flex gap-2 justify-between">
                            <p className="truncate ">Porduct title</p>
                            <span>500</span>
                        </li>
                        <li className="flex gap-2 justify-between">
                            <p className="truncate ">Porduct title</p>
                            <span>500</span>
                        </li>
                        <li className="flex gap-2 justify-between">
                            <p className="truncate ">Porduct title</p>
                            <span>500</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="break-inside-avoid border mb-4 p-4 bg-neutral-950 border-neutral-800 h-fit  min-w-[18rem] max-w-full rounded-2xl">
                <CardTitle>Lastest News</CardTitle>
                <CardTitle>Lastest News</CardTitle>
                <CardTitle>Lastest News</CardTitle>
            </div>
            <div className="break-inside-avoid border mb-4 p-4 bg-neutral-950 border-neutral-800 h-fit  min-w-[18rem] max-w-full rounded-2xl">
                <CardTitle className="pb-2">Recent Followers</CardTitle>
                <CardDescription className="pb-4">Last 90 days</CardDescription>

                <ul className="flex flex-col gap-3">
                    <li className="flex gap-3">
                        <Avatar className="w-8 h-8">
                            <AvatarImage
                                src="https://github.com/shadcn.png"
                                alt="@shadcn"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                        <div className="max-w-[80%]">
                            <p className="truncate max-w-full font-semibold capitalize text-[13px]">
                                jflaksjfd alksjfd;lakjsfd lksajfdl; ksajfd
                                alksjfd
                            </p>
                            <p className="text-xs text-neutral-400">
                                4 days ago{" "}
                            </p>
                        </div>
                    </li>
                    <li className="flex gap-3">
                        <Avatar className="w-8 h-8">
                            <AvatarImage
                                src="https://github.com/shadcn.png"
                                alt="@shadcn"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                        <div className="max-w-[80%]">
                            <p className="truncate max-w-full font-semibold capitalize text-[13px]">
                                jflaksjfd alksjfd;lakjsfd lksajfdl; ksajfd
                                alksjfd
                            </p>
                            <p className="text-xs text-neutral-400">
                                4 days ago{" "}
                            </p>
                        </div>
                    </li>
                    <li className="flex gap-3">
                        <Avatar className="w-8 h-8">
                            <AvatarImage
                                src="https://github.com/shadcn.png"
                                alt="@shadcn"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                        <div className="max-w-[80%]">
                            <p className="truncate max-w-full font-semibold capitalize text-[13px]">
                                jflaksjfd alksjfd;lakjsfd lksajfdl; ksajfd
                                alksjfd
                            </p>
                            <p className="text-xs text-neutral-400">
                                4 days ago{" "}
                            </p>
                        </div>
                    </li>
                    <li className="flex gap-3">
                        <Avatar className="w-8 h-8">
                            <AvatarImage
                                src="https://github.com/shadcn.png"
                                alt="@shadcn"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                        <div className="max-w-[80%]">
                            <p className="truncate max-w-full font-semibold capitalize text-[13px]">
                                jflaksjfd alksjfd;lakjsfd lksajfdl; ksajfd
                                alksjfd
                            </p>
                            <p className="text-xs text-neutral-400">
                                4 days ago{" "}
                            </p>
                        </div>
                    </li>
                </ul>

                <Link href="#">
                    <div className="font-semibold hover:underline pt-8 pb-6 mx-auto text-center">
                        View More...
                    </div>
                </Link>
            </div>
            <div className="break-inside-avoid border mb-4 p-4 bg-neutral-950 border-neutral-800 h-fit  min-w-[18rem] max-w-full rounded-2xl">
                <CardTitle className="pb-2"> Last messages</CardTitle>

                <CardDescription className="pb-4">
                    In the past 7 days
                </CardDescription>
                <ul className="flex flex-col gap-3">
                    <li className="w-full grid gap-3 grid-flow-col">
                        <div className="flex gap-3">
                            <Avatar className="w-8 h-8">
                                <AvatarImage
                                    src="https://github.com/shadcn.png"
                                    alt="@shadcn"
                                />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>

                            <div>
                                <p className="flex gap-3 items-center text-[13px]">
                                    <span className="truncate max-w-16">
                                        Name
                                    </span>{" "}
                                    <span>11h ago</span>{" "}
                                </p>
                                <p className="line-clamp-2 text-xs text-neutral-400">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Quam aliquid incidunt,
                                    nisi facere facilis optio voluptas
                                    doloremque quo maiores praesentium eius
                                    porro nihil cupiditate suscipit atque libero
                                    quis unde quaerat.
                                </p>
                            </div>
                        </div>

                        <div className="w-10 h-10 justify-self-end">
                            <Image
                                width={60}
                                height={60}
                                src="https://github.com/shadcn.png"
                                alt="@shadcn"
                            />
                        </div>
                    </li>
                    <li className="w-full grid gap-3 grid-flow-col">
                        <div className="flex gap-3">
                            <Avatar className="w-8 h-8">
                                <AvatarImage
                                    src="https://github.com/shadcn.png"
                                    alt="@shadcn"
                                />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>

                            <div>
                                <p className="flex gap-3 items-center text-[13px]">
                                    <span className="truncate max-w-16">
                                        Name
                                    </span>{" "}
                                    <span>11h ago</span>{" "}
                                </p>
                                <p className="line-clamp-2 text-xs text-neutral-400">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Quam aliquid incidunt,
                                    nisi facere facilis optio voluptas
                                    doloremque quo maiores praesentium eius
                                    porro nihil cupiditate suscipit atque libero
                                    quis unde quaerat.
                                </p>
                            </div>
                        </div>

                        <div className="w-10 h-10 justify-self-end">
                            <Image
                                width={60}
                                height={60}
                                src="https://github.com/shadcn.png"
                                alt="@shadcn"
                            />
                        </div>
                    </li>
                    <li className="w-full grid gap-3 grid-flow-col">
                        <div className="flex gap-3">
                            <Avatar className="w-8 h-8">
                                <AvatarImage
                                    src="https://github.com/shadcn.png"
                                    alt="@shadcn"
                                />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>

                            <div>
                                <p className="flex gap-3 items-center text-[13px]">
                                    <span className="truncate max-w-16">
                                        Name
                                    </span>{" "}
                                    <span>11h ago</span>{" "}
                                </p>
                                <p className="line-clamp-2 text-xs text-neutral-400">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Quam aliquid incidunt,
                                    nisi facere facilis optio voluptas
                                    doloremque quo maiores praesentium eius
                                    porro nihil cupiditate suscipit atque libero
                                    quis unde quaerat.
                                </p>
                            </div>
                        </div>

                        <div className="w-10 h-10 justify-self-end">
                            <Image
                                width={60}
                                height={60}
                                src="https://github.com/shadcn.png"
                                alt="@shadcn"
                            />
                        </div>
                    </li>
                </ul>

                <Link href="#">
                    <div className="font-semibold hover:underline pt-8 pb-6 mx-auto text-center">
                        View More...
                    </div>
                </Link>
            </div>
        </section>
    );
};

export default page;
