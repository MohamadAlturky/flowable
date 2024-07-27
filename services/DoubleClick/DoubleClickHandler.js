import HandleDoubleClickPoolNode from "./PoolDoubleClickHandler"
export default async function HandleDoubleClick (node, nodes) {
    
    if(node.type == "pool")
    {
        return await HandleDoubleClickPoolNode(node, nodes);
    }
    return nodes
}
