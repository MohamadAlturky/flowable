
export default function BuildPoolNode(position, type, nodes, name, setNodes,getId) {
    return {
        id: getId(),
        type,
        position,
        data: { label: `${name}`, setNodes: setNodes, getId:getId,displayOrder:1 },
        resizable: true,
        style: {
            width: 500,
            height: 200,
            zIndex:100,
            backgroundColor:"white",
            border: '1px solid #1a192b'
        }
    };
}