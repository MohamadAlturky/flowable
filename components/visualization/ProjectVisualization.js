"use client"
import { useRef, useState,useEffect } from 'react';
import { FitViewIcon } from "./Icons/FitView";

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
import { Button } from '@/components/ui/button'
import {
    ReactFlow,
    ReactFlowProvider,
    addEdge,
    Panel,
    Controls,
    MiniMap,
    ControlButton,
    useNodesState,
    useEdgesState,
    Background,
    MarkerType,
    useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import './index.css';

const position = { x: 0, y: 0 };

export const initialNodes = [
    {
        id: '1',
        type: 'input',
        data: { label: 'input' },
        position,
    },
    {
        id: '2',
        data: { label: 'node 2' },
        position,
    },
    {
        id: '2a',
        data: { label: 'node 2a' },
        position,
    },
    {
        id: '2b',
        data: { label: 'node 2b' },
        position,
    },
    {
        id: '2c',
        data: { label: 'node 2c' },
        position,
    },
    {
        id: '2d',
        data: { label: 'node 2d' },
        position,
    },
    {
        id: '3',
        data: { label: 'node 3' },
        position,
    },
    {
        id: '4',
        data: { label: 'node 4' },
        position,
    },
    {
        id: '5',
        data: { label: 'node 5' },
        position,
    },
    {
        id: '6',
        type: 'output',
        data: { label: 'output' },
        position,
    },
    { id: '7', type: 'output', data: { label: 'output' }, position },
];

export const initialEdges = [
    { id: 'e12', source: '1', target: '2', type: 'smoothstep',markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: '#1976d2',
      },
    //   label: 'marker size and color',
      style: {
        strokeWidth: 2,
        stroke: '#1976d2',
      } },
    { id: 'e13', source: '1', target: '3', type: 'smoothstep' },
    { id: 'e22a', source: '2', target: '2a', type: 'smoothstep' },
    { id: 'e22b', source: '2', target: '2b', type: 'smoothstep' },
    { id: 'e22c', source: '2', target: '2c', type: 'smoothstep' },
    { id: 'e2c2d', source: '2c', target: '2d', type: 'smoothstep' },
    { id: 'e45', source: '4', target: '5', type: 'smoothstep' },
    { id: 'e56', source: '5', target: '6', type: 'smoothstep' },
    { id: 'e57', source: '5', target: '7', type: 'smoothstep' },
];
import { axiosInstance } from "../../contexts/api"
import { getAuthTokens } from "../../services/auth/AuthServices"
import ELK from 'elkjs/lib/elk.bundled.js';
import React, { useCallback, useLayoutEffect } from 'react';

const elk = new ELK();

const elkOptions = {
    'elk.algorithm': 'layered',
    'elk.layered.spacing.nodeNodeBetweenLayers': '100',
    'elk.spacing.nodeNode': '80',
};

const getLayoutedElements = (nodes, edges, options = {}) => {
    const isHorizontal = options?.['elk.direction'] === 'RIGHT';
    const graph = {
        id: 'root',
        layoutOptions: options,
        children: nodes.map((node) => ({
            ...node,
            targetPosition: isHorizontal ? 'left' : 'top',
            sourcePosition: isHorizontal ? 'right' : 'bottom',

            width: 150,
            height: 50,
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

const AddNodeOnEdgeDrop = ({id}) => {
    const reactFlowWrapper = useRef(null);
    const connectingNodeId = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const { screenToFlowPosition } = useReactFlow();

    const [reactFlowInstance, setReactFlowInstance] = useState();
    const onInit = (rfi) => setReactFlowInstance(rfi);

    const onLayout = useCallback(
        ({ direction, useInitialNodes = false }) => {
            const opts = { 'elk.direction': direction, ...elkOptions };
            const ns = useInitialNodes ? initialNodes : nodes;
            const es = useInitialNodes ? initialEdges : edges;

            getLayoutedElements(ns, es, opts).then(
                ({ nodes: layoutedNodes, edges: layoutedEdges }) => {
                    setNodes(layoutedNodes);
                    setEdges(layoutedEdges);

                    window.requestAnimationFrame(() => {
                        try{
                            reactFlowInstance.fitView({
                                duration: 1200,
                                padding: 0.3,
                            })
                        }
                        catch(e){
                            console.log(e);
                            
                        }
                    });
                },
            );
        },
        [nodes, edges],
    );

    
    useLayoutEffect(() => {
        onLayout({ direction: 'DOWN', useInitialNodes: true });
    }, []);

    // 
    useEffect(() => {
        const fetchActivities = async () => {
          try {
            const payload = {
              "filter": {
                "paginatedRequest": {
                  "pageSize": 5000,
                  "pageNumber": 1,
                },
                "project": id, 
                "orderByIdDescending": true,
                "orderByIdAscending": false,
                "orderByActivityTypeDescending": true,
                "orderByActivityTypeAscending": false,
                "orderByActivityResourceTypeDescending": true,
                "orderByActivityResourceTypeAscending": false,
                "orderByProjectDescending": true,
                "orderByProjectAscending": false,
                "orderByDateDescending": true,
                "orderByDateAscending": false,
                "includeProject": true,
                "includeActivityType": true,
                "includeActivityResourceType": true,
                "includeActivityPrecedentPrecedent": true,
              },
            };
            let token = getAuthTokens().accessToken

            const response = await axiosInstance.post('/api/activities/filter', payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            console.log('Response:', response.data);
          } catch (error) {
            console.error('Error fetching activities:', error);
          }
        };
    
        fetchActivities();
      }, []);
    

    // 
    return (
        <>
            <ContextMenu>
                <ContextMenuTrigger>
                    <div className="wrapper" ref={reactFlowWrapper}>
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            fitViewOptions={{ padding: 2 }}
                            onInit={onInit}

                        >
                            <Background variant='lines' />
                            <MiniMap zoomable pannable />

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
                            </Controls>                        </ReactFlow>
                    </div>

                </ContextMenuTrigger>
                <ContextMenuContent className="z-10000 w-64">
                    <ContextMenuItem inset>
                        New Diagram
                        <ContextMenuShortcut>⌘</ContextMenuShortcut>
                    </ContextMenuItem>

                    <ContextMenuItem inset onClick={() => onLayout({ direction: 'DOWN' })}>
                        Vertical layout
                        <ContextMenuShortcut>⌘</ContextMenuShortcut>
                    </ContextMenuItem>

                    <ContextMenuItem inset onClick={() => onLayout({ direction: 'RIGHT' })}>
                        Horizontal layout

                        <ContextMenuShortcut>⌘</ContextMenuShortcut>
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
        </>
    );
};

export default ({id}) => (
    <ReactFlowProvider>
        <AddNodeOnEdgeDrop id={id}/>
    </ReactFlowProvider>
);
