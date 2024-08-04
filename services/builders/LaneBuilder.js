export default function BuildLaneNode(nodes, name,parent,getId,setNodes) {
    let node = nodes.filter(e=>e.id == parent)[0]
    console.log(node);
    return {
        id: getId(),
        type:"swimlane",
        data: { label: `${name}`,displayOrder:2,setNodes:setNodes },
        resizable: true,
        style: {
            width: node.measured.width - 51,
            height: 100,
            // backgroundColor: "rgba(50, 192, 247, 0.2)",
            // borderRadius: '3px',
            zIndex:100,
            backgroundColor:"white",
            border: '1px solid #1a192b'
        },
        parentId: parent,
        position: { x: 51, y: 0 },
        extent: "parent",
    };
}