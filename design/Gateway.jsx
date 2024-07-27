import Image from "next/image";
import { memo, useState } from "react";
import { Handle, Position, NodeToolbar } from "@xyflow/react";
import svg from "../public/gateway-complex.svg";
const labelStyle = {
  position: "absolute",
  color: "#555",
  bottom: -15,
  fontSize: 8,
};

function Gateway({ data }) {
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
        {/* <Image src={svg} alt="" /> */}
        <Image
          width={48}
          height={48}
          alt="Your Avatar"
          src={svg}
          draggable="false"
          className="jsx-1545067541 avatar-img"
        />
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default memo(Gateway);
