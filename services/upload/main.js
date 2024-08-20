function CustomFileInput() {
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
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
  