import * as React from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"


export default function InsertValueModal({ isOpen, setIsOpen, setValueName, title, supTitle, placeholder, label, defaultValue }) {
  if (defaultValue == undefined || defaultValue == null) {
    defaultValue = ""
  }
  const [value, setValue] = React.useState(defaultValue)
  const inputRef = React.useRef(null);
  const { toast } = useToast()

  React.useEffect(() => {
    console.log(inputRef);
    setTimeout(() => {
      if (isOpen) {
        try {
          inputRef.current.focus();
        } catch (err) {
          console.log(err);
        }
      }
    }, 0)
  }, [isOpen]);
  return (
    <Drawer open={isOpen} onClose={() => {
      setIsOpen(false)
    }}>
      <DrawerContent>
        <form onSubmit={(e) => {
          e.preventDefault()
          if (value == "") {
            console.log(value);
            toast({
              title: "❌ Uh oh!",
              description: `please fill the input section.`,
            })
          }
          else {
            setIsOpen(false)
            setValue("")
            setValueName(value)
          }
        }}>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>{title}</DrawerTitle>
              <DrawerDescription>{supTitle}</DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">

              <div className="flex items-center justify-center space-x-2">
                <div className="flex-1 text-center">
                  <Input ref={inputRef} onChange={(e) => setValue(e.target.value)} value={value} placeholder={placeholder} />
                  <div className="text-[0.70rem] uppercase text-muted-foreground">
                  </div>
                </div>
              </div>
            </div>
            <DrawerFooter>
              <Button
                // onClick={() => {
                //   if (value == "") {
                //     toast({
                //       title: "❌ Uh oh!",
                //       description: `please fill the input section.`,
                //     })
                //   }
                //   else {
                //     setIsOpen(false)
                //     setValue("")
                //     setValueName(value)
                //   }
                // }}
                type="submit"
              >{label || "Insert"}</Button>
              <Button variant="outline" onClick={() => {
                setIsOpen(false)
                setValue("")
              }
              }>Cancel</Button>
            </DrawerFooter>
            <div className="mt-3 h-[120px]">
            </div>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  )
}
