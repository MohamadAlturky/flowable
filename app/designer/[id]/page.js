'use client'
import '@xyflow/react/dist/style.css';
import MainDesigner from "../../../design/MainDesigner"
export default function Projects(id) {
  console.log(id);
  
  return (
      <MainDesigner id={id}/>
  );
}
