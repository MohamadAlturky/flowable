"use client";
import { PuffLoader } from "react-spinners";
import { buildTree, calculateDimensions, adjustNodesPositions, addIdToNodes, addIdToTransitions, flattenTree, updateParentIds, ADJUST } from '../services/adjustment/adjust';
import generatePDF from "../services/pdf/generate"
import "./contextMenu.css"
import CustomViewer from "../components/pdfViewer"
import downloadFile from "../services/download/main"
import Button from '../components/ui/button'
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
import { useState, DragEvent, useRef } from "react";
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
import { getAuthTokens } from "../services/auth/AuthServices"

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
  OR: OR,
  XOR: XOR,
  AND: AND,
  UserTask: UserTask,
  ServiceTask: ServiceTask,
  ManualTask: ManualTask
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
  'elk.layered.spacing.nodeNodeBetweenLayers': '700',
  'elk.spacing.nodeNode': '500',
};

function getWidth(type, node) {
  console.log(type);
  if (type == "ManualTask" || type == "UserTask" || type == "ServiceTask") {
    return (50 + (node.data.label.length * 7))
  }
  if (type == "Intermediate_Event" || type == "End_Event" || type == "Start_Event" || type == "AND" || type == "XOR" || type == "OR") {
    return 110
  }
  return 0
}

