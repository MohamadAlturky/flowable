import * as React from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


export default function GatewaysReportModal({ isOpen, setIsOpen, title, supTitle }) {
  const { toast } = useToast()
  let report = [{"name":"Drag and Drop","type":"you can use the side bar to D&D the items in the flow","inputs":[{"description":"you have to drop the activities in a pool","name":"Be Careful 😱"}],"outputs":[]}]
  console.log(report);

  return (
    <Drawer open={isOpen} onClose={() => {
      setIsOpen(false)
    }}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-5xl">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{supTitle}</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">

            <div className="flex items-center justify-center space-x-2">
              <div className="flex-1">
                <Carousel>
                  <CarouselContent>

                    {report.map(e =>
                      <>
                        <CarouselItem>
                          <Card className="mt-4 rounded-none">
                            <CardHeader>
                              <CardTitle>{e.name}</CardTitle>
                              <CardDescription>
                                {e.type}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              {e.description}
                              <div className="flex justify-center">
                                <Carousel className="w-2/3" orientation="vertical">
                                  <CarouselContent className="-mt-1 h-[200px]">
                                    
                                    {e.inputs.map(f => (
                                      <>
                                        <CarouselItem>
                                          <Card className="mt-4 rounded-none">
                                            <CardHeader>
                                              <CardTitle>
                                                {/* Task : {f.name} &ensp; */}
                                              <span style={{
                                                color:"green"
                                              }}>
                                                {/* (input task) */}
                                                {f.name}
                                              </span>
                                              </CardTitle>
                                              <CardDescription>
                                                {/* type : input for the gateway {e.name} */}
                                              </CardDescription>
                                              <CardDescription>
                                                {f.description}
                                              </CardDescription>
                                            </CardHeader>
                                          </Card>
                                        </CarouselItem>

                                      </>
                                    ))}
                                    {e.outputs.map(f => (
                                      <>
                                        <CarouselItem>
                                          <Card className="mt-4 rounded-none">
                                            <CardHeader>
                                              <CardTitle>Task : {f.name} &ensp; <span style={{
                                                color:"blue"
                                              }}>
                                                (output task)
                                              </span>
                                              </CardTitle>
                                              <CardDescription>
                                                type : output from the gateway {e.name}
                                              </CardDescription>
                                              <CardDescription>
                                                {f.description}
                                              </CardDescription>
                                            </CardHeader>
                                          </Card>
                                        </CarouselItem>

                                      </>
                                    ))}
                                  </CarouselContent>
                                  <CarouselPrevious style={{
                                      position:"absolute",
                                      top:"160px",
                                      left:"280px"
                                    }}/>
                                  <CarouselNext
                                   style={{
                                    position:"absolute",
                                    top:"160px",
                                    left:"330px"
                                  }} />
                                </Carousel>
                              </div>
                            </CardContent>
                          </Card>
                        </CarouselItem>

                      </>
                    )}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                </div>
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button onClick={() => {
              setIsOpen(false)
            }}>Close</Button>
          </DrawerFooter>
          <div className="mt-3 h-[120px]">
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
