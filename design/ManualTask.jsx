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
let image = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJjb2xvcjpjdXJyZW50Q29sb3IiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgY2xhc3M9ImgtZnVsbCB3LWZ1bGwiPjxyZWN0IHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB4PSIwIiB5PSIwIiByeD0iMzAiIGZpbGw9InRyYW5zcGFyZW50IiBzdHJva2U9InRyYW5zcGFyZW50IiBzdHJva2Utd2lkdGg9IjAiIHN0cm9rZS1vcGFjaXR5PSIxMDAlIiBwYWludC1vcmRlcj0ic3Ryb2tlIj48L3JlY3Q+PHN2ZyB3aWR0aD0iMjU2cHgiIGhlaWdodD0iMjU2cHgiIHZpZXdCb3g9IjAgMCAyMDAwIDIwMDAiIGZpbGw9ImN1cnJlbnRDb2xvciIgeD0iMTI4IiB5PSIxMjgiIHJvbGU9ImltZyIgc3R5bGU9ImRpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJjdXJyZW50Q29sb3IiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS13aWR0aD0iNzAiIGQ9Ik0xMDU3LjQ5NCAxMzYwaDUxNC4wNzRjNTEuMTMgMCA3NC40MjktMjYuMTQ3IDgzLjY2OC03MS41OTZjMTQuMzY0LTcwLjM2OC0yMS4xMzYtMTMzLjI0Ny04NC42NjktMTMzLjQwNGMtMTU2LjExMS0uNzg0LTUxMy4wNzQgMC01MTMuMDc0IDBIMTAzMHM1NzMuMTU2LjQzIDYzNS45OTQgMGM2Mi44MzctLjQzIDg1LjQyOC0zNS45OTggODUuNjE3LTk2LjMzNmMuMTkxLTYwLjE4Mi0zMC4zMS0xMDguNTg2LTg1LjQyOC0xMDguNjY0Yy0xODcuODE1LS4xNTctNTcwLjQ1NSAwLTU3MC40NTUgMEgxMDMwaDQ4NC42OTNjNTYuMTkyLS4xNTcgODUuNjgtMzYuMDEgODUuNDktOTYuODk3QzE1OTkuODA1IDc5My40NyAxNTY5LjA1IDc0NSAxNTE0LjA2IDc0NWMtMjE5Ljc3Mi0uMzkyLTY4Ny41NjEgMy4yNzEtNzAxLjMzMyAwYy0zLjY0Ni0uODY2LTYuNzY1LTcuODIxLTQuMzY2LTEwLjc0NGMyMi41MzEtMjcuNDQ5IDEyOS4xNTUtMTI3LjQxNSAxNTIuODIxLTE1OC4wNTRjMjkuNjc5LTM4LjE2MiAzMi44NDMtOTEuMjkgMTAuMjUyLTEyNS42OTFjLTI2LjE5OC00MC4wNDMtNjEuNTcyLTM5LjE4MS05My42NTUtMTguNDk0Yy05Mi40NTIgNTkuODY4LTQxNy42NDggMjg1LjQ3LTQ4OS4zNDQgMzM0LjY4Yy01Ni45NTIgMzkuMTAzLTk1LjkzMyA5OC4xODctMTE5LjA5MyAxNzEuNjExYy0yMy40MTQgNzQuNDQzLTIxLjAxIDE2MS4xMzYtMjAuNzU3IDIzNy4wNjhjLjI1MyA1Ni4yNjMgMS41MjEgMTAxLjc2NSAxNS4zMTYgMTU4LjAyOWMzOS44MDMgMTYzLjUzOSAxNDQuOTEgMjE2LjEyNSAyOTguOTM0IDIxNi41OTVjMjkyLjIyNyAxLjA5NyA1ODQuNTggMS40ODkgODc2Ljg3IDBjNDcuNzc3LS4zMTMgNzQuMTAyLTM0LjU2MSA3NC43OTgtOTEuOTIyYy43Ni01OS4wODQtMjYuNzY4LTk3Ljc2NS03NC44Ni05OC4wNzhjLTExMi41MTMtLjc4NC00MDkuNjQzIDAtNDA5LjY0MyAweiI+PC9wYXRoPjwvZz48L3N2Zz48L3N2Zz4="

function ManualTask({ data }) {
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

export default memo(ManualTask);
