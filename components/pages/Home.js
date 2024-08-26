"use client"
import ContributionHeatmap from "@/components/pages/ContributionHeatmap"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import React from "react"

import CreateProjectModal from "@/components/modals/CreateProjectModal"

export default function Home() {
    const [createProject, setCreateProject] = React.useState(false)

    return (
        <>
            <div className="grid gap-6">
                <Card x-chunk="dashboard-04-chunk-1">
                    <CardHeader>
                        <CardTitle>Let's Get Started</CardTitle>
                        <CardDescription>
                            You can use our system to generate bpmn digrams with the power of <b>AI</b>.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button
                            style={{
                                backgroundColor: "#3b82f6"
                            }}
                            onClick={() => { setCreateProject(true) }}
                        >
                            Create New Project
                        </Button>
                    </CardContent>
                </Card>

                {/* <Card x-chunk="dashboard-05-chunk-1" className="p-1">
                    <CardHeader>
                        <CardTitle>Welcome To Donut</CardTitle>
                        <CardDescription>
                            You can use our system to generate bpmn digrams with the power of <b>AI</b>.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        Create A New Project And Start Your The Process Management Journey.
                    </CardContent>

                </Card> */}
                        {/* <ContributionHeatmap /> */}
                <CreateProjectModal
                    isOpen={createProject}
                    setIsOpen={setCreateProject}
                />
            </div>

        </>
    )
}