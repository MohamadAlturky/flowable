"use client"
import React from 'react';

const downloadFile = ({ data, fileName, fileType }) => {
  const blob = new Blob([data], { type: fileType });
  const a = document.createElement('a');
  a.download = fileName;
  a.href = window.URL.createObjectURL(blob);
  a.dispatchEvent(new MouseEvent('click', { view: window, bubbles: true, cancelable: true }));
  a.remove();
};

const exportToJson = (e) => {
  e.preventDefault();
  downloadFile({
    data: JSON.stringify([{"user1":"sdsd","user1":"sdsd","user1":"sdsd","user1":"sdsd"}]),
    fileName: 'diagram.donut',
    fileType: 'text/json',
  });
};

function App() {
  return (
    <div className='App'>
      <button type='button' onClick={exportToJson}>
        Export to JSON
      </button>
    </div>
  );
}

export default App;