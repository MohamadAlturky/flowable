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



export default function InterEventBuilder(position, type, nodes, name, setNodes, getId) {
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
            width: 70,
            height: 70,
            backgroundColor: 'rgba(208, 192, 247, 0.2)',
            borderRadius: '50%',
            border: '1px solid #1a192b',
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        extent: "parent",
        parentId: parent.id,
    };
}

// setNodes((nds) => nds.concat({
//     id: getId(),
//     type: _type,
//     position: _position,
//     data: { label: "event" },
//     resizable: true,
//     style: {
//       width: 70,
//       height: 70,
//       backgroundColor: 'rgba(208, 192, 247, 0.2)',
//       borderRadius: '50%',
//       border: '1px solid #1a192b',
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//     }
//   }));

//   setNodes((nds) => nds.concat({
//     id: getId(),
//     type: _type,
//     position: _position,
//     data: { label: "event" },
//     resizable: true,
//     style: {
//       width: 70,
//       height: 70,
//       backgroundColor: 'rgba(208, 192, 247, 0.2)',
//       borderRadius: '50%',
//       border: '4px solid #1a192b',
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center"
//     }
//   }));
  
//   setNodes((nds) => nds.concat({
//     id: getId(),
//     type: _type,
//     position: _position,
//     data: { label: "event" },
//     resizable: true,
//     style: {
//       width: 70,
//       height: 70,
//       backgroundColor: 'rgba(208, 192, 247, 0.2)',
//       borderRadius: '50%',
//       border: '1px solid #1a192b',
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center"
//     }
//   }));