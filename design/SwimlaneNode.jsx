import { memo } from "react";
import { NodeResizer } from "@xyflow/react";

function SwimlaneNode({ data, selected }) {
  return (
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
  );
}

export default memo(SwimlaneNode);
