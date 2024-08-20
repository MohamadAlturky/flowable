"use client"
import { axiosInstance } from "../../contexts/api"
import Swal from 'sweetalert2'
import { getAuthTokens } from "../../services/auth/AuthServices"
import { cn } from "@/lib/utils"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"


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
import InviteContributorModal from '../modals/InviteContributorModal'
import React from "react"
import { Skeleton } from "@/components/ui/skeleton"
export default function Project({ id }) {
    const [projectsMap, setProjectsMap] = React.useState(false)
    const [project, setProject] = React.useState(null)
    const [loading, setLoading] = React.useState(true);
    const [createInvitaion, setCreateInvitaion] = React.useState(false);

    const handleGet = async () => {

        const data = {
            "filter":
            {
                "paginatedRequest": {
                    "pageNumber": 1,
                    "pageSize": 8,
                },
                "id": id,
                "count": 1,
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

            setProject(response.data.items[0])
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
            if (error.response && error.response.status === 401) {

                const Toast = Swal.mixin({
                  toast: true,
                  position: "top-end",
                  width: "450px",
                  showConfirmButton: false,
                  timer: 1500,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                  },
                });
                Toast.fire({
                  icon: "error",
                  title: "session expired please login",
                });
                setTimeout(() => {
                  if (typeof window !== 'undefined') {
                    window.location.href = '/auth/login';
                  }
                }, 1300)
      
              }
            console.error('Error loading project:', error);
        } finally {
            setLoading(false);
        }
    };
    React.useEffect(() => {
        handleGet()
    }, [])

    return (

        <>
            {loading ? (
                <div className="flex flex-col space-y-3 bg-transparent">
                    <Skeleton className="h-[150px] w-full rounded-xl  bg-blue-200" />
                    <div className="space-y-4">
                        <Skeleton className="h-[160px] w-full rounded-xl  bg-blue-200" />
                    </div>
                </div>
            ) : (
                project && (

                    <div className="grid w-full">

                        <div className="flex justify-between flex-wrap">

                            <Card className={cn("w-full relative z-0")}>

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
                                            {project.contributionMembers[0].contributionTypeNavigation.name}
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
                                            {project.projectTypeNavigation.name}

                                        </div>
                                        <div className='relative ms-14 cursor-pointer'>{project.name}</div>
                                    </CardTitle>
                                    <CardDescription>{project.description}</CardDescription>
                                </CardHeader>

                                {/* <CardContent className="grid gap-4">

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
                        </CardContent> */}
                                <CardFooter>
                                    <Button onClick={() => { setProjectsMap(true) }}>Show History</Button>
                                </CardFooter>
                            </Card>



                            <VisualizationModal isOpen={projectsMap} setIsOpen={setProjectsMap} children={
                                <Card className={cn("w-full rounded-none")} style={{
                                    height: "700px"
                                }}>
                                    <ProjectVisualization id={id} />
                                </Card>
                            }
                                title={"d"}
                                supTitle={"d"} />



                            <Card className={cn("w-full  mt-3 z-0")}>
                                <CardHeader>
                                    <CardTitle
                                        className='relative'
                                        style={{
                                            color: "blue",
                                        }}>Contributors
                                    </CardTitle>

                                </CardHeader>
                                <CardContent className="grid gap-4">

                                    {project.contributionMembers.map((member, index) => (
                                        <div
                                            key={index}
                                            className="grid grid-cols-[25px_1fr] items-start last:mb-0 last:pb-0">
                                            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                                            <div className="space-y-1">
                                                <p className="text-sm font-semibold leading-none">
                                                    {member.contributorInfo.userName}
                                                </p>
                                            </div>
                                        </div>
                                    ))}

                                </CardContent>
                                <CardFooter>
                                    <Button onClick={() => { setCreateInvitaion(true) }}>Invite Contributor</Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                )
            )}
            <InviteContributorModal
                project={id}
                isOpen={createInvitaion}
                setIsOpen={setCreateInvitaion} />
        </>
    )
}