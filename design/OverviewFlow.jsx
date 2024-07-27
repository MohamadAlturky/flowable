"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

import { useToast } from "@/components/ui/use-toast"
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { FitViewIcon } from "./Icons/FitView";
import { ControlButton } from "@xyflow/react";
// import InputModal from "../components/modal/Modal.jsx";
import apiUrl from "../configurations/apiConfiguration.json";
import axios from "axios";
// import BuildNode from "../services/DragAndDrop/DragAndDropService";
import React, { useCallback, useEffect } from "react";
import { useState, DragEvent } from "react";
import BuildPoolNode from "../services/DragAndDrop/PoolBuilder"
// import HandleDoubleClick from "../services/DoubleClick/DoubleClickHandler";
import {
  ReactFlow,
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  BackgroundVariant,
  useEdgesState,
  ReactFlowProvider
} from "@xyflow/react";

import {
  nodes as initialNodes,
  edges as initialEdges,
} from "./initial-elements";
import AnnotationNode from "./AnnotationNode";
import ToolbarNode from "./ToolbarNode";
import SwimlaneNode from "./SwimlaneNode";
import PoolNode from "./PoolNode";
import CircleNode from "./CircleNode";
import TextNode from "./TextNode";
import ButtonEdge from "./ButtonEdge";
import Activity from "./Activity";
import Gateway from "./Gateway";
import InsertValueModal from "../components/modals/InsertValueModal"
import "@xyflow/react/dist/style.css";
import "../css/overview.css";

const nodeTypes = {
  annotation: AnnotationNode,
  tools: ToolbarNode,
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
const getId = () => `dndnode_${id++}`;

const nodeClassName = (node) => node.type;
import MainSidebar from "./MainSidebar";
const OverviewFlow = () => {
  const { toast } = useToast()
  const [poolModalOpen,setPoolModalOpen] = useState(false)
  const [reactFlowInstance, setReactFlowInstance] = useState();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onInit = (rfi) => setReactFlowInstance(rfi);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
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
      // let node = await BuildPoolNode(position, type, nodes, nodes);
      // console.log(node);
      // if (node != null) {
      //   setNodes((nds) => nds.concat(node));

      //   const Toast = Swal.mixin({
      //     toast: true,
      //     position: "top-end",
      //     showConfirmButton: false,
      //     timer: 1000,
      //     timerProgressBar: true,
      //     didOpen: (toast) => {
      //       toast.addEventListener("mouseenter", Swal.stopTimer);
      //       toast.addEventListener("mouseleave", Swal.resumeTimer);
      //     },
      //   });

      //   Toast.fire({
      //     icon: "success",
      //     title: "OK",
      //   });
      // } else {
      //   const Toast = Swal.mixin({
      //     toast: true,
      //     position: "top-end",
      //     showConfirmButton: false,
      //     timer: 1000,
      //     timerProgressBar: true,
      //     didOpen: (toast) => {
      //       toast.addEventListener("mouseenter", Swal.stopTimer);
      //       toast.addEventListener("mouseleave", Swal.resumeTimer);
      //     },
      //   });

      //   Toast.fire({
      //     icon: "error",
      //     title: "No Action Applied",
      //   });
      // }
    }
  };
  const GetPoolName = (value) => {
    if (value == "") {
      toast.error("Please Enter The Pool Name", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      console.log("type", type);
      console.log("position", position);
      let node = BuildNode(position, type, nodes, value,setNodes);
      console.log(node);
      if (node != null) {
        setNodes((nds) => nds.concat(node));
      }
    }
  };
  /////
  const onNodeDoubleClick = async (_, node) => {
    let _newNodes = await HandleDoubleClick(node, nodes);
    console.log("_newNodes");
    console.log(_newNodes);
    setNodes(_newNodes);
  };
  return (
    <>    
    <ReactFlowProvider>
        <div style={{
          width:"100vw",
          height:"100vh"
        }}>

        <ResizablePanelGroup
          direction="horizontal"
          className="h-screen"
        >
          <ResizablePanel defaultSize={80}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={(e)=>{
              onNodesChange(e)
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
                  reactFlowInstance.fitView({ duration: 1200, padding: 0.3 })
                }
              >
                <FitViewIcon />
              </ControlButton>
            </Controls>
            <Background variant={BackgroundVariant.Dots} />
          </ReactFlow>
          </ResizablePanel>
          
          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={20}>
            <MainSidebar />
            <InsertValueModal 
              placeholder = {"write here.."}
              isOpen={poolModalOpen}
              setIsOpen={setPoolModalOpen}
              supTitle={"set the participant name."}
              title={"Write Pool Name"}
              setValueName={async (v)=>{
                let node = BuildPoolNode(position, type, nodes, v,setNodes)
                if(node != null)
                {
                  setNodes((nds) => nds.concat(node));
                  toast({
                    title: "✅ Greate!",
                    description: `the pool added successfully.`,
                  })
                }
                else{
                  toast({
                    title: "❌ Uh oh!",
                    description: `something went wrong sorry.`,
                  })
                }
              }}/>
          </ResizablePanel>
        </ResizablePanelGroup>

        </div>
      </ReactFlowProvider>
    </>
  );
};

export default OverviewFlow;
