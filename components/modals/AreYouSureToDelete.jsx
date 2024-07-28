import * as React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function AreYouSureToDelete({
  isOpen,
  setIsOpen,
  callBack,
  title,
  supTitle,
}) {
  return (
    <>
      <AlertDialog 
       open={isOpen}
       onClose={() => {
         setIsOpen(false);
       }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>
            {supTitle}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
                onClick={() => {
                  setIsOpen(false);
                }}
            >Cancel</AlertDialogCancel>
            <AlertDialogAction
             onClick={() => {
              callBack()
            }}
            >Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 
      <Drawer
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>{title}</DrawerTitle>
              <DrawerDescription>{supTitle}</DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <div className="flex items-center justify-center space-x-2">
                <div className="flex-1 text-center">
                  <div className="text-[0.70rem] uppercase text-muted-foreground"></div>
                </div>
              </div>
            </div>
            <DrawerFooter>
              <Button
                onClick={() => {
                  callBack()
                }}
              >
                Ok
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Cancel
              </Button>
            </DrawerFooter>
            <div className="mt-3 h-[120px]"></div>
          </div>
        </DrawerContent>
      </Drawer> */}
    </>

  );
}
