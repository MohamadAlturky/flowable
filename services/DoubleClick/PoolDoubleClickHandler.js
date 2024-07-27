import swal from "sweetalert";
import Swal from "sweetalert2";
export default async function HandleDoubleClickPoolNode(node, nodes) {
    console.log(nodes);
    // let copiedNodes = [...nodes];
    //   let copiedNodes = nodes.map((x) => x);
    let copiedNodes = JSON.parse(JSON.stringify(nodes));
    await swal("Choose an operation on the pool " + node.id, {
        buttons: {
            remove: {
                text: "Remove",
                className: "warning",
            },
            edit: {
                text: "Edit",
                className: "edit",
            },
            addSwimlane: {
                text: "Add Swimlane",
            },
        },
    }).then(async (value) => {
        switch (value) {
            case "addSwimlane":
                await swal({
                    text: "Add Swimlane To The Pool" + node.id,
                    content: { element: "input" },
                    button: {
                        text: "Add",
                    },
                }).then((name) => {
                    if (!name) {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 1500,
                            timerProgressBar: true,
                            width: 430,
                            didOpen: (toast) => {
                                toast.addEventListener("mouseenter", Swal.stopTimer);
                                toast.addEventListener("mouseleave", Swal.resumeTimer);
                            },
                        });
                        Toast.fire({
                            icon: "error",
                            title: "Please Specify The Swimlane Name 📌",
                        });
                    } else {
                        /////////////////////////////////////////////
                        let h = name.length * 10 + 60
                        let newNode = {
                            id: name,
                            data: { label: `${name}` },
                            resizable: true,
                            type: "swimlane",
                            style: {
                                // width: "447px",
                                height: h,
                                backgroundColor: "rgba(50, 192, 247, 0.2)",
                                // borderRadius: '3px',
                                border: "1px solid #1a192b",
                            },
                            parentId: node.id,
                            position: { x: 51, y: 0 },
                            extent: "parent",
                        };
                        copiedNodes = copiedNodes.concat(newNode);
                        /////////////////////////////////////////////
                    }
                });
                break;

            case "edit":
                await swal({
                    text: "Change the Pool `" + node.id + "` Name",
                    content: { element: "input" },
                    button: {
                        text: "Edit",
                    },
                }).then((name) => {
                    if (!name) {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 1500,
                            timerProgressBar: true,
                            width: 430,
                            didOpen: (toast) => {
                                toast.addEventListener("mouseenter", Swal.stopTimer);
                                toast.addEventListener("mouseleave", Swal.resumeTimer);
                            },
                        });
                        Toast.fire({
                            icon: "error",
                            title: "Please Specify The New Name 📌",
                        });
                    } else {
                        //////////////////////////////////////////////////

                        console.log("copiedNodescopiedNodescopiedNodes");
                        console.log(copiedNodes);
                        console.log("copiedNodescopiedNodescopiedNodes");

                        copiedNodes = copiedNodes.map((e) => {
                            if (e.parentId == node.id) {
                                e.parentId = name;
                                return e;
                            }
                            return e;
                        });
                        console.log("LOG");
                        console.log(copiedNodes);
                        copiedNodes = copiedNodes.filter((e) => e.id != node.id);
                        console.log("AFter filter");
                        console.log(copiedNodes);

                        node.id = name;
                        node.data.label = name;

                        console.log("node");
                        console.log(node);

                        copiedNodes = copiedNodes.concat(node);
                        console.log("concat");
                        console.log(copiedNodes);

                        let Pools = copiedNodes.filter((e) => e.type == "pool");
                        let Lanes = copiedNodes.filter((e) => e.type == "swimlane");
                        let Activities = copiedNodes.filter((e) => e.type == "activity");
                        console.log("Pools");
                        console.log(Pools);
                        console.log("Lanes ");
                        console.log(Lanes);
                        copiedNodes = Pools.concat(Lanes);
                        copiedNodes = copiedNodes.concat(Activities);
                        console.log("LOGFinally");
                        console.log(copiedNodes);

                        const Toast1 = Swal.mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 1000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener("mouseenter", Swal.stopTimer);
                                toast.addEventListener("mouseleave", Swal.resumeTimer);
                            },
                        });

                        Toast1.fire({
                            icon: "success",
                            title: "OK",
                        });
                        //////////////////////////////////////////////////
                    }
                });
                break;
            case "remove":
                /////////////////////////////////////////////
                let lanes = copiedNodes.filter((e) => e.parentId == node.id)
                for (let i = 0; i < lanes.length; i++) {
                    copiedNodes = copiedNodes.filter((e) => e.parentId != lanes[i].id);
                }
                copiedNodes = copiedNodes.filter((e) => e.id != node.id);
                copiedNodes = copiedNodes.filter((e) => e.parentId != node.id);
                const Toast1 = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener("mouseenter", Swal.stopTimer);
                        toast.addEventListener("mouseleave", Swal.resumeTimer);
                    },
                });

                Toast1.fire({
                    icon: "success",
                    title: "OK",
                });
                break;
            default:
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener("mouseenter", Swal.stopTimer);
                        toast.addEventListener("mouseleave", Swal.resumeTimer);
                    },
                });

                Toast.fire({
                    icon: "error",
                    title: "No Action Applied",
                });
        }
    });
    return copiedNodes;
}
