import BuildGatewayNode from "./BuildGatewayNode"
import BuildPoolNode from "./PoolBuilder"
import BuildActivityNode from "./BuildActivityNode"

export default function BuildNode(position, type, nodes, name) {

    if (type == "pool") {
        return BuildPoolNode(position, type, nodes, name);
    }
    // if (type == "activity") {
    //     return  BuildActivityNode(position, type, nodes);
    // }
    // if (type == "gateway") {
    //     return BuildGatewayNode(position, type, nodes);
    // }
    return null
}

