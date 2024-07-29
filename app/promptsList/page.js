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
import { extractInputs, hasSpace, oneHasSpace } from '../../services/parser/parsing'

import { useToast } from "@/components/ui/use-toast";

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import React from "react"
import { loadObjectFromLocalStorage,storeObjectInLocalStorage } from "../../data/storage"
import InsertValueModal from '../../components/modals/InsertValueModal'
import InsertValueAreaModal from '../../components/modals/InsertValueAreaModal'
import AreYouSureToDelete from '../../components/modals/AreYouSureToDelete'
export default function Dashboard() {
  const [prompts, setPrompts] = React.useState(loadObjectFromLocalStorage("prompts"))
  const { toast } = useToast();
  const [editNameModalOpen, setEditNameModalOpen] = React.useState(false);
  const [editContentModalOpen, setEditContentModalOpen] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [selectedPrompt, setSelectedPrompt] = React.useState(null);

  return (
    <div className="flex min-h-screen w-full flex-col">

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
            {prompts.map(prompt => (
              <Card x-chunk="dashboard-04-chunk-2">
                <CardHeader>
                  <CardTitle>{prompt.id}</CardTitle>
                  <CardDescription>
                    {prompt.content.substring(0, 200)} ........
                  </CardDescription>
                </CardHeader>
                <CardContent>

                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <Button variant="outline" className="mr-2"
                    onClick={() => {
                      setDeleteModalOpen(true)
                      setSelectedPrompt(loadObjectFromLocalStorage(prompt.id))
                    }}
                  >Delete</Button>
                  <Button
                    variant="secondary"
                    className="mr-2"
                    onClick={() => {
                      setEditNameModalOpen(true)
                      setSelectedPrompt(loadObjectFromLocalStorage(prompt.id))
                    }}>Edit Name</Button>
                  <Button
                    onClick={() => {
                      setEditContentModalOpen(true)
                      setSelectedPrompt(loadObjectFromLocalStorage(prompt.id))
                    }}
                  >Edit Content</Button>
                </CardFooter>
              </Card>
            ))}

          </div>
        </div>
        {selectedPrompt && (
          <InsertValueModal
            placeholder={"write here.."}
            isOpen={editNameModalOpen}
            defaultValue={selectedPrompt && selectedPrompt.id}
            setIsOpen={setEditNameModalOpen}
            label={"Edit"}
            supTitle={"edit the prompt name."}
            title={"Prompt Name"}
            setValueName={async (v) => {
              const newPrompt = {
                id:v ,
                content:selectedPrompt.content,
                inputs:selectedPrompt.inputs
              }    
              storeObjectInLocalStorage(selectedPrompt.id,null)
              storeObjectInLocalStorage(newPrompt.id,newPrompt)
              const newPrompts = prompts.filter(p=>p.id!=selectedPrompt.id)
              newPrompts.push(newPrompt)
              storeObjectInLocalStorage("prompts",newPrompts)
              setPrompts(loadObjectFromLocalStorage("prompts"))
              toast({
                title: "✅ Greate!",
                description: `the prompt name edited successfully.`,
              });
              setTimeout(()=>{
                setSelectedPrompt(null)
              },300)
            }}
          />)}
        {selectedPrompt && (
          <InsertValueAreaModal
            placeholder={"write here.."}
            isOpen={editContentModalOpen}
            defaultValue={selectedPrompt && selectedPrompt.content}
            setIsOpen={setEditContentModalOpen}
            label={"Edit"}
            supTitle={"edit the prompt content."}
            title={"Prompt Content"}
            setValueName={async (v) => {
              const newPrompt = {
                id:selectedPrompt.id ,
                content:v,
                inputs:selectedPrompt.inputs
              }    
              storeObjectInLocalStorage(newPrompt.id,newPrompt)
              const newPrompts = prompts.filter(p=>p.id!=selectedPrompt.id)
              newPrompts.push(newPrompt)
              storeObjectInLocalStorage("prompts",newPrompts)
              setPrompts(loadObjectFromLocalStorage("prompts"))
              toast({
                title: "✅ Greate!",
                description: `the prompt content edited successfully.`,
              });
              setTimeout(()=>{
                setSelectedPrompt(null)
              },300)
            }}
          />)}

        {selectedPrompt && (<AreYouSureToDelete
          isOpen={deleteModalOpen}
          setIsOpen={setDeleteModalOpen}
          supTitle={`the prompt ${selectedPrompt.id} will be deleted`}
          title={"Are you sure?"}
          callBack={() => {
            storeObjectInLocalStorage(selectedPrompt.id,null)
            storeObjectInLocalStorage("prompts",prompts.filter(p=>p.id != selectedPrompt.id))
            setPrompts(loadObjectFromLocalStorage("prompts"))
            toast({
              title: "✅ Greate!",
              description: `prompt deleted successfully.`,
            })
            setTimeout(()=>{
              setSelectedPrompt(null)
            },300)
          }} />)}
      </main>
    </div>
  )
}
