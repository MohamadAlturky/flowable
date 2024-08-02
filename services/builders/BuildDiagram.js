function buildNodesAndEdges(data) {
    const nodes = {};
    const edges = [];

    // Create nodes from connections
    data.connections.forEach((connection) => {
        if (!nodes[connection.source_name]) {
            nodes[connection.source_name] = {
                id: connection.source_name,
                type: connection.source_type,
                data: { label: connection.source_name }
            };
        }

        if (!nodes[connection.destination_name]) {
            nodes[connection.destination_name] = {
                id: connection.destination_name,
                type: connection.destination_type,
                data: { label: connection.destination_name }
            };
        }

        edges.push({
            id: `${connection.source_name}->${connection.destination_name}`,
            source: connection.source_name,
            target: connection.destination_name
        });
    });
    // console.log(nodes);

    if (data.annotations && data.annotations.length > 0) {
        data.annotations.forEach((annotation) => {
            console.log(annotation.component_name);
            // console.log(nodes[annotation.components_name]);
            
            if (nodes[annotation.component_name]) {
                // console.log(nodes[annotation.components_name]);
                
                nodes[annotation.component_name] = {
                    ...nodes[annotation.component_name],
                    parentId: annotation.participant_name
                }
            }

            // if (!nodes[annotation.participant_name]) {
            //     nodes[annotation.participant_name] = {
            //         id: annotation.participant_name,
            //         type: 'participant',
            //         data: { label: annotation.participant_name }
            //     };
            // }
        });
    }

    return { nodes, edges };
}

// Example usage:
const data = {
    "connections": [
        {
            "source_name": "Login",
            "source_type": "User Task",
            "destination_name": "Order Initiated",
            "destination_type": "Start Event"
        },
        {
            "source_name": "Order Initiated",
            "source_type": "Start Event",
            "destination_name": "Select Items & Payment Method",
            "destination_type": "User Task"
        },
        {
            "source_name": "Select Items & Payment Method",
            "source_type": "User Task",
            "destination_name": "Order Placed",
            "destination_type": "Intermediate Event"
        },
        {
            "source_name": "Select Items & Payment Method",
            "source_type": "User Task",
            "destination_name": "Free Reward Selection",
            "destination_type": "Inclusive Gateway"
        },
        {
            "source_name": "Free Reward Selection",
            "source_type": "Inclusive Gateway",
            "destination_name": "Choose Reward Option",
            "destination_type": "User Task"
        },
        {
            "source_name": "Choose Reward Option",
            "source_type": "User Task",
            "destination_name": "Order Placed",
            "destination_type": "Intermediate Event"
        },
        {
            "source_name": "Select Items & Payment Method",
            "source_type": "User Task",
            "destination_name": "Payment and Delivery",
            "destination_type": "Parallel Gateway"
        },
        {
            "source_name": "Order Placed",
            "source_type": "Intermediate Event",
            "destination_name": "Payment and Delivery",
            "destination_type": "Parallel Gateway"
        },
        {
            "source_name": "Payment and Delivery",
            "source_type": "Parallel Gateway",
            "destination_name": "Pay or Complete Installment Agreement",
            "destination_type": "Service Task"
        },
        {
            "source_name": "Pay or Complete Installment Agreement",
            "source_type": "Service Task",
            "destination_name": "Payment Received",
            "destination_type": "Intermediate Event"
        },
        {
            "source_name": "Payment and Delivery",
            "source_type": "Parallel Gateway",
            "destination_name": "Item Delivered",
            "destination_type": "Intermediate Event"
        },
        {
            "source_name": "Item Delivered",
            "source_type": "Intermediate Event",
            "destination_name": "Order Completed",
            "destination_type": "End Event"
        },
        {
            "source_name": "Choose Reward Option",
            "source_type": "User Task",
            "destination_name": "Order Placed",
            "destination_type": "Intermediate Event"
        },
        {
            "source_name": "Select Items & Payment Method",
            "source_type": "User Task",
            "destination_name": "Return Requested",
            "destination_type": "Intermediate Event"
        },
        {
            "source_name": "Return Requested",
            "source_type": "Intermediate Event",
            "destination_name": "Return & Exchange Items",
            "destination_type": "Manual Task"
        },
        {
            "source_name": "Return & Exchange Items",
            "source_type": "Manual Task",
            "destination_name": "Item Delivered",
            "destination_type": "Intermediate Event"
        },
        {
            "source_name": "Item Delivered",
            "source_type": "Intermediate Event",
            "destination_name": "Order Completed",
            "destination_type": "End Event"
        }
    ],
    "annotations": [
        {
            "component_name": "Login",
            "participant_name": "Online Shop"
        },
        {
            "component_name": "Order Initiated",
            "participant_name": "User"
        },
        {
            "component_name": "Select Items & Payment Method",
            "participant_name": "User"
        },
        {
            "component_name": "Pay or Complete Installment Agreement",
            "participant_name": "Order Management (processing payments)"
        },
        {
            "component_name": "Free Reward Selection",
            "participant_name": "Rewards (offering multiple options)"
        },
        {
            "component_name": "Choose Reward Option",
            "participant_name": "Rewards (offering multiple options)"
        },
        {
            "component_name": "Item Delivered",
            "participant_name": "Online Shop"
        },
        {
            "component_name": "Return & Exchange Items",
            "participant_name": "Order Management (managing user's account)"
        }
    ]
}
const result = buildNodesAndEdges(data);

// console.log("data.connections");
// console.log(data.connections);

// console.log("data.annotations");
// console.log(data.annotations);

// console.log("result.nodes");
console.log();
// console.log("result.edges");
// console.log(result.edges);

arr = []
Object.entries(result.nodes).forEach(([key, value]) => {
    arr.push(value)
});

console.log(arr);
