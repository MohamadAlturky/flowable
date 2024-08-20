"use client"
// import React, { useState } from 'react';

// function Upload() {
//   // const [file, setFile] = useState(null);

//   const handleFileChange = (event) => {
//     // setFile(event.target.files[0]);
//     uploadFile(event.target.files[0])
//   };

//   const readFileContent = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = (event) => resolve(event.target.result);
//       reader.onerror = (error) => reject(error);
//       reader.readAsText(file);
//     });
//   };

//   const uploadFile = async (file) => {
//     if (!file) {
//       alert('Please select a JSON file to upload!');
//       return;
//     }

//     try {
//       const content = await readFileContent(file);
//       const jsonContent = JSON.parse(content);
//       console.log('JSON Content:', jsonContent);
//     } catch (error) {
//       console.error('Error reading or parsing file:', error);
//     }
//   };

//   return (
//     <div>
//       <input type="file" accept=".donut" onChange={handleFileChange} />
//       <button onClick={uploadFile}>Upload and Log JSON</button>
//     </div>
//   );
// }

// export default Upload;
import React, { useState } from 'react';

function CustomFileInput() {

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    
    if (file) {
    } else {
    }
  };

  const triggerFileInput = () => {
    document.getElementById('hiddenFileInput').click();
  };

  return (
    <div className="file-input-container">
      <input
        type="file"
        id="hiddenFileInput"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <div onClick={triggerFileInput} className='cursor-pointer'>
        upload file
      </div>
    </div>
  );
}

export default CustomFileInput;