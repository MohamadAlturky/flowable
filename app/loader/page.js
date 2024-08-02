"use client"
import { ClipLoader,PuffLoader } from "react-spinners";
export default function PlayOnce() {

  return (
    <>
      {/* <ClipLoader speedMultiplier={0.8} /> */}
      <PuffLoader speedMultiplier={0.8} />
    </>
  );
}