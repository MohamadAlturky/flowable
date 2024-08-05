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

import InsertValueModal from "@/components/modals/InsertValueModalNew"

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

                <Card x-chunk="dashboard-05-chunk-1" className="p-1">
                    <CardHeader>
                        <CardTitle>Contibutions</CardTitle>
                        <CardDescription>
                            You can use our system to generate bpmn digrams with the power of <b>AI</b>.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>

                        <ContributionHeatmap />
                    </CardContent>

                </Card>
                <InsertValueModal
                    placeholder={"write here.."}
                    isOpen={createProject}
                    setIsOpen={setCreateProject}
                    label={"Create"}
                    supTitle={"write the name of the new project."}
                    title={"Project Name"}
                    errorMessage={"can't create a project without name"}
                    setValueName={async (v) => {

                    }}
                />
            </div>

        </>
    )
}