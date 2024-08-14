import { MarkerType } from '@xyflow/react';

export function addIdToTransitions(transitions) {
    return transitions.map(transition => ({
        source: transition.source,
        target: transition.target,
        markerEnd: {
            type: MarkerType.Arrow,
        },
        label: transition.condition && transition.condition || '',
        id: `${transition.source.replace(/\s+/g, '_')}_${transition.target.replace(/\s+/g, '_')}`
    }));
}
export function addIdToTransitionsNew(transitions) {
    return transitions.map(transition => ({
        source: transition.source,
        target: transition.target,
        markerEnd: {
            type: MarkerType.Arrow,
        },
        label: transition.condition && transition.condition || '',
        id: `${transition.source.replace(/\s+/g, '_')}_${transition.target.replace(/\s+/g, '_')}`
    }));
}
export function addIdToNodes(nodes) {
    return nodes.map(node => ({
        ...node,
        // id: node.name,
        position: { x: 1, y: 8 },
        data: { label: node.name },
        style: {
            backgroundColor: "#4a00ff33",
            border: "1px solid rgb(26, 25, 43)"
        },
        extent:"parent"
    }));
}
// export function updateParentIds(nodes, edges) {
//     // Create a map of node IDs to nodes for quick lookup
//     const nodeMap = nodes.reduce((map, node) => {
//         map[node.id] = node;
//         return map;
//     }, {});

//     // Iterate over the nodes to find those with parentId == null and type != "pool"
//     nodes.forEach(node => {
//         if (node.parentId === null && node.type !== "pool") {
//             // Find the edges where this node is a target
//             const incomingEdges = edges.filter(edge => edge.target === node.id);
//             const outcomingEdges = edges.filter(edge => edge.source === node.id);

//             // Check if there are incoming edges
//             if (incomingEdges.length > 0) {
//                 // Get the source node of the first incoming edge
//                 const siblingNodeId = incomingEdges[0].source;
//                 const siblingNode = nodeMap[siblingNodeId];

//                 // Set the parentId of the current node to the parentId of the sibling node
//                 if (siblingNode) {
//                     node.parentId = siblingNode.parentId;
//                 }
//             }
//             // Check if there are incoming edges
//             else if (outcomingEdges.length > 0) {
//                 // Get the source node of the first incoming edge
//                 const siblingNodeId = outcomingEdges[0].target;
//                 const siblingNode = nodeMap[siblingNodeId];

//                 // Set the parentId of the current node to the parentId of the sibling node
//                 if (siblingNode) {
//                     node.parentId = siblingNode.parentId;
//                 }
//             }
//         }
//     });

//     return nodes;
// }

export function buildTree(nodes) {
    const nodeMap = {};
    const tree = [];

    nodes.forEach(node => {
        nodeMap[node.id] = { ...node, children: [] };
    });


    nodes.forEach(node => {
        if (node.parentId === null) {

            tree.push(nodeMap[node.id]);
        } else {

            if (nodeMap[node.parentId]) {
                nodeMap[node.parentId].children.push({
                    ...nodeMap[node.id]
                    , extend: "parent"
                });
            }
        }
    });

    return tree;
}

export function calculateDimensions(node) {
    if (node.children.length === 0) {

        node.style = {
            ...node.style,
            width: 50 + node.name.length * 6,
            height: 40
        }
    } else {

        let childrenWidth = 0;
        let childrenHeights = 0;
        node.children.forEach(child => {
            let dimensions = calculateDimensions(child)
            childrenWidth += dimensions[0]
            childrenHeights += dimensions[1]
        });
        node.style = {
            ...node.style,
            width: childrenWidth + 200 * Math.ceil(Math.sqrt(node.children.length)),
            height: childrenHeights + 100 * Math.ceil(Math.sqrt(node.children.length))
        }
    }
    return [node.style.width, node.style.height];
}




export function flattenTree(node) {
    let nodes = [];


    function traverse(currentNode) {

        nodes.push(currentNode);


        if (currentNode.children && currentNode.children.length > 0) {
            currentNode.children.forEach(child => traverse(child));
        }
    }


    traverse(node);

    return nodes;
}


export function adjustNodesPositions(nodes) {
    const gridSize = Math.ceil(Math.sqrt(nodes.length));
    const xOffset = 200;
    const yOffset = 100;

    return nodes.map((node, index) => {
        if (node.children.length != 0) {
            node.children = adjustNodesPositions(node.children)
        }
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;
        return {
            ...node,
            position: {
                x: col * xOffset,
                y: row * yOffset,
            }
        };
    });
}


export function updateParentIds(nodes, edges) {
    const nodeMap = nodes.reduce((map, node) => {
        map[node.id] = node;
        return map;
    }, {});

    nodes.forEach(node => {
        if (node.parentId === null && node.type !== "pool") {
            const incomingEdges = edges.filter(edge => edge.target === node.id);
            const outcomingEdges = edges.filter(edge => edge.source === node.id);

            if (incomingEdges.length > 0) {
                const siblingNodeId = incomingEdges[0].source;
                const siblingNode = nodeMap[siblingNodeId];

                if (siblingNode) {
                    node.parentId = siblingNode.parentId;
                }
            }

            else if (outcomingEdges.length > 0) {
                const siblingNodeId = outcomingEdges[0].target;
                const siblingNode = nodeMap[siblingNodeId];

                if (siblingNode) {
                    node.parentId = siblingNode.parentId;
                }
            }
        }
    });

    return nodes;
}



