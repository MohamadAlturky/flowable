import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export default function ResizableDemo() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-screen"
    >
      <ResizablePanel defaultSize={80}>
      </ResizablePanel>
      
      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={20}>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
