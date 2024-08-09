"use client"
import Link from 'next/link';
import { cn } from "@/lib/utils"
import { axiosInstance } from "../../contexts/api"
import { getAuthTokens } from "../../services/auth/AuthServices"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Skeleton } from "@/components/ui/skeleton"

import Swal from 'sweetalert2'
import React from "react"

export default function Invitations() {
    const [loading, setLoading] = React.useState(true); 

    const handleGet = async () => {
        const data = {
            "filter":
            {
                "paginatedRequest": {
                    "pageNumber": 1,
                    "pageSize": 8,
                },
                "IncludeContributionMembers": true,
                "IncludeProjectType": true
            }
        };
        console.log(data);

        try {
            let token = getAuthTokens().accessToken

            const response = await axiosInstance.post('/api/projects/filter', data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            setProjects(response.data)
            console.log('Response:', response.data);
        } catch (error) {
            if (error.response && error.response.status != 401) {

                Swal.fire({
                    icon: "error",
                    title: "Failed to load the projects!",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                })
            }

            console.error('Error loading project:', error);
        }finally {
            setLoading(false);
        }
    };
    const [projects, setProjects] = React.useState(null)
    React.useEffect(() => {
        handleGet()
    }, [])
    return (
        <>

        {loading ? (
               <div className="flex flex-col space-y-3 bg-transparent">
               <Skeleton className="h-[85px] mb-4 w-full rounded-xl  bg-blue-200" />
               <Skeleton className="h-[90px] w-full rounded-xl  bg-blue-200" />
               <Skeleton className="h-[90px] w-full rounded-xl  bg-blue-200" />
               <Skeleton className="h-[90px] w-full rounded-xl  bg-blue-200" />
               <Skeleton className="h-[90px] w-full rounded-xl  bg-blue-200" />
               <Skeleton className="h-[90px] w-full rounded-xl  bg-blue-200" />
               <Skeleton className="h-[90px] w-full rounded-xl  bg-blue-200" />
               </div>
            ) : (

            projects ? <>
                <div className="grid gap-6">
                    <Card x-chunk="dashboard-04-chunk-1">
                        <CardHeader>
                            <CardTitle>Invitations</CardTitle>
                            <CardDescription>
                                this is the Invitations that you are involved in..
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <div className="flex justify-between flex-wrap">
                        {(projects.items.length != 0) ? (

                            <>{projects.items.map(e => {
                                return (

                                    <Card key={e.id} className={cn("w-full relative mb-3")}>

                                        <CardHeader>
                                            <CardTitle className="underline relative" style={{
                                                color: "blue",
                                            }}>
                                                <div className='absolute'
                                                    style={{
                                                        right: "10px",
                                                        // top: "10px",
                                                        border: "1px solid #d0d7de",
                                                        color: "#636c76",
                                                        padding: "3px",
                                                        borderRadius: "7px",
                                                        fontSize: "13px"

                                                    }}>
                                                    {e.contributionMembers[0].contributionTypeNavigation.name}
                                                    {/* {e.projectTypeName} */}

                                                </div>
                                                <div className='absolute'
                                                    style={{
                                                        left: "0px",
                                                        top: "-1px",
                                                        border: "1px solid #d0d7de",
                                                        color: "#636c76",
                                                        padding: "3px",
                                                        borderRadius: "7px",
                                                        fontSize: "13px"

                                                    }}>
                                                    {/* {e.contributionTypeName} */}
                                                    {e.projectTypeNavigation.name}

                                                </div>
                                                <Link href={`/project/${e.id}`} className='relative ms-14 cursor-pointer'>
                                                    {e.name}
                                                </Link>
                                            </CardTitle>
                                            <CardDescription>{e.description}</CardDescription>
                                        </CardHeader>

                                    </Card>


                                )
                            })}
                                < Pagination className={"mt-3"}>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious href="#" />
                                        </PaginationItem>

                                        <PaginationItem>
                                            <PaginationNext href="#" />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </>)
                            :
                            <>
                                <Card className={cn("w-full relative mb-3")}>

                                    <CardHeader>
                                        <CardTitle className="" style={{
                                            color: "blue",
                                            cursor: "pointer",
                                        }}>
                                            You Have No Project Created
                                        </CardTitle>
                                        {/* <CardDescription>{e.description}</CardDescription> */}
                                    </CardHeader>

                                </Card>

                            </>
                        }
                    </div>
                </div >

            </> : <></>
        )}

        </>
    )
}