"use client"
import Link from 'next/link';
import { BellIcon, CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Switch } from "@/components/ui/switch"
const notifications = [
    {
        title: "ECommerce",
    },
    {
        title: "Online Shop",
    },
]

import React from "react"

export default function Projects() {
    const [createProject, setCreateProject] = React.useState(false)
    const [projects, setProjects] = React.useState([
        {
            id: 1,
            name: "food shop",
            description: "some long text 12389834 098230948023984 23"
        },
        {
            id: 1,
            name: "food shop",
            description: "some long text 12389834 098230948023984 23"
        },
        {
            id: 1,
            name: "food shop",
            description: "some long text 12389834 098230948023984 23"
        }
    ])

    return (
        <>

            <div className="grid gap-6">
                <Card x-chunk="dashboard-04-chunk-1">
                    <CardHeader>
                        <CardTitle>Projects</CardTitle>
                        <CardDescription>
                            this is the projects that you are working on.
                        </CardDescription>
                    </CardHeader>
                </Card>
                <div className="flex justify-between flex-wrap">

                    <Card className={cn("w-full relative")}>

                        <CardHeader>
                            <CardTitle className="underline" style={{
                                color: "blue",
                                cursor: "pointer",
                            }}>

                                <Link href={"/project/1"}>
                                ECommerce for items
                                </Link>
                            </CardTitle>
                            <CardDescription>You have 3 unread messages.You have 3 unread messages.You have 3 unread messages.You have 3 unread messages.You have 3 unread messages.</CardDescription>
                        </CardHeader>

                        {/* <CardContent className="grid gap-4">

                        {notifications.map((notification, index) => (
                                            <div
                                                key={index}
                                                className="grid grid-cols-[25px_1fr] items-start last:mb-0 last:pb-0"
                                            >
                                                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                                                <div className="space-y-1">
                                                    <p className="text-sm font-semibold leading-none">
                                                        {notification.title}
                                                    </p>
                                                </div>
                                            </div>
                                    ))}


                        </CardContent> */}
                    </Card>
                    <Pagination className={"mt-3"}>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#" />
                            </PaginationItem>
                           
                            <PaginationItem>
                                <PaginationNext href="#" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>

        </>
    )
}