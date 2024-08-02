"use client";
import { PuffLoader } from "react-spinners";

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
import EndEventNode from "./EndEventNode";
import ButtonEdge from "./ButtonEdge";
import Activity from "./Activity";
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
  interevent: IntermediateEventNode,
  endevent: EndEventNode,
  startevent: StartEventNode
};
import InterEventBuilder from "../services/DragAndDrop/InterEventBuilder";
import EndEventBuilder from "../services/DragAndDrop/EndEventBuilder";
import StartEventBuilder from "../services/DragAndDrop/StartEventBuilder";

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
import MainSidebar from "./MainSidebar";
import apiUrl from "../configurations/apiConfiguration.json";

const OverviewFlow = () => {
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
      if (_type == "activity") {
        setActivityModalOpen(true);
      }
      if (_type == "startevent") {
        setEventModalOpen(true)
      }
      if (_type == "interevent") {
        setEventModalOpen(true)
      }
      if (_type == "endevent") {
        setEventModalOpen(true)
      }
    }
  };
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
    axiosInstance.post(apiUrl.baseUrl + "/generate/report", data)
      .then(res => {
        console.log(res.data.report);
        setReport(res.data.report)
        toast({
          title: "✅ Greate!",
          description: `the report generated successfully.`,
        });
      }).catch(err => {
        console.log(err)
        console.log(err.toJSON())
        toast({
          title: "❌ Error!",
          description: `error occured sorry!`,
        });
      }).finally(() => {
        setIsGenerating(false)
      });
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
                      <ContextMenuItem inset

                        onClick={(e) => {
                          generate()
                        }}
                      >
                        Generate Diagram
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
                          <ContextMenuSeparator />
                          <ContextMenuItem>Diagram Merge Tools</ContextMenuItem>
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
                supTitle={"set the task name."}
                title={"Write Task Name"}
                setValueName={async (v) => {

                  let node = null

                  if (type == "startevent") {
                    node = StartEventBuilder(
                      position,
                      type,
                      nodes,
                      v,
                      setNodes,
                      getId
                    );
                  }
                  if (type == "interevent") {
                    node = InterEventBuilder(
                      position,
                      type,
                      nodes,
                      v,
                      setNodes,
                      getId
                    );
                  }
                  if (type == "endevent") {
                    node = EndEventBuilder(
                      position,
                      type,
                      nodes,
                      v,
                      setNodes,
                      getId
                    );
                  }

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
                  <ReportModal isOpen={reportModalOpen} setIsOpen={setReportModalOpen} title={"Events Report"} supTitle={"this report is generated by AI."} report={report.events_report.content} />
                  <ReportModal isOpen={tasksReportModalOpen} setIsOpen={setTasksReportModalOpen} title={"Tasks Report"} supTitle={"this report is generated by AI."} report={report.tasks_report.content} />
                  <GatewaysReportModal isOpen={gatewaysReportModalOpen} setIsOpen={setGatewaysReportModalOpen} title={"Gateways Report"} supTitle={"this report is generated by AI."} report={report.gateways_report.content} />
                  <PoolsReportModal isOpen={poolsReportModalOpen} setIsOpen={setPoolsReportModalOpen} title={"Pools And Lanes Report"} supTitle={"this report is generated by AI."} report={report.poolsLanes_report.content.pools} />
                </>
              )}
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </ReactFlowProvider>
    </>
  );
};

export default OverviewFlow;
