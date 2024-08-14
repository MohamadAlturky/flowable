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
let image = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJjb2xvcjpjdXJyZW50Q29sb3IiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgY2xhc3M9ImgtZnVsbCB3LWZ1bGwiPjxyZWN0IHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB4PSIwIiB5PSIwIiByeD0iMzAiIGZpbGw9InRyYW5zcGFyZW50IiBzdHJva2U9InRyYW5zcGFyZW50IiBzdHJva2Utd2lkdGg9IjAiIHN0cm9rZS1vcGFjaXR5PSIxMDAlIiBwYWludC1vcmRlcj0ic3Ryb2tlIj48L3JlY3Q+PHN2ZyB3aWR0aD0iMjU2cHgiIGhlaWdodD0iMjU2cHgiIHZpZXdCb3g9IjAgMCAyMDQ4IDIwNDgiIGZpbGw9ImN1cnJlbnRDb2xvciIgeD0iMTI4IiB5PSIxMjgiIHJvbGU9ImltZyIgc3R5bGU9ImRpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJjdXJyZW50Q29sb3IiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTEwMTUuMDQzIDk5LjAwMkM1OTkuMjEgOTUuOTA2IDIwOS4wOTggNDExLjE0NiAxMjEuNjA2IDgxNy4yNDdjLTg0LjM4NiAzNTYuNzE5IDY2LjcwNCA3NTQuNjI0IDM2OS4zMTIgOTYyLjU4NWMyOTMuNzIxIDIxMC4zNyA3MTIuMzMgMjI2Ljg1NyAxMDE3Ljg2NSAzMS40NzRjMzA3LjIyNC0xODguMTM2IDQ4OC4xNC01NjMuODI4IDQzMC44MTQtOTIxLjMyYy01Mi40OTQtMzcwLjU4My0zNDguNTIzLTY5Mi44ODYtNzE2LjEzLTc2OS4wNmMtNjguMzQ1LTE1LjI0OC0xMzguNDE1LTIyLjM4OC0yMDguNDI0LTIxLjkyNHptMjIuMDggMjg5Ljg4MmMzMDUuNTYtLjk2OCA1ODYuMjQgMjUxLjkxNSA2MTcuMzg0IDU1Ni4xMTZjMzkuNzU0IDI5MC43NjItMTQ3LjcwMyA1OTQuOTE0LTQyOS41MzggNjgyLjMzYy0yNzUuMDc2IDkzLjYwOS02MDYuNzcyLTI1Ljg1Mi03NTAuMDc1LTI4MS4wMDljLTE1OC41NjQtMjY0LjcyNS05MS4xLTY0MS45NjUgMTYwLjE2NS04MjUuNzU3YzExMy45NDctODcuOTIgMjU4LjIwMi0xMzQuOTkgNDAyLjA2NC0xMzEuNjh6Ij48L3BhdGg+PC9nPjwvc3ZnPjwvc3ZnPg=="

function EndEventNode({ data }) {

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
        {/* <Handle type="source"
        style={{
          transform: "translateX(-20px)"
        }}
        position={Position.Right} /> */}
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

export default memo(EndEventNode);
