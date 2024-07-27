export default function BuildLaneNode(nodes, name,parent) {
    return {
        id: name,
        type:"swimlane",
        data: { label: `${name}` },
        resizable: true,
        style: {
            width: 200,
            height: 100,
            backgroundColor: "rgba(50, 192, 247, 0.2)",
            borderRadius: '3px',
            border: '1px solid #1a192b'
        },
        parentId: parent,
        position: { x: 51, y: 0 },
        extent: "parent",
    };
}