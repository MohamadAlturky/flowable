"use client"
import CustomViewer from "../../components/pdfViewer"


const App = () => {
  let process_description = "sdsad"
  let messages = [
    {
      "role":"user",
      "content":"Lorem ipsum dolor sit amet, sssssssssssssssssssssssssssssssssssssss sssssssssssssssssssssss consectetur adipiscing elit."
    },
    {
      "role":"user",
      "content":"Lorem ipsum dolor sit amet, sssssssssssssssssssssssssssssssssssssss sssssssssssssssssssssss consectetur adipiscing elit."
    },
    {
      "role":"user",
      "content":"Lorem ipsum dolor sit amet, sssssssssssssssssssssssssssssssssssssss sssssssssssssssssssssss consectetur adipiscing elit."
    },
  ];

  return (
    <CustomViewer messages={messages} process_description={process_description}></CustomViewer>
  );
};

export default App;