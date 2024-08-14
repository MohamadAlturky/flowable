"use client";
import { PuffLoader } from "react-spinners";
import { buildTree, calculateDimensions, adjustNodesPositions, addIdToNodes, addIdToTransitions, flattenTree, updateParentIds, ADJUST } from '../services/adjustment/adjust';
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
import InsertValueAreaModal from '../components/modals/InsertValueAreaModal'
import { useToast } from "@/components/ui/use-toast";
import { FitViewIcon } from "./Icons/FitView";
import { ControlButton } from "@xyflow/react";
import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { useState, DragEvent } from "react";
import BuildPoolNode from "../services/DragAndDrop/PoolBuilder";
import BuildActivityNode from "../services/DragAndDrop/ActivityBuilder";
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
import IntermediateEventNode from "./IntermediateEventNode";
import StartEventNode from "./StartEventNode";
import AND from "./AND";
import OR from "./OR";
import ManualTask from "./ManualTask";
import ServiceTask from "./ServiceTask";
import UserTask from "./UserTask";
import XOR from "./XOR";
import EndEventNode from "./EndEventNode";
import ButtonEdge from "./ButtonEdge";
import Activity from "./ManualTask";
import Gateway from "./Gateway";
import InsertValueModal from "../components/modals/InsertValueModal";
import ReportModal from "../components/modals/ReportModal";
import GatewaysReportModal from "../components/modals/GatewaysReportModal";
import PoolsReportModal from "../components/modals/PoolsReportModal";
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
  Intermediate_Event: IntermediateEventNode,
  End_Event: EndEventNode,
  Start_Event: StartEventNode,
  OR:OR,
  XOR:XOR,
  AND:AND,
  UserTask:UserTask,
  ServiceTask:ServiceTask,
  ManualTask:ManualTask
};
import InterEventBuilder from "../services/DragAndDrop/InterEventBuilder";
import EndEventBuilder from "../services/DragAndDrop/EndEventBuilder";
import StartEventBuilder from "../services/DragAndDrop/StartEventBuilder";
import buildNodesAndEdges from "../services/builders/BuildDiagram";
import { useLayoutEffect } from 'react'
const edgeTypes = {
  button: ButtonEdge,
};
const onDragOver = (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
};


// 
// 
// 
// 

import ELK from 'elkjs/lib/elk.bundled.js';

const elk = new ELK();

const elkOptions = {
  'elk.algorithm': 'layered',
  'elk.layered.spacing.nodeNodeBetweenLayers': '200',
  'elk.spacing.nodeNode': '400',
};

function getWidth(type,node) {
  console.log(type);
  if (type == "ManualTask" || type == "UserTask" || type == "ServiceTask") {
      return (50 + (node.data.label.length * 7))
  }
  if (type == "Intermediate_Event" || type == "End_Event" || type == "Start_Event"|| type == "AND"|| type == "XOR"|| type == "OR") {
      return 110
  }
  return 0
}

function getHeight(type) {
  console.log(type);
  
  if (type == "ManualTask" || type == "UserTask" || type == "ServiceTask") {
      return 45
  }
  if (type == "Intermediate_Event" || type == "End_Event" || type == "Start_Event"|| type == "AND"|| type == "XOR"|| type == "OR") {
      return 110
  }
  return 0
}

const getLayoutedElements = (nodes, edges, options = {}) => {
  const isHorizontal = options?.['elk.direction'] === 'RIGHT';
  const graph = {
      id: 'root',
      layoutOptions: options,
      children: nodes.map((node) => ({
          ...node,

          targetPosition: isHorizontal ? 'left' : 'top',
          sourcePosition: isHorizontal ? 'right' : 'bottom',

          //   width: 50 + (node.data.label.length * 7),
          //   height: 45,
          width: getWidth(node.type,node),
          height: getHeight(node.type),
          //   width: node.style.width,
          //   height: node.style.height,
      })),
      edges: edges,
  };

  return elk
      .layout(graph)
      .then((layoutedGraph) => ({
          nodes: layoutedGraph.children.map((node) => ({
              ...node,
              position: { x: node.x, y: node.y },
          })),

          edges: layoutedGraph.edges,
      }))
      .catch(console.error);
};

// 
// 
// 
// 

let id = 0;
const getId = () => `${id++}`;

const nodeClassName = (node) => node.type;
import MainSidebar from "./MainSidebar";
import apiUrl from "../configurations/apiConfiguration.json";

