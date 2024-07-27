import { memo } from "react";
import { NodeResizer } from "@xyflow/react";
import React from "react";
import AreYouSureToDelete from "../components/modals/AreYouSureToDelete"
import InsertValueModal from "../components/modals/InsertValueModal"
import BuildLaneNode from "@/services/builders/LaneBuilder"; '../services/builders/LaneBuilder'
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


function PoolNode({ id, data, selected}) {
  const [modalOpen, setModalOpen] = React.useState(false)
  const [laneModalOpen,setLaneModalOpen] = React.useState(false)
  const { toast } = useToast()

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger >
          <NodeResizer minWidth={500} isVisible={selected} minHeight={200} />
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
                fontSize: "15px",
                fontWeight: "bolder"
              }}
            >
              {data.label}
            </div>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem inset onClick={(e) => { setModalOpen(true) }}>
            Remove
            <ContextMenuShortcut>⌘</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset
            onClick={(e) => { setLaneModalOpen(true) }}>
            Insert Lane
            <ContextMenuShortcut>⌘</ContextMenuShortcut>
          </ContextMenuItem>
          {/* <ContextMenuItem inset>
          Reload
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem> */}
          {/* <ContextMenuSub>
          <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>
              Save Page As...
              <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>Create Shortcut...</ContextMenuItem>
            <ContextMenuItem>Name Window...</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Developer Tools</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub> */}
          <ContextMenuSeparator />
          {/* <ContextMenuCheckboxItem checked>
          Show Bookmarks Bar
          <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
        </ContextMenuCheckboxItem> */}
          <ContextMenuCheckboxItem>Edit</ContextMenuCheckboxItem>
          {/* <ContextMenuSeparator /> */}
          {/* <ContextMenuRadioGroup value="pedro"> */}
          {/* <ContextMenuLabel inset>People</ContextMenuLabel> */}
          {/* <ContextMenuSeparator /> */}
          {/* <ContextMenuRadioItem value="pedro">
            Pedro Duarte
          </ContextMenuRadioItem> */}
          {/* <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem> */}
          {/* </ContextMenuRadioGroup> */}
        </ContextMenuContent>
      </ContextMenu>
      <AreYouSureToDelete
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        supTitle={"this pool will be deleted with it's lanes and activities!!!"}
        title={"Are you sure?"}
        callBack={() => {
          const newNodes = data.nodes.filter(n => n.id != id)
          data.setNodes(newNodes)
        }} />

        <InsertValueModal 
              placeholder = {"write here.."}
              isOpen={laneModalOpen}
              setIsOpen={setLaneModalOpen}
              supTitle={"set the sub participant name."}
              title={"Write Lane Name"}
              setValueName={(v)=>{
                let node = BuildLaneNode(data.nodes, v, id)
                if(node != null)
                {
                  data.setNodes((nds) => nds.concat(node));
                  // console.log(data.nodes);
                  toast({
                    title: "✅ Greate!",
                    description: `the lane added successfully.`,
                  })
                }
                else{
                  toast({
                    title: "❌ Uh oh!",
                    description: `something went wrong sorry.`,
                  })
                }
              }}/>
    </>
  );
}

export default memo(PoolNode);
