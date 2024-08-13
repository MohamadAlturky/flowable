"use client";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { useToast } from "@/components/ui/use-toast";
import { FitViewIcon } from "./Icons/FitView";
import { ControlButton } from "@xyflow/react";
import apiUrl from "../configurations/apiConfiguration.json";
import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { useState, DragEvent } from "react";
import BuildPoolNode from "../services/DragAndDrop/PoolBuilder";
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
} from "@xyflow/react";

import {
  nodes as initialNodes,
  edges as initialEdges,
} from "./initial-elements";
import AnnotationNode from "./AnnotationNode";
import PromptTemplateNode from "./PromptTemplateNode";
import SwimlaneNode from "./SwimlaneNode";
import PoolNode from "./PoolNode";
import CircleNode from "./CircleNode";
import TextNode from "./TextNode";
import ButtonEdge from "./ButtonEdge";
import Activity from "./ManualTask";
import Gateway from "./Gateway";
import InsertValueModal from "../components/modals/InsertValueModal";
import "@xyflow/react/dist/style.css";
import "../css/overview.css";
import {loadObjectFromLocalStorage} from "../data/storage"
const nodeTypes = {
  annotation: AnnotationNode,
  tools: PromptTemplateNode,
  pool: PoolNode,
  circle: CircleNode,
  textinput: TextNode,
  swimlane: SwimlaneNode,
  activity: Activity,
  gateway: Gateway,
};

const edgeTypes = {
  button: ButtonEdge,
};
const onDragOver = (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
};

let id = 0;
const getId = () => `${id++}`;

const nodeClassName = (node) => node.type;
import DesignPromptsFlowSidebar from "./DesignPromptsFlowSidebar";
const DesignGenerationStrategy = () => {

  const { toast } = useToast();
  const [poolModalOpen, setPoolModalOpen] = useState(false);
  const [reactFlowInstance, setReactFlowInstance] = useState();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onInit = (rfi) => setReactFlowInstance(rfi);

  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => addEdge({...params, animated: true}, eds))
    },
    []
  );

  // D AND D
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [type, setType] = useState("");

  // var position;
  // var type;
  const onDrop = async (event) => {
    console.log(nodes);

    event.preventDefault();

    if (reactFlowInstance) {
      let _type = event.dataTransfer.getData("application/reactflow");
      let _name = event.dataTransfer.getData("application/reactflow/nodeName");
      setType(_type);
      let _position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      setPosition(_position);
      console.log(event);
      if (_type == "pool") {
        setPoolModalOpen(true);
      }
      console.log(_type);
      let promptId = getId()
      const prompt = loadObjectFromLocalStorage(_name)

      const newNodes = [{
        id: promptId,
            type:_type,
            position:_position,
            data: { label: `${_name}` },
            resizable: true,
            style: {
                width: 200,
                height: 50,
                borderRadius: '3px',
                border: '1px solid #1a192b',
                fontWeight: "900",
                color: "white",
                backgroundColor: "rgb(123, 75, 242, 93)",
            }
      }]
      const newEdges = []
      for(let i =0;i < prompt.inputs.length;i++)
      {
        let nodeId = getId()
        newNodes.push({
          id: nodeId,
              type:"tools",
              position:{
                x:_position.x - 500,
                y:_position.y - 100*(i) + (parseInt(prompt.inputs.length/2)*100)
              },
              data: { label: `${prompt.inputs[i]}` },
              resizable: true,
              style: {
                  width: 200,
                  height: 50,
                  borderRadius: '3px',
                  border: '1px solid #1a192b',
                  fontWeight: "900",
                  color: "white",
                  backgroundColor: "rgb(0, 250, 30, 93)",
              }
        })
        setEdges((eds) => addEdge({source:nodeId,
          target:promptId, animated: true}, eds))
      }


      setNodes(ndx=>ndx.concat(newNodes))
    }
  };

  /////
  const onNodeDoubleClick = async (_, node) => {
    // let _newNodes = await HandleDoubleClick(node, nodes);
    // console.log("_newNodes");
    // console.log(_newNodes);
    // setNodes(_newNodes);
    console.log(node);
  };
  return (
    <>
      <ReactFlowProvider>
        <div
          style={{
            width: "100vw",
            height: "100vh",
          }}
        >
          <ResizablePanelGroup direction="horizontal" className="h-screen">
            <ResizablePanel defaultSize={80}>
              <ContextMenu>
                <ContextMenuTrigger>
                  <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={(e) => {
                      onNodesChange(e);
                    }}
                    onEdgesChange={onEdgesChange}
                    onNodeDoubleClick={onNodeDoubleClick}
                    onConnect={onConnect}
                    fitView
                    attributionPosition="top-right"
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onInit={onInit}
                    className="overview"
                    maxZoom={Infinity}
                    zoomOnDoubleClick={false}
                  >
                    <MiniMap zoomable pannable nodeClassName={nodeClassName} />
                    {/* <Controls /> */}
                    <Controls showFitView={false} showInteractive={false}>
                      <ControlButton
                        title="fit content"
                        onClick={() =>
                          reactFlowInstance.fitView({
                            duration: 1200,
                            padding: 0.3,
                          })
                        }
                      >
                        <FitViewIcon />
                      </ControlButton>
                    </Controls>
                    <Background variant={BackgroundVariant.Dots} />
                  </ReactFlow>
                </ContextMenuTrigger>
                <ContextMenuContent className="w-64">
                  <ContextMenuItem
                    inset
                    onClick={(e) => {
                      setModalOpen(true);
                    }}
                  >
                    Adjust
                    <ContextMenuShortcut>⌘</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuItem
                    inset
                  >
                    Ask AI
                    <ContextMenuShortcut>⌘</ContextMenuShortcut>
                  </ContextMenuItem>

                  <ContextMenuSeparator />

                  <ContextMenuCheckboxItem>
                    Print
                  </ContextMenuCheckboxItem>
                </ContextMenuContent>
              </ContextMenu>
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={20}>
              <DesignPromptsFlowSidebar />
              <InsertValueModal
                placeholder={"write here.."}
                isOpen={poolModalOpen}
                setIsOpen={setPoolModalOpen}
                supTitle={"set the participant name."}
                title={"Write Pool Name"}
                setValueName={async (v) => {
                  let node = BuildPoolNode(
                    position,
                    type,
                    nodes,
                    v,
                    setNodes,
                    getId
                  );
                  if (node != null) {
                    setNodes((nds) => nds.concat(node));
                    toast({
                      title: "✅ Greate!",
                      description: `the pool added successfully.`,
                    });
                  } else {
                    toast({
                      title: "❌ Uh oh!",
                      description: `something went wrong sorry.`,
                    });
                  }
                }}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </ReactFlowProvider>
    </>
  );
};

export default DesignGenerationStrategy;
