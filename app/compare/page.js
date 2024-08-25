'use client'
import '@xyflow/react/dist/style.css';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import {
  ReactFlow,
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  BackgroundVariant,
  useEdgesState,
  ReactFlowProvider,
  Panel
} from "@xyflow/react";
import DatasetDemo from "../../design/DatasetDemo"
export default function Projects() {
  return (
<ResizablePanelGroup direction="horizontal">

  <ResizablePanel defaultSize={50}>
      <div style={{ overflow: "hidden" }}>
        <DatasetDemo />
      </div>
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={50}>
      <div style={{ overflow: "hidden" }}>
        <DatasetDemo />
      </div>
  </ResizablePanel>
</ResizablePanelGroup>

  );
}
