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


export default function PoolsReportModal({ isOpen, setIsOpen, title, supTitle, report }) {
  const { toast } = useToast()
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
                              {e.lanes && e.lanes.length ?(
                              <div className="flex justify-center">
                                <Carousel className="w-2/3" orientation="vertical">
                                  <CarouselContent className="-mt-1 h-[200px]">
                                    {e.lanes.map(f => (
                                      <>
                                        <CarouselItem>
                                          <Card className="mt-4 rounded-none">
                                            <CardHeader>
                                              <CardTitle>Lane : {f.name}</CardTitle>
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
                              ) :
                              (
                                <div className="flex justify-center">
                                <Carousel className="w-2/3" orientation="vertical">
                                  <CarouselContent className="-mt-1 h-[200px]">
                                      <>
                                        <CarouselItem>
                                          <Card className="mt-4 rounded-none">
                                            <CardHeader>
                                              <CardTitle>No Lanes</CardTitle>
                                              <CardDescription>
                                                there is no lanes detected in this pool.
                                              </CardDescription>
                                            </CardHeader>
                                          </Card>
                                        </CarouselItem>

                                      </>
                                  </CarouselContent>
                                </Carousel>
                              </div>
                              )
                              }
                            </CardContent>
                          </Card>
                        </CarouselItem>

                        {/* {e.inputs.map(f => (
                          <CarouselItem>
                            <Card className="mt-4 rounded-none">
                              <CardHeader>
                                <CardTitle>
                                  {f.name}
                                </CardTitle>
                              </CardHeader>
                              <CardDescription>
                                input for {e.name}
                              </CardDescription>
                              <CardContent className="space-y-2">
                                {f.description}
                              </CardContent>
                            </Card>
                          </CarouselItem>
                        ))}

                        {e.outputs.map(f => (
                          <CarouselItem>
                            <Card className="mt-4 rounded-none">
                              <CardHeader>
                                <CardTitle>
                                  {f.name}
                                </CardTitle>
                              </CardHeader>
                              <CardDescription>
                                output for {e.name}
                              </CardDescription>
                              <CardContent className="space-y-2">
                                {f.description}
                              </CardContent>
                            </Card>
                          </CarouselItem>
                        ))} */}
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
