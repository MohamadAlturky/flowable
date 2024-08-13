import { memo, useState } from "react";
import { Handle, Position, NodeToolbar } from "@xyflow/react";
import Image from 'next/image'


let style= {
  height: 50,
  borderRadius: '3px',
  border: '1px solid #1a192b',
  fontWeight: "900",
  color: "white",
  backgroundColor: "rgb(123, 75, 242, 93)",
  zIndex:300,
  display:"flex",
  justifyContent:"center"

}
let image = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJjb2xvcjpjdXJyZW50Q29sb3IiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgY2xhc3M9ImgtZnVsbCB3LWZ1bGwiPjxyZWN0IHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB4PSIwIiB5PSIwIiByeD0iMzAiIGZpbGw9InRyYW5zcGFyZW50IiBzdHJva2U9InRyYW5zcGFyZW50IiBzdHJva2Utd2lkdGg9IjAiIHN0cm9rZS1vcGFjaXR5PSIxMDAlIiBwYWludC1vcmRlcj0ic3Ryb2tlIj48L3JlY3Q+PHN2ZyB3aWR0aD0iMjU2cHgiIGhlaWdodD0iMjU2cHgiIHZpZXdCb3g9IjAgMCAyMDAwIDIwMDAiIGZpbGw9ImN1cnJlbnRDb2xvciIgeD0iMTI4IiB5PSIxMjgiIHJvbGU9ImltZyIgc3R5bGU9ImRpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJjdXJyZW50Q29sb3IiPjxnIHN0cm9rZT0iY3VycmVudENvbG9yIj48cGF0aCBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIyLjMiIHN0cm9rZS13aWR0aD0iNzAiIGQ9Ik03MjIuMjk3IDY1Ni41OTRDNzIyLjMxNyA3MzcuMjc5IDc2OCA4NDAgODIxLjUxNyA4ODAuMTVjMTQuMzYyIDEwLjc3NSAxLjQ3MSA3LjYzIDE4Ljk5OSAxOC41ODRDNzA0LjcxNCA5MzkuOTc0IDUyOCAxMDEwIDQ0OCAxMTYwdjQyMGgxMDg3LjV2LTQyMGMtODAtMTUwLTI1Ni43MTQtMjIwLjAyNi0zOTIuNTE1LTI2MS4yNjZjOTYtNjAgMTE4LjE5NS0xNDMuNDMzIDExOC4yMTgtMjQyLjE0QzEyNjAuODkgNTIwIDExNTEuNSA0MDAgOTkxLjc1IDQwMEM4MzIgNDAwIDcyMi42MSA1MjAgNzIyLjI5NyA2NTYuNTk0eiI+PC9wYXRoPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNNzUyIDU1MGMzOC42NCAzLjUyIDM5Ljk2Mi0yNS41NjMgMTQ1Ljg0Ny0xOS4zMjJjMTU4LjE1MyA5LjMyMiAxMDcuMDI4IDU3LjEzNSAyMTQuOTMgNjAuMjhjODQuMDk4LTMuMTQ1IDgwLjUyNC0yOS45MSAxMTkuMjIzLTQwLjk1OGMtNjQtNzAtMTI3LjI5Ny0xMTQuNTM1LTI0MC0xNTBjLTk2IDMwLTE3NiA4MC0yNDAgMTUweiI+PC9wYXRoPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iNzAiIGQ9Ik02ODQgMTU2MHYtMjgwbTYxNCAyODB2LTI4ME03NjggOTIwcy0zNy43MTIgMTIyLjI4OCAwIDE2MGMxMDUuNTk1IDEwNS41OTUgMzQyLjQwNSAxMDUuNTk1IDQ0OCAwYzM3LjcxMi0zNy43MTIgMC0xNjAgMC0xNjAiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPjwvc3ZnPg=="

function UserTask({ data }) {
  style = {
    ...style,
    width : 50 + data.label.length*7,
    alignItems:"center",
    position:"relative"
  }
  return (
    <div
      style={style}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position:"absolute",
          width:50,
          height:50,
          right:-10,
          top:-15,
          color:"white"
        }}
      >
         <Image
          src={image} 
          alt="A description of the image"
          width={100} 
          height={80} 
          style={{
            filter:"invert(1)"
          }}
        />
      </div>
        <div>{data.label}</div>
      <Handle  type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default memo(UserTask);
