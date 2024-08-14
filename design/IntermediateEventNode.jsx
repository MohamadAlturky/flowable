import { memo } from 'react';
import Image from 'next/image'
import { Handle, Position } from '@xyflow/react';
const labelStyle = {
  position: 'absolute',
  color: '#555',
  bottom: 10,
  fontSize: 10,
  fontWeight:"600",
  transform: "translateX(-50%)",
  left: "50%",
  width:"fit-content"
  // backgroundColor:"red"
};
let image = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJjb2xvcjpjdXJyZW50Q29sb3IiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgY2xhc3M9ImgtZnVsbCB3LWZ1bGwiPjxyZWN0IHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB4PSIwIiB5PSIwIiByeD0iMzAiIGZpbGw9InRyYW5zcGFyZW50IiBzdHJva2U9InRyYW5zcGFyZW50IiBzdHJva2Utd2lkdGg9IjAiIHN0cm9rZS1vcGFjaXR5PSIxMDAlIiBwYWludC1vcmRlcj0ic3Ryb2tlIj48L3JlY3Q+PHN2ZyB3aWR0aD0iMjU2cHgiIGhlaWdodD0iMjU2cHgiIHZpZXdCb3g9IjAgMCAyMDQ4IDIwNDgiIGZpbGw9ImN1cnJlbnRDb2xvciIgeD0iMTI4IiB5PSIxMjgiIHJvbGU9ImltZyIgc3R5bGU9ImRpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJjdXJyZW50Q29sb3IiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTEwMTQuOTE3IDk5LjM4QzYwMi4zNTkgOTUuOTkyIDIxNC4xNDYgNDA1LjcgMTIzLjUxNCA4MDcuOTNjLTg3LjQzNSAzNTQuMyA1Ni42NDggNzUyLjUwNSAzNTUuMDA2IDk2NC4yODhjMjk2LjU1NSAyMTkuMTkzIDcyNS45NSAyMzcuNTI4IDEwMzYuNDE5IDM2LjA1YzMwNS4wNTktMTg5LjU4NyA0ODEuOTgyLTU2NS4wOTUgNDIzLjg3My05MjAuOTcyYy01Mi4zMDMtMzYxLjEtMzM1LjAwNy02NzYuOTctNjkxLjQ4Ny03NjAuNDQ4Yy03NS44OTctMTguOTkzLTE1NC4xOS0yOC4wMi0yMzIuNDA4LTI3LjQ2OXptMTYuOTM1IDk5LjkyNmMzODMuMzYtMy44NyA3NDEuOTgyIDI5Ny45MDIgODAzLjc2MSA2NzYuNDI4YzY1LjM5NyAzNDEuOTM1LTExMC40MzIgNzE0LjQ4Mi00MjAuMjAzIDg3NS44OTVjLTMxNi43MTQgMTc0LjMtNzQ0LjQ4MiAxMDkuMDItOTkwLjM5Ny0xNTcuNzQ2Yy0yNTIuMTIzLTI2MC4yMTctMzAxLjEwNS02OTEuNzU0LTEwNi44MTgtOTk5LjA5YzE0Ny42OTItMjQzLjY5MSA0MjcuODU4LTQwMi4wNDcgNzEzLjY1Ny0zOTUuNDg3em0tMjMuOTk4IDkwLjAxYy0zNTMgMC02NzYuNDY5IDI5Mi4xNDQtNzE0LjM5IDY0My4xMDZjLTQ1LjE1NSAzMjguODgyIDE2MS43MjkgNjcxLjkgNDc1LjU2NSA3ODIuMzE1YzI5Ny4zMjMgMTEyLjM1OSA2NjAuNTUyIDUuODA1IDg0Ni4xNDUtMjUzLjQ2NGMyMDAuMjgtMjY1LjIxOSAxODguNzYtNjY3LjY0My0zNC41MDctOTE2LjA0NmMtMTQwLjkxNC0xNjQuMDY0LTM1Ni4xMDYtMjYyLjA5NC01NzIuODEzLTI1NS45MTJ6bTI5LjM1MiA5Ny45NDJjMzEyLjQ2MiAwIDU5Ny4yMSAyNjMuNjYxIDYyMS4wNTYgNTc1LjMwMmMzMi41NzYgMjk2Ljg1OC0xNzEuMTQ3IDU5OS42ODUtNDYxLjIxOSA2NzUuNzAzYy0yNzkuNTU3IDgxLjU0NC02MDUuMDE4LTU0LjA4NS03MzcuNDY2LTMxNS4wOTVjLTE0Mi41NTUtMjYzLjc5Ny02OS40NS02MjQuNjQ2IDE3NC4zNS04MDMuMzRjMTE0LjIzOC04OC4zMjUgMjU4Ljg4Ny0xMzUuOTY2IDQwMy4yNzktMTMyLjU3eiI+PC9wYXRoPjwvZz48L3N2Zz48L3N2Zz4="

function IntermediateEventNode({ data }) {

  return (
    <>
      <div style={{
        // width:62,
        // height:62,
        // overflow:"hidden",
        // backgroundColor: 'rgba(208, 192, 247, 0.2)',
        borderRadius: '50%',
        // // border: '1px solid #1a192b'
      }}>
        {/* <Handle style={{
        transform: "translateX(-20px)"
      }} type="source" position={Position.Right} /> */}
        <Handle type="source"
        style={{
          transform: "translateX(-20px)"
        }}
        position={Position.Right} />
        <Handle type="target"
        style={{
          transform: "translateX(+20px)"
        }}
        position={Position.Left} />

        <Image
          src={image} // Path to your image
          alt="A description of the image"
          width={110}
          height={90}
        />
      </div>
      <div style={labelStyle}>{data.label}</div>
    </>
  );
}

export default memo(IntermediateEventNode);
