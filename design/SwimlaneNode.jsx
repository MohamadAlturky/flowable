import { memo } from "react";
import { NodeResizer } from "@xyflow/react";
import { useReactFlow } from "@xyflow/react";
import React from "react";
import AreYouSureToDelete from "../components/modals/AreYouSureToDelete"
import InsertValueModal from "../components/modals/InsertValueModal"
import BuildLaneNode from "@/services/builders/LaneBuilder";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { useToast } from "@/components/ui/use-toast"

function SwimlaneNode({ id, data, selected }) {
  const [modalOpen, setModalOpen] = React.useState(false)
  const [editModalOpen, setEditModalOpen] = React.useState(false)
  const { toast } = useToast()
  const reactFlow = useReactFlow()
  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger >
          <div
            style={{
              width: "447px",
              height: "100%",
            }}
          >
            <NodeResizer minWidth={450} isVisible={selected} minHeight={100} />
            <div
              style={{
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                width: "50px",
                height: "100%",
                borderRight: "1px solid",
              }}
            >
              <div
                style={{
                  display: "flex",
                  minWidth: "500px",
                  justifyContent: "center",
                  alignItems: "center",
                  transform: "rotate(-90deg)",
                }}
              >
                {data.label}
              </div>
            </div>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem inset onClick={(e) => { setModalOpen(true) }}>
            Remove
            <ContextMenuShortcut>⌘</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSeparator />

          <ContextMenuCheckboxItem
            onClick={(e) => { setEditModalOpen(true) }}>
            Edit</ContextMenuCheckboxItem>
        </ContextMenuContent>
      </ContextMenu>

      <AreYouSureToDelete
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        supTitle={"this pool will be deleted with it's lanes and activities!!!"}
        title={"Are you sure?"}
        callBack={() => {
          const newNodes = reactFlow.getNodes().filter(n => n.id != id)
          data.setNodes(newNodes)
          toast({
            title: "✅ Greate!",
            description: `pool deleted successfully.`,
          })
        }} />

      <InsertValueModal
        placeholder={"write here.."}
        isOpen={editModalOpen}
        setIsOpen={setEditModalOpen}
        supTitle={"set the new name of the lane."}
        title={"Write A New Lane Name"}
        setValueName={(v) => {

          console.log(reactFlow.getNodes());
          let node = reactFlow.getNodes().filter(n => n.id == id)
          console.log(node);
          node[0].data.label = v
          let newNodes = node.concat(reactFlow.getNodes().filter(n => n.id != id))
          newNodes = newNodes.sort((a,b)=>a.data.displayOrder - b.data.displayOrder)
          console.log("newNodes",newNodes);
          if (node != null) {
            data.setNodes((nds) => newNodes);
            // console.log(reactFlow.getNodes());
            toast({
              title: "✅ Greate!",
              description: `the lane name edited successfully.`,
            })
          }
          else {
            toast({
              title: "❌ Uh oh!",
              description: `something went wrong sorry.`,
            })
          }
        }}
      />
    </>

  );
}

export default memo(SwimlaneNode);
