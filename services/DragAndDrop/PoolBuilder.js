
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
            backgroundColor: 'rgba(208, 192, 247, 0.2)',
            borderRadius: '3px',
            border: '1px solid #1a192b'
        }
    };
}