const MainDesigner = () => {
  const { toast } = useToast();
  const [process, setProcess] = useState("");
  const [poolModalOpen, setPoolModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [gatewaysReportModalOpen, setGatewaysReportModalOpen] = useState(false);
  const [poolsReportModalOpen, setPoolsReportModalOpen] = useState(false);
  const [tasksReportModalOpen, setTasksReportModalOpen] = useState(false);
  const [processModalOpen, setProcessModalOpen] = useState(false);
  const [activityModalOpen, setActivityModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [reactFlowInstance, setReactFlowInstance] = useState();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [report, setReport] = useState(null)

  const onInit = (rfi) => setReactFlowInstance(rfi);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    []
  );
  // 
  // 
  // 
  const onLayout = useCallback(
    ({ direction, useInitialNodes = false }) => {
      const opts = { 'elk.direction': direction, ...elkOptions };
      const ns = useInitialNodes ? initialNodes : nodes;
      const es = useInitialNodes ? initialEdges : edges;

      getLayoutedElements(ns, es, opts).then(
        ({ nodes: layoutedNodes, edges: layoutedEdges }) => {
          setNodes(layoutedNodes);
          setEdges(layoutedEdges);

          // window.requestAnimationFrame(() => fitView());
        },
      );
    },
    [nodes, edges],
  );
  useLayoutEffect(() => {
    onLayout({ direction: 'DOWN', useInitialNodes: true });
  }, []);

  // 
  // 
  // 
  // 
  // 

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
      else{
        setEventModalOpen(true);

        // setNodes((nds) => nds.concat({

        //   id:getId(),
        //   type:_type,
        //   data:{
        //     label:"something"
        //   },
        //   position:_position
        // }));
      }
      
      // if (_type == "pool") {
      //   setPoolModalOpen(true);
      // }
      // if (_type == "activity") {
      //   setActivityModalOpen(true);
      // }
      // if (_type == "Start_Event") {
      //   setNodes((nds) => nds.concat({
      //     id:getId(),
      //     type:"Start_Event",
      //     data:{
      //       label:"start"
      //     },
      //     position:_position
      //   }));
      //   // setEventModalOpen(true)
      // }
      // if (_type == "interevent") {
      //   setEventModalOpen(true)
      // }
      // if (_type == "endevent") {
      //   setEventModalOpen(true)
      // }
    }
  };

  // const generateDiagram = () => {
  //   setIsGenerating(true);
  //   toast({
  //     title: "Greate!",
  //     description: `we are working on generating the diagram`,
  //   });

  //   const axiosInstance = axios.create();
  //   const data = {
  //     "process_description": process,
  //     "report":report
  //   }

  //   axiosInstance.post(apiUrl.baseUrl + "/generate/diagram", data)
  //     .then(res => {
  //       console.log("res.data.report");
  //       console.log("res.data.report");
  //       console.log("res.data.report");
  //       console.log("res.data.report");
  //       console.log("res.data.report");
  //       console.log("res.data.report");
  //       console.log("res.data.report");
  //       console.log(res.data);
  //       // setReport(res.data.report)
  //       toast({
  //         title: "✅ Greate!",
  //         description: `the diagram generated successfully.`,
  //       });
  //     }).catch(err => {
  //       console.log(err)
  //       console.log(err.toJSON())
  //       toast({
  //         title: "❌ Error!",
  //         description: `error occured sorry!`,
  //       });
  //     }).finally(() => {
  //       setIsGenerating(false)
  //     });
  // }

  const generateWithGroq = () => {
    if (process == "") {
      toast({
        title: "❌ Error!",
        description: `fill the process description please`,
      });
      return;
    }
    setIsGenerating(true);
    toast({
      title: "Greate!",
      description: `we are working on generating the diagram`,
    });
    const axiosInstance = axios.create();
    const data = {
      "process_description": process,
      "notes": "",
      "report": ""
    }
    axiosInstance.post(apiUrl.aiUrl + "/bpmn/generate", data)
      .then(async (res) => {
        console.log("res.data.nodes");
        console.log("-------------------------------------------------");
        // console.log(res.data.nodes);
        // console.log(res.data.edges);
        let newNodes = addIdToNodes(res.data.nodes)
        // console.log(newNodes);
        let newEdges = addIdToTransitions(res.data.edges)
        // console.log(newEdges);
        newNodes = updateParentIds(newNodes, newEdges)
        // // let tree = buildTree(newNodes)
        // // // console.log(tree);
        // // tree.forEach(rootNode => calculateDimensions(rootNode));
        // // console.log(tree);
        // // tree = adjustNodesPositions(tree)
        // // let lastNodes = []

        // // tree.forEach(rootNode => lastNodes.push(...flattenTree(rootNode)));
        // console.log(tree);
        // // console.log(updateParentIds(newNodes,newEdges))
        // // console.log(flattenAggregatedNodes(aggregateNodes(res.data.nodes,adjustNodes)));
        // console.log(lastNodes);
        const opts = { 'elk.direction': "RIGHT", ...elkOptions };
        let layouted = await getLayoutedElements(newNodes, newEdges, opts)
        let layoutedNodes = layouted.nodes
        let pools = layoutedNodes.filter(e => e.type == "pool")
        layoutedNodes = layoutedNodes.filter(e => e.type != "pool")

        layoutedNodes.forEach((e) => {
          if (type == "Intermediate_Event" || type == "End_Event" || type == "Start_Event"|| type == "AND"|| type == "XOR"|| type == "OR") {
            e.resizable= true
            e.style= {
            }
            e.extent= "parent"

            let x = e["style"]
            delete e["height"]
            delete e["measured"]
            delete e["targetPosition"]
            delete e["sourcePosition"]
            delete e["width"]
            delete e["x"]
            delete e["y"]
            delete e["$H"]
            // e.style = {
            //   // ...x,
            //   // width: (50 + (e.data.label.length * 7)),
            //   height: 110
            // }
          }
        })
        pools.forEach((e) => {
          let x = e.style
          e.width = 10000 
          e.height = 1000 
          e.style = {
            ...x,
            backgroundColor:"transparent",
            width: 10000,
            height: 1000
          }
        })
        console.log(pools);
        
        let NlayoutedNodes = []
        pools.forEach((e) => NlayoutedNodes.push(e))
        let layoutedEdges = layouted.edges
        layoutedNodes.forEach((e) =>e.position.x += 50)
        layoutedNodes.forEach((e) => NlayoutedNodes.push(e))

        console.log("layouted");
        console.log(NlayoutedNodes);

        setNodes(NlayoutedNodes);
        setEdges(() => layoutedEdges)

        toast({
          title: "✅ Greate!",
          description: `the report generated successfully.`,
        });
      }).catch(err => {
        console.log(err)
        toast({
          title: "❌ Error!",
          description: `error occured sorry!`,
        });
      }).finally(() => {
        setIsGenerating(false)
      });
  }
  const generateWithGroqCollaboration = () => {
    if (process == "") {
      toast({
        title: "❌ Error!",
        description: `fill the process description please`,
      });
      return;
    }
    setIsGenerating(true);
    toast({
      title: "Greate!",
      description: `we are working on generating the diagram`,
    });
    const axiosInstance = axios.create();
    const data = {
      "process_description": process,
      "notes": "",
      "report": ""
    }
    axiosInstance.post(apiUrl.baseUrl + "/generate/bpmn", data)
      .then(res => {

        setNodes(res.data.nodes);
        setEdges(() => res.data.edges)

        toast({
          title: "✅ Greate!",
          description: `the report generated successfully.`,
        });
      }).catch(err => {
        console.log(err)
        toast({
          title: "❌ Error!",
          description: `error occured sorry!`,
        });
      }).finally(() => {
        setIsGenerating(false)
      });
  }
  const generate = () => {
    if (process == "") {
      toast({
        title: "❌ Error!",
        description: `fill the process description please`,
      });
      return;
    }
    setIsGenerating(true);
    toast({
      title: "Greate!",
      description: `we are working on generating the diagram`,
    });
    const axiosInstance = axios.create();
    const data = {
      "process_description": process
    }
    let res = {
      "report": {
        "gateways_report": {
          "content": [
            {
              "name": "Exclusive Gateway (XOR Gate)",
              "type": "Exclusive",
              "description": "User selects between multiple options for a free reward after selecting items to purchase",
              "inputs": [
                {
                  "name": "User has selected items",
                  "description": "User has selected the items they want to purchase"
                }
              ],
              "outputs": [
                {
                  "name": "Free reward is selected and awarded",
                  "description": "The user selects a free reward and it is awarded"
                },
                {
                  "name": "No free reward is selected (default path)",
                  "description": "The user does not select a free reward, so the process continues with the default path"
                }
              ]
            },
            {
              "name": "Parallel Gateway (AND Gate)",
              "type": "Parallel",
              "description": "User simultaneously selects items to purchase and sets a payment method",
              "inputs": [
                {
                  "name": "User has started an order by logging in",
                  "description": "The user logs in and starts the ordering process"
                }
              ],
              "outputs": [
                {
                  "name": "Items are selected",
                  "description": "The user selects the items they want to purchase"
                },
                {
                  "name": "Payment method is set",
                  "description": "The user sets their payment method for the order"
                }
              ]
            },
            {
              "name": "Inclusive Gateway (OR Gate)",
              "type": "Inclusive",
              "description": "User either pays or completes an installment agreement after setting a payment method",
              "inputs": [
                {
                  "name": "User has set a payment method",
                  "description": "The user has set their payment method for the order"
                }
              ],
              "outputs": [
                {
                  "name": "Payment is completed",
                  "description": "The user pays for the order and it is completed"
                },
                {
                  "name": "Installment agreement is completed",
                  "description": "The user completes an installment agreement and the process continues"
                }
              ]
            },
            {
              "name": "Inclusive Gateway (OR Gate) - Duplicate",
              "type": "Inclusive",
              "description": "User either pays or completes an installment agreement after setting a payment method (duplicate)",
              "inputs": [
                {
                  "name": "User has set a payment method",
                  "description": "The user has set their payment method for the order"
                }
              ],
              "outputs": [
                {
                  "name": "Payment is completed",
                  "description": "The user pays for the order and it is completed"
                },
                {
                  "name": "Installment agreement is completed",
                  "description": "The user completes an installment agreement and the process continues"
                }
              ]
            }
          ]
        },
        "tasks_report": {
          "content": [
            {
              "name": "Login",
              "type": "User Task",
              "description": "User logs in to their account."
            },
            {
              "name": "Select Items",
              "type": "Service Task",
              "description": "User selects items to purchase from the online shop."
            },
            {
              "name": "Set Payment Method",
              "type": "Service Task",
              "description": "User sets a payment method for the purchase."
            },
            {
              "name": "Pay or Installment Agreement",
              "type": "User Task",
              "description": "User chooses to either pay or complete an installment agreement."
            },
            {
              "name": "Choose Reward Option",
              "type": "Service Task",
              "description": "User selects from multiple options for a free reward, independent of payment activities."
            },
            {
              "name": "Deliver Items",
              "type": "Service Task",
              "description": "The items are delivered to the user."
            },
            {
              "name": "Return Items for Exchange",
              "type": "User Task",
              "description": "User has the right to return items and receive a new delivery."
            },
            {
              "name": "New Delivery",
              "type": "Service Task",
              "description": "A new delivery is made after item returns."
            }
          ]
        },
        "poolsLanes_report": {
          "content": [
            {
              "name": "User (Customer)",
              "description": "Pool for user customer",
              "lanes": [
                {
                  "name": "Order Management",
                  "description": "Lane for managing orders"
                },
                {
                  "name": "Reward Program",
                  "description": "Lane for reward program independent of payment activities"
                }
              ]
            },
            {
              "name": "Online Shop (Vendor)",
              "description": "Pool for online shop vendor",
              "lanes": [
                {
                  "name": "Order Fulfillment",
                  "description": "Lane for fulfilling orders"
                }
              ]
            }
          ]
        },
        "events_report": {
          "content": [
            {
              "name": "User Logs In",
              "type": "Start Event",
              "description": "The user initiates the order by logging into their account, marking the beginning of the process."
            },
            {
              "name": "Order Placed",
              "type": "Intermediate Event",
              "description": "The user has selected items to purchase and set a payment method, marking a specific moment in the process."
            },
            {
              "name": "Payment Received/Installment Agreement Completed",
              "type": "Intermediate Event",
              "description": "The user completes either the payment or an installment agreement, indicating progress in the process."
            },
            {
              "name": "Reward Option Selected",
              "type": "Intermediate Event",
              "description": "The user chooses between multiple options for a free reward, marking another specific moment in the process."
            },
            {
              "name": "Items Delivered",
              "type": "Intermediate Event",
              "description": "The items are delivered to the user, indicating completion of one stage in the process."
            },
            {
              "name": "Return Requested/Exchange",
              "type": "Intermediate Event",
              "description": "The user requests a return or exchange of items, marking another specific moment in the process."
            },
            {
              "name": "Delivery Made",
              "type": "End Event",
              "description": "A new delivery is made every time items are returned, indicating completion of the final stage in the process."
            }
          ]
        }
      },
      "connections": [],
      "annotations": []
    }
    setReport(res.report)
    const data2 = {
      annotations: res.annotations,
      connections: res.connections
    }
    // console.log(data2);

    const result = buildNodesAndEdges(data2, res.report.poolsLanes_report.content, setNodes, getId)
    setNodes(result.arr);
    setEdges(() => result.connections)

    toast({
      title: "✅ Greate!",
      description: `the report generated successfully.`,
    });
    setIsGenerating(false)
    // axiosInstance.post(apiUrl.baseUrl + "/generate/direct_with_report", data)
    //   .then(res => {
    //     console.log("res.data");
    //     console.log("res.data");
    //     console.log("res.data");
    //     console.log("res.data");
    //     console.log("res.data");
    //     console.log("res.data");
    //     console.log("res.data");
    //     console.log(res.data);
    //     setReport(res.data.report)
    //     const data = {
    //       annotations:res.data.annotations,
    //       connections:res.data.connections
    //     }
    //     console.log(data);

    //     // console.log("res.data.connections");
    //     // console.log(res.data.connections);
    //     // console.log("res.data.annotations");
    //     // console.log(res.data.annotations);
    //     const result = buildNodesAndEdges(data)
    //     console.log(result);
    //     setNodes(result.arr);
    //     setEdges(() => result.connections)

    //     toast({
    //       title: "✅ Greate!",
    //       description: `the report generated successfully.`,
    //     });
    //   }).catch(err => {
    //     console.log(err)
    //     // console.log(err.toJSON())
    //     toast({
    //       title: "❌ Error!",
    //       description: `error occured sorry!`,
    //     });
    //   }).finally(() => {
    //     setIsGenerating(false)
    //   });
  }
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
      {isGenerating && (
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
          position: "absolute",
          zIndex: 100,
          backgroundColor: "white",
        }}>
          <PuffLoader size={100} speedMultiplier={0.8} />
        </div>
      )}
      <ReactFlowProvider>
        <div
          style={{
            width: "100vw",
            height: "100vh",
          }}
        >
          <InsertValueAreaModal
            placeholder={"write here.."}
            isOpen={processModalOpen}
            defaultValue={process}
            setIsOpen={setProcessModalOpen}
            label={"Edit"}
            supTitle={"edit the process content."}
            title={"Process Description"}
            setValueName={async (v) => {
              if (v != process) {
                setProcess(v)
                toast({
                  title: "✅ Greate!",
                  description: `the process content edited successfully.`,
                });
              }
            }}
          />
          <ResizablePanelGroup direction="horizontal" className="h-screen">
            <ResizablePanel defaultSize={80}>
              <ContextMenu>
                <ContextMenuTrigger>
                  <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={(e) => {
                      onNodesChange(e);
                      // console.log(e);
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
                    {/* <Panel position="top-right">
                      <button onClick={() => onLayout({ direction: 'DOWN' })}>
                        vertical layout
                      </button>
                      <button onClick={async () => {
                        console.log(nodes);
                        console.log(edges);

                        let result = await ADJUST(nodes, edges)
                        setNodes(result.nodes);
                        setEdges(() => result.edges)
                      }}>
                        ADJUST
                      </button>
                      <button onClick={() => onLayout({ direction: 'RIGHT' })}>
                        horizontal layout
                      </button>
                    </Panel> */}
                  </ReactFlow>
                </ContextMenuTrigger>

                <ContextMenuContent className="w-64">
                  {!isGenerating && (
                    <>
                      <ContextMenuItem
                        inset
                        onClick={(e) => {
                          setProcessModalOpen(true);
                        }}
                      >
                        Process Description
                        <ContextMenuShortcut>⌘</ContextMenuShortcut>
                      </ContextMenuItem>
                      <ContextMenuSeparator />

                      {/* <ContextMenuItem inset

                        onClick={(e) => {
                          generate()
                        }}
                      >
                        Generate Diagram
                        <ContextMenuShortcut>⌘</ContextMenuShortcut>
                      </ContextMenuItem> */}

                      <ContextMenuItem inset

                        onClick={(e) => {
                          generateWithGroq()
                        }}
                      >
                        Generate with Groq
                        <ContextMenuShortcut>⌘</ContextMenuShortcut>
                      </ContextMenuItem>
                      <ContextMenuItem inset

                        onClick={(e) => {
                          generateWithGroqCollaboration()
                        }}
                      >
                        Generate with Collaboration
                        <ContextMenuShortcut>⌘</ContextMenuShortcut>
                      </ContextMenuItem>
                      <ContextMenuSub>
                        <ContextMenuSubTrigger inset>Reports</ContextMenuSubTrigger>
                        <ContextMenuSubContent className="w-48">
                          <ContextMenuItem onClick={() => {
                            if (report) {

                              setReportModalOpen(true)
                            }
                            else {
                              toast({
                                title: "❌ Uh oh!",
                                description: `you have to generate the reports.`,
                              });
                            }
                          }}>
                            Events
                          </ContextMenuItem>
                          <ContextMenuItem onClick={() => {
                            console.log("nodes");
                            console.log(nodes);
                            
                            if (report) {
                              setPoolsReportModalOpen(true)
                            }
                            else {
                              toast({
                                title: "❌ Uh oh!",
                                description: `you have to generate the reports.`,
                              });
                            }
                          }}>
                            Pools Lanes
                          </ContextMenuItem>
                          <ContextMenuItem onClick={() => {
                            if (report) {
                              setTasksReportModalOpen(true)
                            }
                            else {
                              toast({
                                title: "❌ Uh oh!",
                                description: `you have to generate the reports.`,
                              });
                            }
                          }}>
                            Tasks
                          </ContextMenuItem>
                          <ContextMenuItem onClick={() => {
                            if (report) {

                              setGatewaysReportModalOpen(true)
                            }
                            else {
                              toast({
                                title: "❌ Uh oh!",
                                description: `you have to generate the reports.`,
                              });
                            }
                          }}>
                            Gateways
                          </ContextMenuItem>
                          {/* <ContextMenuSeparator />/ */}
                          {/* <ContextMenuItem  onClick={() => { */}
                          {/* generateDiagram() */}
                          {/* }}>Diagram Merge Tools</ContextMenuItem> */}
                        </ContextMenuSubContent>
                      </ContextMenuSub>
                    </>

                  )}

                </ContextMenuContent>

              </ContextMenu>
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={20}>
              <MainSidebar />
              {poolModalOpen && (<InsertValueModal
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
              />)}

              {activityModalOpen && (<InsertValueModal
                placeholder={"write here.."}
                isOpen={activityModalOpen}
                setIsOpen={setActivityModalOpen}
                supTitle={"set the task name."}
                title={"Write Task Name"}
                setValueName={async (v) => {
                  let node = BuildActivityNode(
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
              />)}
              {eventModalOpen && (<InsertValueModal
                placeholder={"write here.."}
                isOpen={eventModalOpen}
                setIsOpen={setEventModalOpen}
                supTitle={"set the activity name."}
                title={"Write Activity Name"}
                setValueName={async (v) => {
                  let node = BuildActivityNode(
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
              />)}
              {report && (
                <>
                  {reportModalOpen && <ReportModal isOpen={reportModalOpen} setIsOpen={setReportModalOpen} title={"Events Report"} supTitle={"this report is generated by AI."} report={report.events_report.content} />}
                  {tasksReportModalOpen && <ReportModal isOpen={tasksReportModalOpen} setIsOpen={setTasksReportModalOpen} title={"Tasks Report"} supTitle={"this report is generated by AI."} report={report.tasks_report.content} />}
                  {gatewaysReportModalOpen && <GatewaysReportModal isOpen={gatewaysReportModalOpen} setIsOpen={setGatewaysReportModalOpen} title={"Gateways Report"} supTitle={"this report is generated by AI."} report={report.gateways_report.content} />}
                  {poolsReportModalOpen && <PoolsReportModal isOpen={poolsReportModalOpen} setIsOpen={setPoolsReportModalOpen} title={"Pools And Lanes Report"} supTitle={"this report is generated by AI."} report={report.poolsLanes_report.content} />}
                  {/* <PoolsReportModal isOpen={poolsReportModalOpen} setIsOpen={setPoolsReportModalOpen} title={"Pools And Lanes Report"} supTitle={"this report is generated by AI."} report={(report.poolsLanes_report.content.pools!= undefined)?report.poolsLanes_report.content.pools:report.poolsLanes_report.content} /> */}
                </>
              )}
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </ReactFlowProvider>
    </>
  );
};

export default MainDesigner;
