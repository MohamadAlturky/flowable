import { MarkerType } from '@xyflow/react';

export function addIdToTransitions(transitions) {
    return transitions.map(transition => ({
        source: transition.from,
        target: transition.to,
        markerEnd: {
            type: MarkerType.Arrow,
        },
        label: transition.condition && transition.condition || '',
        id: `${transition.from.replace(/\s+/g, '_')}_${transition.to.replace(/\s+/g, '_')}`
    }));
}
export function addIdToNodes(nodes) {
    return nodes.map(node => ({
        ...node,
        id: node.name,
        position: { x: 1, y: 8 },
        data: { label: node.name },
        style: {
            backgroundColor: "#4a00ff33",
            border: "1px solid rgb(26, 25, 43)"
        }
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
                nodeMap[node.parentId].children.push(nodeMap[node.id]);
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
            width: childrenWidth + 200 * Math.ceil(Math.SQRT2(node.children.length)),
            height: childrenHeights + 100 * Math.ceil(Math.SQRT2(node.children.length))
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

           else  if (outcomingEdges.length > 0) {
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
