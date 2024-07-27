import swal from 'sweetalert';

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


export default async function BuildActivityNode(position, type, nodes) {
    // console.log("nodes");
    // console.log(nodes);
    if (nodes == undefined || nodes.length == 0) {
        return null
    }
    let parentPoolNodes = findNodeContainingPoint(position.x, position.y,
        nodes.filter(e => e.type == "pool"))

    console.log("parentPoolNodes", parentPoolNodes);
    if (parentPoolNodes.length == 0) {
        return null
    }
    console.log("nodes.filter(e => e.parentId == parentPoolNodes[0].id)",
        nodes.filter(e => e.parentId == parentPoolNodes[0].id));
    let parentLanesNodes = findNodeContainingPoint(position.x - parentPoolNodes[0].position.x,
        position.y - parentPoolNodes[0].position.y,
        nodes.filter(e => e.parentId == parentPoolNodes[0].id))

    console.log("parentLanesNodes", parentLanesNodes);

    let parent = parentLanesNodes[0]
    if (parent == undefined || parent == null) {
        parent = parentPoolNodes[0]
    }
    console.log("parent", parent);
    let title;
    let stayActive = title == "" || title == undefined;
    while (stayActive) {
        await swal({
            text: 'Enter The Activity Name',
            content: { element: "input" },
            button: {
                text: "Add",
            },
        }).then((name) => {
            title = name;
            stayActive = title == "" || title == undefined;
        });
        if (title == "" || title == undefined) {
            await swal({
                text: 'Please Specify The Activity Name 📌',
                buttons: {
                    close: {
                        text: "cancel",
                        className: "swal-button swal-button--confirm swal-button--danger"
                    },
                    ok: {
                        text: "ok",
                        className: "ok"
                    }
                },
            }).then((name) => {
                if (name == "close") {
                    stayActive = false;
                }
                else {
                }
            });
        }
    }
    if (title == "" || title == undefined) {
        return null
    }
    else {
        let width = title.length * 10 + 50
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
            id: title,
            type,
            position: {
                x: x,
                y: y,
            },
            data: { label: `${title}` },
            resizable: true,
            parentId: parent.id,
            extent: "parent",
            style: {
                width: width,
                height: 50,
                borderRadius: '3px',
                border: '1px solid #1a192b',
                fontWeight: "900",
                color: "white",
                backgroundColor: "rgb(123, 75, 242, 93)",
            }
        };
    }
}