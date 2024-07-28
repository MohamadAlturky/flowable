"use client"
import Link from "next/link"
import { CircleUser, Menu, Package2, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { extractInputs,hasSpace,oneHasSpace } from '../../services/parser/parsing'
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast";

import {storeObjectInLocalStorage,loadObjectFromLocalStorage} from "../../data/storage"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import React from "react"

export default function Dashboard() {
  const [promptName, setPromptName] = React.useState("")
  const [promptDescription, setPromptDescription] = React.useState("")
  const { toast } = useToast();

  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Orders
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Products
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Customers
          </Link>
          <Link
            href="#"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Settings
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Dashboard
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Orders
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Products
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Customers
              </Link>
              <Link href="#" className="hover:text-foreground">
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header> */}
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Saved Prompts</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav
            className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
          >
            {/* <Link href="#" className="font-semibold text-primary">
              General
            </Link> */}
            <Sheet>
            <Link href="/prompts">⚙️ AI Settings</Link>
            <Link href="/promptsList">📋 Prompts List</Link>
              <Link href="">
                <SheetTrigger>
                  📚 Help
                </SheetTrigger>
              </Link>
              <SheetContent side="top">
                <SheetHeader>
                  <SheetTitle>Are you absolutely sure?</SheetTitle>
                  <SheetDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
            <Link href="/promptDesigner">🎨 Strategy Design </Link>
            <Link href="">🤖 Consultation </Link>
            <Link href="">☎️ Support</Link>
          </nav>
          <div className="grid gap-6">

            <Card x-chunk="dashboard-04-chunk-2">
              <CardHeader>
                <CardTitle>Prompt Content</CardTitle>
                <CardDescription>
                  write the instructions for the assistant to generate bpmn.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex flex-col gap-4">
                  <Textarea className="h-80"
                    value={promptDescription}
                    onChange={(e) => setPromptDescription(e.target.value)}
                  />
                  <Input
                    placeholder="prompt name"
                    value={promptName}
                    onChange={(e) => setPromptName(e.target.value)}
                  />
                  {/* <div className="flex items-center space-x-2">
                    <Checkbox id="include" defaultChecked />
                    <label
                      htmlFor="include"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Sync to the remote storage. 
                    </label>
                  </div> */}
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button
                  onClick={() => {
                    if (promptName == "") {
                      toast({
                        title: "❌ Uh oh!",
                        description: `please fill the name of the prompt.`,
                      });
                      return
                    }
                    if (promptDescription == "") {
                      toast({
                        title: "❌ Uh oh!",
                        description: `please fill the content of the prompt.`,
                      });
                      return
                    }
                    let inputs =  extractInputs(promptDescription)
                    // console.log(inputs);
                    if(hasSpace(inputs))
                    {
                      let one = oneHasSpace(inputs)
                      toast({
                        title: "❌ Uh oh!",
                        description: `please remove the spaces from this input : [${one}]`,
                      });
                      return
                    }
                    const prompt = {
                      id : promptName,
                      content : promptDescription,
                      inputs:inputs
                    }

                    let fromStorage = loadObjectFromLocalStorage(prompt.id)
                    if(fromStorage != null)
                    {
                      toast({
                        title: "❌ Uh oh!",
                        description: `there is a prompt with the same name please edit the name and try again.`,
                      });
                      return
                    }
                    let prompts = loadObjectFromLocalStorage("prompts")
                    console.log(prompts);
                    if(prompts == null)
                    {
                      prompts = []
                    }
                    prompts.push(prompt)

                    storeObjectInLocalStorage("prompts",prompts)
                    storeObjectInLocalStorage(prompt.id,prompt)
                    toast({
                      title: "✅ Greate!",
                      description: `the prompt added successfully.`,
                    });
                  }}
                >Save</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
