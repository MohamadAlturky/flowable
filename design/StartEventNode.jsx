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
  display:"flex",
  justifyContent:"center"
  // backgroundColor:"red"
};

let image = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJjb2xvcjpjdXJyZW50Q29sb3IiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgY2xhc3M9ImgtZnVsbCB3LWZ1bGwiPjxyZWN0IHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB4PSIwIiB5PSIwIiByeD0iMzAiIGZpbGw9InRyYW5zcGFyZW50IiBzdHJva2U9InRyYW5zcGFyZW50IiBzdHJva2Utd2lkdGg9IjAiIHN0cm9rZS1vcGFjaXR5PSIxMDAlIiBwYWludC1vcmRlcj0ic3Ryb2tlIj48L3JlY3Q+PHN2ZyB3aWR0aD0iMjU2cHgiIGhlaWdodD0iMjU2cHgiIHZpZXdCb3g9IjAgMCAyMDQ4IDIwNDgiIGZpbGw9ImN1cnJlbnRDb2xvciIgeD0iMTI4IiB5PSIxMjgiIHJvbGU9ImltZyIgc3R5bGU9ImRpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJjdXJyZW50Q29sb3IiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTEwMTUuNDc3IDk4LjkyOEM2NTQuNzc5IDk3LjczIDMwOC42NzQgMzMwLjc5NCAxNzEuNzc1IDY2NC4xOWMtMTQ0LjExOCAzMzAuMTUzLTY5LjIzNyA3NDAuMjg0IDE4Mi44NjIgOTk3Ljc3MmMyNDIuNDYzIDI2MC45OTIgNjQxLjk0OSAzNTYuNzg2IDk3Ni41MiAyMzQuNjcyYzM0Ni43MzktMTE4LjA3NCA2MDIuNzIzLTQ1OC41OTQgNjE2LjYzOC04MjUuMDkyYzIzLjM0LTM2MC4xMy0xODguNTM1LTcxOS40MjEtNTEyLjk1My04NzYuMjkzQzEzMDcuODA3IDEzMS44NTYgMTE2NS45NDkgOTguNzk3IDEwMjQgOTlhODMyLjMgODMyLjMgMCAwIDAtOC41MjMtLjA3MnptMjUuMzUxIDk5Ljk3MmMzNTMuMDczIDEuOTM5IDY4NS42MDUgMjU3LjM2IDc3Ni45MTggNTk5LjAzYzk3LjAzIDMyNi45MDctMzQuMjE0IDcwNS40MDUtMzE1LjkwNiA4OTkuMDI1QzEyMDkuMjI3IDE5MTIuMDMgNzc1LjMgMTg5Ni40NyA0OTguOTc3IDE2NjAuOGMtMjc4LjQxNC0yMjEuOTgtMzc4LjA3Mi02MzIuNTc2LTIzNS4yMjctOTU4LjE4MkMzODcuNTU3IDQwMS42MDUgNjk4LjMzOCAxOTUuMTggMTAyNCAxOTljNS42MTQtLjA5OCAxMS4yMjQtLjEzIDE2LjgyOC0uMXoiPjwvcGF0aD48L2c+PC9zdmc+PC9zdmc+"
function StartEventNode({ data }) {

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
        <Handle style={{
          transform: "translateX(-20px)"
        }} type="source" position={Position.Right} />
        <Image
          src={image} // Path to your image
          alt="A description of the image"
          width={110}
          height={90}
        />
      </div>
      <div style={{...labelStyle,width:`${(data.label.length*10+50)}px`}}>{data.label}</div>
    </>
  );
}

export default memo(StartEventNode);
