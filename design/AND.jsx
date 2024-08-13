import { memo } from 'react';
import Image from 'next/image'
import { Handle, Position } from '@xyflow/react';
const labelStyle = {
  position: 'absolute',
  color: '#555',
  bottom: 10,
  fontSize: 8,
  transform: "translateX(-50%)",
  left: "50%",
  // backgroundColor:"red"
};
let image = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJjb2xvcjpjdXJyZW50Q29sb3IiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgY2xhc3M9ImgtZnVsbCB3LWZ1bGwiPjxyZWN0IHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB4PSIwIiB5PSIwIiByeD0iMzAiIGZpbGw9InRyYW5zcGFyZW50IiBzdHJva2U9InRyYW5zcGFyZW50IiBzdHJva2Utd2lkdGg9IjAiIHN0cm9rZS1vcGFjaXR5PSIxMDAlIiBwYWludC1vcmRlcj0ic3Ryb2tlIj48L3JlY3Q+PHN2ZyB3aWR0aD0iMjU2cHgiIGhlaWdodD0iMjU2cHgiIHZpZXdCb3g9IjAgMCAyMDQ4IDIwNDgiIGZpbGw9ImN1cnJlbnRDb2xvciIgeD0iMTI4IiB5PSIxMjgiIHJvbGU9ImltZyIgc3R5bGU9ImRpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJjdXJyZW50Q29sb3IiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTEwMjQuMDIyIDk5LjM2Yy0xOS4zMjQtLjAxNy0zOC42NDYgNy4xNS01Mi45OCAyMS41NUwxMjAuOTM3IDk3MS4wMjNjLTI4LjY3IDI4LjY2OC0yOC41MzcgNzcuMjk1LjEzMiAxMDUuOTYzbDg0OS45NzEgODQ5Ljk2NWMyOC42NyAyOC42NzggNzcuMjk0IDI4LjgwNCAxMDUuOTYzIDBsODUwLjEwNi04NTAuMWMyOC42NjktMjguNjY3IDI4LjUzNi03Ny4yOTYtLjEzNS0xMDUuOTY0TDEwNzcuMDAyIDEyMC45MWMtMTQuMzM0LTE0LjMzNC0zMy42NTctMjEuNTM0LTUyLjk4LTIxLjU1em0tLjA2NSAxMjYuMDQ1bDc5OC42NiA3OTguNjY2bC03OTguNjYgNzk4LjY1N2wtNzk4LjY2LTc5OC42NTdsNzk4LjY2LTc5OC42NjZ6bS0yMS44MDMgMzI5LjgyYzAgLjAxLTkuNjU3IDEuODM4LTkuNjYyIDEuODM4Yy0uMDEgMC03LjkwOCA1LjMyMy03LjkxNCA1LjMyM2MtLjAxLjAxLTUuNDk3IDguMTI3LTUuNTAyIDguMTI3YzAgLjAxLTEuODYgOS42NzUtMS44NjMgOS42NzVWOTc3LjA0SDU4MC4xODhsLS4wNjctLjA3OGMwIC4wMS05LjYxOCAyLjEyOS05LjYyMyAyLjEyOWMtLjAxLjAxLTcuOTA3IDUuMzIyLTcuOTEyIDUuMzIybC4wMDgtLjA5OGMtLjAxLjAxLTUuNDk3IDguMTI3LTUuNTAyIDguMTI3Yy0uMDEgMC0xLjg2MSA5LjY3Ni0xLjg2NSA5LjY3NnY0My40N3MxLjg0OCA5Ljc4MyAxLjkxNCA5Ljg1YzAgLjAxIDUuNDc4IDcuOTM0IDUuNDc4IDcuOTM0Yy4wMS4wMSA3Ljk1NyA1LjMyMiA3Ljk2IDUuMzIyYy4wMS4wMSA5LjY1NiAyLjEyNyA5LjY2IDIuMTI3aDM5Ni45Nzh2Mzk2Ljc4NWwtLjA2My0uMDU4YzAgLjAxIDEuOTE2IDkuODUgMS45MTUgOS44NWMwIC4wMSA1LjQ3NiA3LjkzMyA1LjQ3NiA3LjkzM2MuMDEuMDEgNy45NiA1LjMyIDcuOTYxIDUuMzJjMCAwIDkuNTkgMi4wMzIgOS42NjIgMi4xM2w0My40NjEtLjAxYy4wMTEgMCA5Ljg0Ni0yLjAzMiA5Ljg1Mi0yLjAzMmMwIDAgNy45MDgtNS4zMiA3LjkxNC01LjMyYy4wMS0uMDEgNS40Ny03LjkzNiA1LjQ3Ni03LjkzNmMwIDAgMS44ODctOS44MiAxLjg5LTkuODJWMTA3MC44NmgzOTYuODhjLjAxMS4wMSA5Ljg0Ny0yLjAzMSA5Ljg1MS0yLjAzMWMuMDEgMCA3LjkxLTUuMzIyIDcuOTE0LTUuMzIyYy4wMS0uMDEgNS40NzEtNy45MzQgNS40NzctNy45MzRjMCAwIDEuODg2LTkuODIgMS44OS05Ljgydi00My40NjFjMC0uMDEtMS44NzctOS41OC0xLjg3NC05LjY3NmMtLjAxLS4wMS01LjQ1LTguMTI3LTUuNTE4LTguMTI3Yy0uMDEtLjAxLTcuOTU4LTUuMzItNy45Ni01LjMyYzAgLjAxLTkuODItMi4xMy05LjgyNS0yLjAzM2gtMzk2LjgzOFY1ODAuMjk0YzAtLjAxLTEuODc4LTkuNTc3LTEuODc1LTkuNjc0Yy0uMDEtLjAxLTUuNDUtOC4xMjktNS40NS04LjEyOWMtLjAxLS4wMS03Ljk1Ni01LjMyLTcuOTU4LTUuMzJjLS4wMSAwLTkuODQ4LTEuOTM2LTkuODUyLTEuOTM2bC00My40NjktLjAxeiI+PC9wYXRoPjwvZz48L3N2Zz48L3N2Zz4="

function AND({ data }) {

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
          width={100} // Desired width
          height={80} // Desired height
        />
      </div>
      <div style={labelStyle}>{data.label}</div>
    </>
  );
}

export default memo(AND);