import ELK from 'elkjs/lib/elk.bundled.js';

const elk = new ELK();

const elkOptions = {
  'elk.algorithm': 'layered',
  'elk.layered.spacing.nodeNodeBetweenLayers': '600',
  'elk.spacing.nodeNode': '500',
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

    //   width: 50 + (node.data.label.length * 7),
    //   height: 45,
      width: node.style.width,
      height: node.style.height,
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



function aggregateNodesByParentId(nodes) {
    const aggregatedNodes = {};
  
    nodes.forEach(node => {
      const { parentId } = node;
  
      if (!aggregatedNodes[parentId]) {
        aggregatedNodes[parentId] = [];
      }
  
      aggregatedNodes[parentId].push(node);
    });
  
    return aggregatedNodes;
  }
//   function aggregateEdgesByNodeGroup(edges, aggregatedNodes) {
//   const aggregatedEdges = {};

//   // Create a reverse lookup for nodeId to parentId
//   const nodeToParentMap = {};
//   for (const parentId in aggregatedNodes) {
//     aggregatedNodes[parentId].forEach(node => {
//       nodeToParentMap[node.id] = parentId;
//     });
//   }

//   edges.forEach(edge => {
//     const sourceParentId = nodeToParentMap[edge.source];
//     const targetParentId = nodeToParentMap[edge.target];

//     // Only aggregate edges where both source and target have the same parentId
//     if (sourceParentId && sourceParentId === targetParentId) {
//       if (!aggregatedEdges[sourceParentId]) {
//         aggregatedEdges[sourceParentId] = [];
//       }
//       aggregatedEdges[sourceParentId].push(edge);
//     }
//   });

//   return aggregatedEdges;
// }


function aggregateEdgesByNodeGroup(edges, aggregatedNodes) {
    const aggregatedEdges = {};
  
    // Create a reverse lookup for nodeId to parentId
    const nodeToParentMap = {};
    for (const parentId in aggregatedNodes) {
      aggregatedNodes[parentId].forEach(node => {
        nodeToParentMap[node.id] = parentId;
      });
    }
  
    edges.forEach(edge => {
      const sourceParentId = nodeToParentMap[edge.source];
      const targetParentId = nodeToParentMap[edge.target];
  
      // Only aggregate edges where both source and target have the same parentId
      if (sourceParentId && sourceParentId === targetParentId) {
        if (!aggregatedEdges[sourceParentId]) {
          aggregatedEdges[sourceParentId] = [];
        }
        aggregatedEdges[sourceParentId].push(edge);
      }
    });
  
    return aggregatedEdges;
  }

  
  export async function ADJUST(nodes, edges) {
      
      const aggregated = aggregateNodesByParentId(nodes);
      console.log(aggregated);
      
      const aggregatedEdges = aggregateEdgesByNodeGroup(edges, aggregated);
      console.log(aggregatedEdges);
      let layouted = []
      const opts = { 'elk.direction': "RIGHT", ...elkOptions };

      for (const parentId in aggregated) {
        const nodesGroup = aggregated[parentId];
        const edgesGroup = aggregatedEdges[parentId] || [];
        const layoutedElements = await getLayoutedElements(nodesGroup, edgesGroup,opts);
        console.log(layoutedElements);
        
        layouted.push(...(layoutedElements.nodes))
        console.log(`Layouted elements for parentId ${parentId}:`, layoutedElements);
      }

      console.log(layouted);
      return {nodes :layouted,edges:edges}
    // console.log("nodes");
    // console.log(nodes);
    // console.log("edges");
    // console.log( edges);
    
    // let newNodes = addIdToNodes(nodes)
    // // console.log(newNodes);
    // let newEdges = addIdToTransitionsNew(edges)
    // // console.log(newEdges);
    // newNodes = updateParentIds(newNodes, newEdges)
    // let tree = buildTree(newNodes)
    // // console.log(tree);
    // tree.forEach(rootNode => calculateDimensions(rootNode));
    // console.log(tree);
    // tree = adjustNodesPositions(tree)
    
    // // let NewNewNodes = []
    // // tree.forEach(e => e.children = getLayoutedElements(e.children,newEdges.filter(ed=>ed)).nodes)
    
    // // let LASTNewNewNodes = []

    // let lastNodes = []

    // tree.forEach(rootNode => lastNodes.push(...flattenTree(rootNode)));
    // console.log(tree);
    // // console.log(updateParentIds(newNodes,newEdges))
    // // console.log(flattenAggregatedNodes(aggregateNodes(res.data.nodes,adjustNodes)));
    // console.log("lastNodes");
    // console.log(lastNodes);
    // console.log("newEdges");
    // console.log(newEdges);



    // return { lastNodes, newEdges }
}


