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
  // backgroundColor:"red"
};
let image = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJjb2xvcjpjdXJyZW50Q29sb3IiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgY2xhc3M9ImgtZnVsbCB3LWZ1bGwiPjxyZWN0IHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB4PSIwIiB5PSIwIiByeD0iMzAiIGZpbGw9InRyYW5zcGFyZW50IiBzdHJva2U9InRyYW5zcGFyZW50IiBzdHJva2Utd2lkdGg9IjAiIHN0cm9rZS1vcGFjaXR5PSIxMDAlIiBwYWludC1vcmRlcj0ic3Ryb2tlIj48L3JlY3Q+PHN2ZyB3aWR0aD0iMjU2cHgiIGhlaWdodD0iMjU2cHgiIHZpZXdCb3g9IjAgMCAyMDQ4IDIwNDgiIGZpbGw9ImN1cnJlbnRDb2xvciIgeD0iMTI4IiB5PSIxMjgiIHJvbGU9ImltZyIgc3R5bGU9ImRpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJjdXJyZW50Q29sb3IiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTEwMjQuMDIyIDk5LjM2Yy0xOS4zMjQtLjAxNy0zOC42NDYgNy4xNS01Mi45OCAyMS41NUwxMjAuOTM3IDk3MS4wMjNjLTI4LjY3IDI4LjY2OC0yOC41MzcgNzcuMjk1LjEzMiAxMDUuOTYzbDg0OS45NzEgODQ5Ljk2NWMyOC42NyAyOC42NzggNzcuMjk0IDI4LjgwNCAxMDUuOTYzIDBsODUwLjEwNi04NTAuMWMyOC42NjktMjguNjY3IDI4LjUzNi03Ny4yOTYtLjEzNS0xMDUuOTY0TDEwNzcuMDAyIDEyMC45MWMtMTQuMzM0LTE0LjMzNC0zMy42NTctMjEuNTM0LTUyLjk4LTIxLjU1em0tLjA2NSAxMjYuMDQ1bDc5OC42NiA3OTguNjY2bC03OTguNjYgNzk4LjY1N2wtNzk4LjY2LTc5OC42NTdsNzk4LjY2LTc5OC42NjZ6bS4wNDMgMzY4LjZjLTIzNy4yMzIgMC00MzAgMTkyLjc4LTQzMCA0MzAuMDA4YzAgMjM3LjIyOCAxOTIuNzY4IDQzMCA0MzAgNDMwczQzMC0xOTIuNzcyIDQzMC00MzBjMC0yMzcuMjI5LTE5Mi43NjgtNDMwLjAwOC00MzAtNDMwLjAwOHptMCA0Ny42OWMyMTEuNDA4IDAgMzgyLjMyMyAxNzAuOTEyIDM4Mi4zMjMgMzgyLjMxOGMwIDIxMS40MDUtMTcwLjkxNSAzODIuMzMtMzgyLjMyMyAzODIuMzNjLTIxMS40MDcgMC0zODIuMzIyLTE3MC45MjUtMzgyLjMyMi0zODIuMzNjMC0yMTEuNDA2IDE3MC45MTUtMzgyLjMxOSAzODIuMzIyLTM4Mi4zMTl6Ij48L3BhdGg+PC9nPjwvc3ZnPjwvc3ZnPg=="

function OR({ data }) {

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
          src={image}
          alt="A description of the image"
          width={110}
          height={90}
        />
      </div>
      <div style={labelStyle}>{data.label}</div>
    </>
  );
}

export default memo(OR);
