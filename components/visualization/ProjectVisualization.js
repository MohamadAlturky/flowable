"use client"
import React, { useCallback, useRef } from 'react';

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
    ReactFlow,
    useNodesState,
    useEdgesState,
    addEdge,
    useReactFlow,
    ReactFlowProvider,
    MiniMap,
    Background,
    Controls
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import './index.css';

const initialNodes = [
    {
        id: '0',
        type: 'input',
        data: { label: 'Process' },
        position: { x: 0, y: 50 },
    },
];

let id = 1;
const getId = () => `${id++}`;

const AddNodeOnEdgeDrop = () => {
    const reactFlowWrapper = useRef(null);
    const connectingNodeId = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const { screenToFlowPosition } = useReactFlow();
    const onConnect = useCallback((params) => {
        // reset the start node on connections
        connectingNodeId.current = null;
        setEdges((eds) => addEdge(params, eds));
    }, []);

    const onConnectStart = useCallback((_, { nodeId }) => {
        connectingNodeId.current = nodeId;
    }, []);

    const onConnectEnd = useCallback(
        (event) => {
            if (!connectingNodeId.current) return;

            const targetIsPane = event.target.classList.contains('react-flow__pane');

            if (targetIsPane) {
                // we need to remove the wrapper bounds, in order to get the correct position
                const id = getId();
                const newNode = {
                    id,
                    position: screenToFlowPosition({
                        x: event.clientX,
                        y: event.clientY,
                    }),
                    data: { label: `Node ${id}` },
                    origin: [0.5, 0.0],
                };

                setNodes((nds) => nds.concat(newNode));
                setEdges((eds) =>
                    eds.concat({ id, source: connectingNodeId.current, target: id, animated: true }),
                );
            }
        },
        [screenToFlowPosition],
    );

    return (
        <>
            {/* <div style={{
                // zIndex: 10
            }}> */}
            <ContextMenu>
                <ContextMenuTrigger>
                    <div className="wrapper" ref={reactFlowWrapper}>
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                            onConnectStart={onConnectStart}
                            onConnectEnd={onConnectEnd}
                            fitView
                            fitViewOptions={{ padding: 2 }}
                            nodeOrigin={[0.5, 0]}>
                            <MiniMap zoomable pannable />
                            <Controls />
                            <Background variant='lines' />
                        </ReactFlow>
                    </div>

                </ContextMenuTrigger>
                <ContextMenuContent className="z-10000 w-64">
                    <ContextMenuItem inset>
                        New Business Process
                        <ContextMenuShortcut>⌘</ContextMenuShortcut>
                    </ContextMenuItem>
                    {/* <ContextMenuItem inset disabled>
                        Forward
                        <ContextMenuShortcut>⌘</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuItem inset>
                        Reload
                        <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuSub>
                        <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
                        <ContextMenuSubContent className="w-48">
                            <ContextMenuItem>
                                Save Page As...
                                <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
                            </ContextMenuItem>
                            <ContextMenuItem>Create Shortcut...</ContextMenuItem>
                            <ContextMenuItem>Name Window...</ContextMenuItem>
                            <ContextMenuSeparator />
                            <ContextMenuItem>Developer Tools</ContextMenuItem>
                        </ContextMenuSubContent>
                    </ContextMenuSub>
                    <ContextMenuSeparator />
                    <ContextMenuCheckboxItem checked>
                        Show Bookmarks Bar
                        <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
                    </ContextMenuCheckboxItem>
                    <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
                    <ContextMenuSeparator />
                    <ContextMenuRadioGroup value="pedro">
                        <ContextMenuLabel inset>People</ContextMenuLabel>
                        <ContextMenuSeparator />
                        <ContextMenuRadioItem value="pedro">
                            Pedro Duarte
                        </ContextMenuRadioItem>
                        <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
                    </ContextMenuRadioGroup>*/}
                </ContextMenuContent> 
            </ContextMenu>
            {/* </div> */}
        </>
    );
};

export default () => (
    <ReactFlowProvider>
        <AddNodeOnEdgeDrop />
    </ReactFlowProvider>
);
