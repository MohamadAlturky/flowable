"use client"
import { cn } from "@/lib/utils"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import{Button} from "@/components/ui/button"


import VisualizationModal from '../visualization/VisualizationModal'
import ProjectVisualization from '../visualization/ProjectVisualization';
const notifications = [
    {
        title: "ECommerce",
    },
    {
        title: "Online Shop",
    },
]

const contributors = [
    {
        title: "Mohamad@alturky",
    },
    {
        title: "Haitham",
    },
]

import React from "react"

export default function Project({ id }) {
    const [projectsMap, setProjectsMap] = React.useState(false)
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

            <div className="grid w-full">

                <div className="flex justify-between flex-wrap">

                    <Card className={cn("w-full relative z-0")}>

                        <CardHeader>
                            <CardTitle className="" style={{
                                color: "blue",
                            }}>ECommerce for items</CardTitle>
                            <CardDescription>You have 3 unread messages.You have 3 unread messages.You have 3 unread messages.You have 3 unread messages.You have 3 unread messages.</CardDescription>
                        </CardHeader>

                        <CardContent className="grid gap-4">

                            {notifications.map((notification, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-[25px_1fr] items-start last:mb-0 last:pb-0">
                                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                                    <div className="space-y-1">
                                        <p className="text-sm font-semibold leading-none">
                                            {notification.title}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter>
                            <Button onClick={()=>{setProjectsMap(true)}}>Show History</Button>
                        </CardFooter>
                    </Card>



                    <VisualizationModal isOpen={projectsMap} setIsOpen={setProjectsMap} children={
                        <Card className={cn("w-full rounded-none")} style={{
                            height: "700px"
                        }}>
                            <ProjectVisualization />
                        </Card>
                    }
                        title={"d"}
                        supTitle={"d"} />



                    <Card className={cn("w-full relative mt-3 z-0")}>
                        <CardHeader>
                            <CardTitle
                                style={{
                                    color: "blue",
                                }}>Contributors</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">

                            {contributors.map((notification, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-[25px_1fr] items-start last:mb-0 last:pb-0">
                                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                                    <div className="space-y-1">
                                        <p className="text-sm font-semibold leading-none">
                                            {notification.title}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>

        </>
    )
}