import Link from 'next/link'
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
const onDragStart = (event, nodeType) => {
  event.dataTransfer.setData("application/reactflow", nodeType);
  event.dataTransfer.effectAllowed = "move";
};

export default function MainSidebar() {
  return (
    <Tabs defaultValue="components" className="rounded-none">
      <TabsList className="d-flex justify-center w-full rounded-none">
        <TabsTrigger value="components">Components</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent
        value="components"
      >
        <Card className="border-0 rounded-none">
          <CardHeader>
            <CardTitle>Dragables</CardTitle>
            <CardDescription>
              drag and drop to start modeling.
            </CardDescription>
          </CardHeader>
          <CardContent className="">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Participants</AccordionTrigger>
                <AccordionContent>
                  <div
                  // className='flex justify-center'
                  >
                    <Image
                      draggable
                      onDragStart={(event) => onDragStart(event, "pool")}
                      src="/bpmn/participant.png" // Path to your image
                      alt="A description of the image"
                      width={120} // Desired width
                      height={80} // Desired height
                      style={{
                        cursor: "grab",
                      }}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Events</AccordionTrigger>
                <AccordionContent>
                  <div
                  // className='flex justify-center'
                  >

                    <Image
                      draggable
                      onDragStart={(event) => onDragStart(event, "pool")}
                      src="/bpmn/start-event.png" // Path to your image
                      alt="A description of the image"
                      width={120} // Desired width
                      height={80} // Desired height
                      style={{
                        cursor: "grab"
                      }}
                    />
                  </div>

                </AccordionContent>
                <AccordionContent>
                  <div
                  // className='flex justify-center'
                  >

                    <Image
                      draggable
                      onDragStart={(event) => onDragStart(event, "pool")}
                      src="/bpmn/intermediate-event.png" // Path to your image
                      alt="A description of the image"
                      width={120} // Desired width
                      height={80} // Desired height
                      style={{
                        cursor: "grab"
                      }}
                    />
                  </div>

                </AccordionContent>
                <AccordionContent>
                  <div
                  // className='flex justify-center'
                  >

                    <Image
                      draggable
                      onDragStart={(event) => onDragStart(event, "pool")}
                      src="/bpmn/end-event.png" // Path to your image
                      alt="A description of the image"
                      width={120} // Desired width
                      height={80} // Desired height
                      style={{
                        cursor: "grab"
                      }}
                    />
                  </div>

                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Gateways</AccordionTrigger>
                <AccordionContent>
                  <div
                  // className='flex justify-center'
                  >

                    <Image
                      draggable
                      onDragStart={(event) => onDragStart(event, "pool")}
                      src="/bpmn/gateway-or.png" // Path to your image
                      alt="A description of the image"
                      width={120} // Desired width
                      height={80} // Desired height
                      style={{
                        cursor: "grab"
                      }}
                    />
                  </div>
                </AccordionContent>
                <AccordionContent>
                  <div
                  // className='flex justify-center'
                  >

                    <Image
                      draggable
                      onDragStart={(event) => onDragStart(event, "pool")}
                      src="/bpmn/gateway-parallel.png" // Path to your image
                      alt="A description of the image"
                      width={120} // Desired width
                      height={80} // Desired height
                      style={{
                        cursor: "grab"
                      }}
                    />
                  </div>
                </AccordionContent>
                <AccordionContent>
                  <div
                  // className='flex justify-center'
                  >

                    <Image
                      draggable
                      onDragStart={(event) => onDragStart(event, "pool")}
                      src="/bpmn/gateway-xor.png" // Path to your image
                      alt="A description of the image"
                      width={120} // Desired width
                      height={80} // Desired height
                      style={{
                        cursor: "grab"
                      }}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              
              <AccordionItem value="item-4">
                <AccordionTrigger>Tasks</AccordionTrigger>
                <AccordionContent>
                  <div
                  // className='flex justify-center'
                  >

                    <Image
                      draggable
                      onDragStart={(event) => onDragStart(event, "pool")}
                      src="/bpmn/user-task.png" // Path to your image
                      alt="A description of the image"
                      width={120} // Desired width
                      height={80} // Desired height
                      style={{
                        cursor: "grab"
                      }}
                    />
                  </div>
                </AccordionContent>
                <AccordionContent>
                  <div
                  // className='flex justify-center'
                  >

                    <Image
                      draggable
                      onDragStart={(event) => onDragStart(event, "pool")}
                      src="/bpmn/service-task.png" 
                      alt="A description of the image"
                      width={120} 
                      height={80} 
                      style={{
                        cursor: "grab"
                      }}
                    />
                  </div>
                </AccordionContent>
                <AccordionContent>
                  <div
                  // className='flex justify-center'
                  >

                    <Image
                      draggable
                      onDragStart={(event) => onDragStart(event, "pool")}
                      src="/bpmn/manual-task.png" 
                      alt="A description of the image"
                      width={120} 
                      height={80} 
                      style={{
                        cursor: "grab"
                      }}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
          </CardContent>
        </Card>
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
                  display: "flex",
                  justifyContent: "center",
                  borderRadius: "0px",
                }}
                onDragStart={(event) => onDragStart(event, "pool")}
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
