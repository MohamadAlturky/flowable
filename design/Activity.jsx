import { memo, useState } from "react";
import { Handle, Position, NodeToolbar } from "@xyflow/react";

const labelStyle = {
  position: "absolute",
  color: "#555",
  bottom: -15,
  fontSize: 8,
};

function Activity({ data }) {
  // const [emoji, setEmoji] = useState(() => "🚀");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>{data.label}</div>
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default memo(Activity);
