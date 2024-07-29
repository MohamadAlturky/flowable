import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from 'next/link'
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from 'react'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { loadObjectFromLocalStorage } from "../data/storage";

const onDragStart = (event, nodeType,nodeName) => {
  event.dataTransfer.setData("application/reactflow", nodeType);
  event.dataTransfer.setData("application/reactflow/nodeName", nodeName);
  event.dataTransfer.effectAllowed = "move";
};

export default function DesignPromptsFlowSidebar() {
  const [prompts, setPrompts] = React.useState(loadObjectFromLocalStorage("prompts"))

  return (
    <Tabs defaultValue="components" className="rounded-none">
      <TabsList className="d-flex justify-center w-full rounded-none">
        <TabsTrigger value="components">Components</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent
        value="components"
      >
          <CardHeader>
            <CardTitle>Dragables</CardTitle>
            <CardDescription>
              drag and drop to start modeling.
            </CardDescription>
          </CardHeader>
        <div className="w-10 p-4">

          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>templates</AccordionTrigger>
              <AccordionContent>
              {prompts.map(prompt=>
                 (
                  <Card
                  draggable
                  style={{
                    cursor: "grab",
                    display: "flex",
                    justifyContent: "center",
                    borderRadius: "0px",
                    marginBottom:"10px"
                  }}
                  onDragStart={(event) => onDragStart(event, "tools",prompt.id)}
                >
                  {prompt.id}
                </Card>
                ))}
             
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>load</AccordionTrigger>
              <AccordionContent>
              <Card
              draggable
              style={{
                cursor: "grab",
                display: "flex",
                justifyContent: "center",
                borderRadius: "0px",
              }}
              onDragStart={(event) => onDragStart(event, "tools")}

            >
              old template
            </Card>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

      </TabsContent>
      <TabsContent value="settings">
        <Card className="border-0 rounded-none">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>
              customize your settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
          <Link href="/prompts" target='_blank'>
          <Card
              draggable
              style={{
                cursor: "grab",
                // width: "300px",
                display: "flex",
                justifyContent: "center",
                borderRadius: "0px",
              }}
              onDragStart={(event) => onDragStart(event, "tools")}
            >
              AI Assistant
            </Card>
          </Link>
          </CardContent>
          {/* <CardFooter>
          </CardFooter> */}
        </Card>
      </TabsContent>
    </Tabs>
  );
}
