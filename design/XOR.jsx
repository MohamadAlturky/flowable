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
let image = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJjb2xvcjpjdXJyZW50Q29sb3IiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgY2xhc3M9ImgtZnVsbCB3LWZ1bGwiPjxyZWN0IHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB4PSIwIiB5PSIwIiByeD0iMzAiIGZpbGw9InRyYW5zcGFyZW50IiBzdHJva2U9InRyYW5zcGFyZW50IiBzdHJva2Utd2lkdGg9IjAiIHN0cm9rZS1vcGFjaXR5PSIxMDAlIiBwYWludC1vcmRlcj0ic3Ryb2tlIj48L3JlY3Q+PHN2ZyB3aWR0aD0iMjU2cHgiIGhlaWdodD0iMjU2cHgiIHZpZXdCb3g9IjAgMCAyMDQ4IDIwNDgiIGZpbGw9ImN1cnJlbnRDb2xvciIgeD0iMTI4IiB5PSIxMjgiIHJvbGU9ImltZyIgc3R5bGU9ImRpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJjdXJyZW50Q29sb3IiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTEwMjQuMDIyIDk5LjM2Yy0xOS4zMjQtLjAxNy0zOC42NDYgNy4xNS01Mi45OCAyMS41NUwxMjAuOTM3IDk3MS4wMjNjLTI4LjY3IDI4LjY2OC0yOC41MzcgNzcuMjk1LjEzMiAxMDUuOTYzbDg0OS45NzEgODQ5Ljk2NWMyOC42NyAyOC42NzggNzcuMjk0IDI4LjgwNCAxMDUuOTYzIDBsODUwLjEwNi04NTAuMWMyOC42NjktMjguNjY3IDI4LjUzNi03Ny4yOTYtLjEzNS0xMDUuOTY0TDEwNzcuMDAyIDEyMC45MWMtMTQuMzM0LTE0LjMzNC0zMy42NTctMjEuNTM0LTUyLjk4LTIxLjU1em0tLjA2NSAxMjYuMDQ1bDc5OC42NiA3OTguNjY2bC03OTguNjYgNzk4LjY1N2wtNzk4LjY2LTc5OC42NTdsNzk4LjY2LTc5OC42NjZ6TTcyNS42ODYgNjY5Ljc5MmMtLjAxNCAwLTkuNjEyIDEuODM4LTkuNjIgMS44MzhjLS4wMSAwLTguMTQ0IDUuNTEzLTguMTUgNS41MTNsLTMwLjczMiAzMC43MzljLS4wMSAwLTUuNjEgOC4yMjUtNS42MTQgOC4zMjJjMCAuMDEtMS43MzcgOS40OC0xLjczNiA5LjQ4YzAgLjAxIDEuODY4IDkuMzg1IDEuODcxIDkuMzg1YzAgLjAxIDUuMzM4IDguMzIyIDUuMzQ0IDguMzIybDI4MC43MDcgMjgwLjdsLTI4MC41NzIgMjgwLjU3NHYtLjA4OGMwIC4wMS01LjYxIDguMzItNS42MTQgOC4zMmMwIC4wMS0xLjczNiA5LjQ4My0xLjczNiA5LjQ4M2MwIC4wMiAxLjg2OCA5LjM4NSAxLjg3MSA5LjM4NWMwIDAgNS4zMzkgOC4yMjMgNS4zNDQgOC4zMmwzMC43MzQgMzAuNzI4Yy4wMS4wMSA4LjQxMSA1LjUxNiA4LjQxOCA1LjUxNmMuMDEgMCA5LjM0NiAxLjgzOCA5LjM1NCAxLjgzOGMuMDEgMCA5LjQ3OS0xLjc0IDkuNDg2LTEuNzRjLjAxIDAgOC4yOC01LjYxNCA4LjI4NS01LjYxNGwyODAuNTc2LTI4MC41ODJsMjgwLjYzNyAyODAuNjQxYy4wMS4wMSA4LjQxMiA1LjUxNiA4LjQxOCA1LjUxNmMuMDEgMCA5LjM0NiAxLjgzOCA5LjM1NCAxLjgzOGMuMDEgMCA5LjQ4LTEuNzQzIDkuNDg4LTEuNzQzYy4wMSAwIDguMjc2LTUuNjEgOC4yODEtNS42MWwzMC43MzUtMzAuNzNjLjAxLS4wMSA1LjQ3NS04LjEyNiA1LjQ4LTguMTI2YzAtLjAxIDEuODcxLTkuNTggMS44NzEtOS42NzZjMC0uMDEtMS44NjktOS4zODUtMS44NzMtOS4zODVjMCAwLTUuNDcyLTguNDE4LTUuNDc4LTguNDE4bC0yODAuNjA2LTI4MC42MTFsMjgwLjYwOC0yODAuNjA0Yy4wMSAwIDUuNDczLTguMTI3IDUuNDc4LTguMTI3YzAtLjAxIDEuODcxLTkuNTc4IDEuODcxLTkuNTc4YzAtLjAyLTEuODY4LTkuMzg1LTEuODctOS4zODVjMC0uMDEtNS42MDYtOC4zMjItNS42MTItOC4zMjJsLTMwLjczNS0zMC43MzhjLS4wMSAwLTguMTQzLTUuNTE0LTguMTUtNS41MTRjLS4wMSAwLTkuMzQ1LTEuODQtOS4zNTMtMS44NGMtLjAxIDAtOS42MTMgMS44NC05LjYyIDEuODRjLS4wMSAwLTguMTQ1IDUuNTE0LTguMTUgNS41MTRsLTI4MC42MTMgMjgwLjYxM2wtMjgwLjczOS0yODAuNzQ4di0uMDg4Yy0uMDEgMC04LjI3OC01LjMyLTguMjg1LTUuMzJjLS4wMSAwLTkuMzQtMS44MzctOS4zNTEtMS44MzhoLS4wMDJ6Ij48L3BhdGg+PC9nPjwvc3ZnPjwvc3ZnPg=="

function XOR({ data }) {

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

export default memo(XOR);