function getHeight(type) {
  console.log(type);

  if (type == "ManualTask" || type == "UserTask" || type == "ServiceTask") {
    return 45
  }
  if (type == "Intermediate_Event" || type == "End_Event" || type == "Start_Event" || type == "AND" || type == "XOR" || type == "OR") {
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
      width: getWidth(node.type, node),
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
import CustomContextMenu from './CustomContextMenu';

// let id = 0;
import { Guid } from 'js-guid';

const getId = () => {

  let guid = Guid.newGuid();
  console.log(guid.toString());
  return `${guid.toString()}`
};

const nodeClassName = (node) => node.type;
import MainSidebar from "./MainSidebar";
import apiUrl from "../configurations/apiConfiguration.json";

const MainDesigner = () => {
  const [menu, setMenu] = useState(null);
  const ref = useRef(null);

  // 

  const onNodeContextMenu = useCallback(
    (event, node) => {
      // Prevent native context menu from showing
      event.preventDefault();

      // Calculate position of the context menu. We want to make sure it
      // doesn't get positioned off-screen.
      const pane = ref.current.getBoundingClientRect();
      setMenu({
        id: node.id,
        top: event.clientY < pane.height - 200 && event.clientY,
        left: event.clientX < pane.width - 200 && event.clientX,
        right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
        bottom:
          event.clientY >= pane.height - 200 && pane.height - event.clientY,
      });
    },
    [setMenu],
  );

  // Close the context menu if it's open whenever the window is clicked.
  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);
  const [editNameModalOpen, setEditNameModalOpen] = React.useState(false);
  const [editId, setEditId] = React.useState("");


  // 
  const { toast } = useToast();
  const [process, setProcess] = useState("");
  const [newProcess, setNewProcess] = useState("");
  const [poolModalOpen, setPoolModalOpen] = useState(false);
  const [discussion, setDiscussion] = useState([]);
  const [discussionOpen, setDiscussionOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [changeProcess, setChangeProcess] = useState(false);
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
  const fileInputRef = useRef(null);

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
  function getTypes(nodes) {
    const dict = {};
    
    nodes.forEach(item => {
      dict[item.type_name] = true;
    });
    
    return dict;
  }
  function getConnections(edges) {
    const dict = {};
    
    edges.forEach(item => {
      dict[item.label] = true;
    });
    
    return dict;
  }

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
      else {
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

  const generateWithGroq = (id) => {
    setIsGenerating(true);
    toast({
      title: "Greate!",
      description: `we are working on generating the diagram`,
    });
    let token = getAuthTokens().accessToken

    const axiosInstance = axios.create();
    const data = {
      "row_num": id,
    }
    axiosInstance.post(apiUrl.aiUrl + "/dataset/annotations", data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      })
      .then(async (res) => {
        console.log("res.data.nodes");
        console.log("-------------------------------------------------");
        // console.log(res.data.nodes);
        // console.log(res.data.edges);
        let newNodes = addIdToNodes(res.data.nodes)
        // console.log(newNodes);
        let newEdges = addIdToTransitions(res.data.edges)
        let newEdgesCopy = newEdges
        // console.log(newEdges);
        // newNodes = updateParentIds(newNodes, newEdges)
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
          if (type == "Intermediate_Event" || type == "End_Event" || type == "Start_Event" || type == "AND" || type == "XOR" || type == "OR") {
            e.resizable = true
            e.style = {
            }
            // e.extent= "parent"

            let x = e["style"]
            delete e["height"]
            delete e["measured"]
            delete e["targetPosition"]
            delete e["sourcePosition"]
            delete e["width"]
            delete e["x"]
            delete e["y"]
            delete e["$H"]
            delete e["extent"]
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
            backgroundColor: "transparent",
            width: 10000,
            height: 1000
          }
        })
        console.log(pools);

        let NlayoutedNodes = []
        // pools.forEach((e) => NlayoutedNodes.push(e))
        let layoutedEdges = layouted.edges
        layoutedNodes.forEach((e) => e.position.x += 50)

        layoutedNodes.forEach((e) => {
          let backgroundC = "#8e00ff"
          if(e.parentId == null)
          {
            backgroundC = "green"
          }
          NlayoutedNodes.push(
            {
              id: e.id,
              name: e.name,
              type_name:e.type_name,
              position: e.position,
              data: {
                label: e.data.label + ", with type " + e.type_name,
              },
              parentId:e.parentId,
              style: { ...e.style, backgroundColor: backgroundC, color: "white", fontSize: "11px" },
              targetPosition: e.targetPosition,
              sourcePosition: e.sourcePosition,
            }
          )
        })
        console.log("layouted");
        console.log(NlayoutedNodes);
        console.log("flow",NlayoutedNodes.filter(e=>e.parentId==NlayoutedNodes.filter(f=>f.name=="flow")[0].id).length)
        console.log("actor performer",NlayoutedNodes.filter(e=>e.parentId==NlayoutedNodes.filter(f=>f.name=="actor performer")[0].id).length)
        console.log("edges");
        console.log(newEdgesCopy);
        
        console.log(getConnections(newEdgesCopy));
        console.log(getTypes(NlayoutedNodes));
                
        setNodes(NlayoutedNodes);
        setEdges(() => newEdgesCopy)

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

  // 
  


  // 
  // 

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    fileInputRef.current.value = null;
    if (file) {
      try {
        const content = await readFileContent(file);
        const jsonContent = JSON.parse(content);
        setProcess(jsonContent.process)
        setNodes(jsonContent.nodes)
        setEdges(jsonContent.edges)
        console.log('Parsed JSON Content:', jsonContent);
      } catch (error) {
        toast({
          title: "❌ Error!",
          description: `something went wrong sorry.`,
        });
      }
    } else {
      toast({
        title: "❌ Error!",
        description: `we accept donut files only, sorry.`,
      });
    }
  };

  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  const triggerFileInput = () => {
    document.getElementById('hiddenFileInput').click();
  };
  /////
  const onNodeDoubleClick = async (_, node) => {

    console.log(node);
  };

  const exportToJson = (e) => {
    e.preventDefault();
    downloadFile({
      data: JSON.stringify({ "nodes": nodes, "edges": edges, "process": process }),
      fileName: 'diagram.donut',
      fileType: 'text/json',
    });
  };
  let processes = [
    {
      id: 0,
      name: "Customized Bicycle Order Fulfillment"
    },
    {
      id: 1,
      name: "Customer Computer Repair"
    },
    {
      id: 2,
      name: "Room Service Order Process"
    },
    {
      id: 3,
      name: "The IPO Underwriting"
    },
    {
      id: 18,
      name: "Power Supplier Switch-Over"
    },
    {
      id: 19,
      name: "Service Degradation Resolution"
    },
  ]
  return (
    <>
      {discussionOpen ? <>
        <CustomViewer process_description={process} messages={discussion}></CustomViewer>
        {/* <Button>Close PDF Viewer</Button> */}
        <button style={{
          color: "white", backgroundColor: "#4f4f4f",
          paddingLeft: "5px",
          paddingRight: "5px",
          paddingTop: "2px",
          paddingBottom: "2px",
        }}
          onClick={() => {
            setDiscussionOpen(false)
          }}
        >Close PDF Viewer</button>
        <span style={{
          paddingLeft: "10px",
          fontWeight: "bold"
        }}>You Can Download The PDF Using The Browser Download Icon.</span>
      </> : <>


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
              <InsertValueAreaModal
                placeholder={"write here.."}
                isOpen={changeProcess}
                defaultValue={newProcess}
                setIsOpen={setChangeProcess}
                label={"Edit"}
                supTitle={"edit the process content."}
                title={"Edited Process Description By The Spelling Checker"}
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
                        ref={ref}
                        onPaneClick={onPaneClick}
                        onNodeContextMenu={onNodeContextMenu}
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
                        {menu && <CustomContextMenu onClick={onPaneClick} {...menu} onEdit={(id) => {
                          setEditNameModalOpen(true)
                          setEditId(id)
                        }} />}

                      </ReactFlow>
                    </ContextMenuTrigger>

                    <ContextMenuContent className="w-64">
                      {!isGenerating && (
                        <>
                          <ContextMenuSub style={{
                                  width:"500px"
                                }}>
                            <ContextMenuSubTrigger inset>Visualize</ContextMenuSubTrigger>
                            <ContextMenuSubContent className="w-64">
                              {processes.map((e) => <>
                                <ContextMenuItem 
                               
                                onClick={() => {
                                  generateWithGroq(e.id)
                                }}>
                                  {e.name}  
                                </ContextMenuItem>

                              </>)}

                            </ContextMenuSubContent>
                            <ContextMenuSeparator />
                            {(nodes.length != 0 || process != "") && <>
                              <ContextMenuItem
                                inset
                                onClick={(e) => {
                                  exportToJson(e)
                                }}
                              >
                                Download
                                <ContextMenuShortcut>⌘</ContextMenuShortcut>
                              </ContextMenuItem>

                            </>}
                            <ContextMenuItem
                              inset
                              onClick={triggerFileInput}
                            >
                              Upload


                              <ContextMenuShortcut>⌘</ContextMenuShortcut>
                            </ContextMenuItem>
                          </ContextMenuSub>
                        </>

                      )}

                    </ContextMenuContent>

                  </ContextMenu>
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </ReactFlowProvider>
        </>
      </>}
      <input
        type="file"
        id="hiddenFileInput"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept=".donut"
        ref={fileInputRef}

      />
    </>

  );
};

export default MainDesigner;
