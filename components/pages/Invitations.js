"use client"
import Link from 'next/link';
import { cn } from "@/lib/utils"
import { axiosInstance } from "../../contexts/api"
import { getAuthTokens } from "../../services/auth/AuthServices"
import { Label } from "../../components/ui/label"
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
                "IncludeInvitationStatus": true,
                "IncludeProject": true
            }
        };
        console.log(data);

        try {
            let token = getAuthTokens().accessToken

            const response = await axiosInstance.post('/api/invitations/filter', data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            setInvitations(response.data)
            console.log('Response:', response.data);
        } catch (error) {
            if (error.response && error.response.status != 401) {

                Swal.fire({
                    icon: "error",
                    title: "Failed to load the invitations!",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                })
            }

            console.error('Error loading project:', error);
        } finally {
            setLoading(false);
        }
    };
    const [invitations, setInvitations] = React.useState(null)
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

                invitations ? <>
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
                            {(invitations.items.length != 0) ? (

                                <>{invitations.items.map(e => {
                                    return (

                                        <Card key={e.id} className={cn("w-full relative mb-3")}>

                                            <CardHeader>
                                                <CardTitle className="relative" style={{
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
                                                        {/* {e.projectNavigation[0].contributionTypeNavigation.name} */}
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
                                                        {e.projectNavigation.projectTypeNavigation.name}

                                                    </div>
                                                    {/* <span className='relative ms-14' style={{
                                                        color: "#636c76",
                                                    }}>for project </span> */}
                                                    <Link href={`/project/${e.id}`} className='relative ms-14 cursor-pointer'>
                                                        {e.projectNavigation.name}
                                                    </Link>
                                                </CardTitle>
                                                <div className='mt-7 mb-1' style={{ height: "10px" }}></div>
                                                <Label >message</Label>
                                                <CardDescription>{e.message}</CardDescription>
                                                <div className='mt-7 mb-1' style={{ height: "10px" }}></div>
                                                <Label >user</Label>
                                                <div className='' style={{ height: "1px" }}></div>
                                                <div
                                                    className="grid grid-cols-[25px_1fr] items-start last:mb-0 last:pb-0">
                                                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                                                    <div className="space-y-1">
                                                        <p className="text-sm font-semibold leading-none">
                                                            {e.contributor}
                                                        </p>
                                                    </div>
                                                </div>
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
                                                You Have No Invitations
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