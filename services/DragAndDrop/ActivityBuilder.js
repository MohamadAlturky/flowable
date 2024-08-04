function findNodeContainingPoint(x, y, nodes) {
    console.log("x", x);
    console.log("y", y);
    let intersections = []
    for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i]
        if (
            x >= node.position.x &&
            x <= node.position.x + node.measured.width &&
            y >= node.position.y &&
            y <= node.position.y + node.measured.height
        ) {
            intersections.push(node)
        }
    }
    return intersections;
}



export default function BuildActivityNode(position, type, nodes, name, setNodes, getId) {
    if (nodes == undefined || nodes.length == 0) {
        return null
    }
    let parentPoolNodes = findNodeContainingPoint(position.x, position.y,
        nodes.filter(e => e.type == "pool"))
    if (parentPoolNodes.length == 0) {
        return null
    }

    let parentLanesNodes = findNodeContainingPoint(position.x - parentPoolNodes[0].position.x,
        position.y - parentPoolNodes[0].position.y,
        nodes.filter(e => e.parentId == parentPoolNodes[0].id))


    let parent = parentLanesNodes[0]
    if (parent == undefined || parent == null) {
        parent = parentPoolNodes[0]
    }
    let width = name.length * 10 + 50
    let x = 0
    let y = 0
    if (parentPoolNodes[0].id == parent.id) {
        x = position.x - parentPoolNodes[0].position.x - width / 2
        y = position.y - parentPoolNodes[0].position.y - 25
    }
    else {
        x = position.x - parent.position.x - parentPoolNodes[0].position.x - width / 2
        y = position.y - parent.position.y - parentPoolNodes[0].position.y - 25
    }

    return {
        id: getId(),
        type,
        position:{x:x,y:y},
        data: { label: `${name}`, setNodes: setNodes, getId: getId, displayOrder: 3 },
        resizable: true,
        style: {
            width: width,
            height: 50,
            borderRadius: '3px',
            border: '1px solid #1a192b',
            fontWeight: "900",
            color: "white",
            backgroundColor: "rgb(123, 75, 242, 93)",
            zIndex:300
        },
        extent: "parent",
        parentId: parent.id,
    };
}

