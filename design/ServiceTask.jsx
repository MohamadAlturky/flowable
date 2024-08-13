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
let image = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJjb2xvcjpjdXJyZW50Q29sb3IiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgY2xhc3M9ImgtZnVsbCB3LWZ1bGwiPjxyZWN0IHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB4PSIwIiB5PSIwIiByeD0iMzAiIGZpbGw9InRyYW5zcGFyZW50IiBzdHJva2U9InRyYW5zcGFyZW50IiBzdHJva2Utd2lkdGg9IjAiIHN0cm9rZS1vcGFjaXR5PSIxMDAlIiBwYWludC1vcmRlcj0ic3Ryb2tlIj48L3JlY3Q+PHN2ZyB3aWR0aD0iMjU2cHgiIGhlaWdodD0iMjU2cHgiIHZpZXdCb3g9IjAgMCAyMDAwIDIwMDAiIGZpbGw9ImN1cnJlbnRDb2xvciIgeD0iMTI4IiB5PSIxMjgiIHJvbGU9ImltZyIgc3R5bGU9ImRpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJjdXJyZW50Q29sb3IiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS13aWR0aD0iNzAiIGQ9Ik0xMTMwLjcxIDYyNy43ODljLTM4Ljk3Ni0yNS40MDQtODIuNy00My4xMy0xMjguMzg2LTUyLjA5NWwuNTkxLTEwMi41MTdoLTE0Mi4yNmgwbC4yNjcgMTAzLjMyMmMtMjIuNDU1IDQuNjYyLTQ0Ljc3MiAxMS4zOS02Ni42MzQgMjAuNTA2Yy0yMS44NjEgOS4xNDUtNDIuMjE3IDIwLjMyNy02MS4xNTggMzIuOTY2bC03NC4yNTYtNzMuMzYybC05OS40NSAxMDAuMDI2bDc0LjE2NCA3My4yNjRjLTI1LjU1OCAzOC44MTctNDMuMzU4IDgyLjIxMi01Mi4zNSAxMjcuNzY0bC0xMDUuMjkxLjE5Vjk5OC41OGwxMDYuMTU4LS4zODJjNC42NTUgMjIuMjE4IDExLjQxMSA0NC40OTQgMjAuNTg1IDY2LjE3NWM5LjIyIDIxLjgyIDIwLjQwMSA0Mi4wODIgMzMuMTggNjAuODQ3Ij48L3BhdGg+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iNjIuNzE3IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg5MS41OTQgOTc0LjgyNykgc2NhbGUoMS4xMTYxMikiPjxwYXRoIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZD0iTTk5Ny45MyA1NDcuMzQ3di05Ny4yMzNjMjAuMDM3LTQgNDAuMDM0LTEwLjEyMyA1OS41OC0xOC4yMzVjMTkuNTg3LTguMjA5IDM3Ljg2Ni0xOC4yMzYgNTQuOTU5LTI5LjU5Mmw2Ny45MjEgNjYuOTY3bDg5LjE0NS04OS40ODdsLTY3Ljk2My02Ni45NzNhMzIyLjIyIDMyMi4yMiAwIDAgMCA0Ni45NDQtMTE0LjUzNWw5Mi4yNTMtLjU2OFY3MS43M2wtOTMuMDcuNTY4Yy00LjE3LTE5Ljk1LTEwLjE0Mi0zOS43MzgtMTguNDAyLTU5LjIzYy04LjI2LTE5LjUyNi0xOC4yNzktMzcuNzA1LTI5LjcyOC01NC42MDRsNjQuMzIzLTY0LjQ4NWwtOTAuMDQ0LTg4LjY5NmwtNjQuMjQyIDY0LjQ2MWMtMzQuOTIxLTIyLjc2LTc0LjA5Ni0zOC42NDItMTE1LjAyOS00Ni42NzVsLjUyOS05MS44NUg4NjcuNjQ4bC4yMzkgOTIuNTcyYy0yMC4xMTkgNC4xNzctNDAuMTE1IDEwLjIwMi01OS43MDIgMTguMzdjLTE5LjU4NyA4LjE5NC0zNy44MjUgMTguMjEzLTU0Ljc5NiAyOS41MzdsLTY2LjUzLTY1LjczbC04OS4xMDQgODkuNjJsNjYuNDUgNjUuNjQyQzY0MS4zMDQtMy45OTMgNjI1LjM1NiAzNC44ODkgNjE3LjMgNzUuN2wtOTQuMzM4LjE3djEyNi4wODRsOTUuMTE1LS4zNGM0LjE3IDE5LjkwNiAxMC4yMjMgMzkuODYzIDE4LjQ0MiA1OS4yODhjOC4yNiAxOS41NDkgMTguMjc5IDM3LjcwNCAyOS43MjkgNTQuNTE3TDU5OC4wNCAzODMuMzZsOTAuMDg1IDg4LjUzNmw2OC4wNDQtNjcuNzNjMzQuOTIyIDIyLjg5NyA3NC4wOTcgMzguNzIyIDExNS4wNyA0Ni43MjNsLjA0MyA5Ni40MTRjNDIuMTk1LjMyIDEyNi42NDcuMDQzIDEyNi42NDcuMDQzeiI+PC9wYXRoPjxlbGxpcHNlIGN4PSI5MzIuMzg3IiBjeT0iMTM0LjI1NyIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjcwMCIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIgcng9IjEwOS44OCIgcnk9IjEwOS44NzkiPjwvZWxsaXBzZT48L2c+PC9nPjwvc3ZnPjwvc3ZnPg=="

function ServiceTask({ data }) {
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

export default memo(ServiceTask);
