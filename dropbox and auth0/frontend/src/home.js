import React, { useState } from 'react';
import axios from 'axios';

function Home() {
  const [file, setFile] = useState('');
  const [filesList, setFilesList] = useState([]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:3036/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File uploaded successfully');
      getFiles(); // Refresh the list of files after upload
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const getFiles = async () => {
    try {
      const response = await axios.get('http://localhost:3036/list-files');
      setFilesList(response.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const deleteFile = async (path) => {
    try {
      await axios.delete(`http://localhost:3036/delete?path=${encodeURIComponent(path)}`);
      console.log('File deleted successfully');
      getFiles(); // Refresh the list of files after deletion
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload File</button>
      </form>
      <button onClick={getFiles}>Refresh Files List</button>
      <ul>
        {filesList.map((file, index) => (
          <li key={index}>
            {file.name} <button onClick={() => deleteFile(file.path_lower)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
