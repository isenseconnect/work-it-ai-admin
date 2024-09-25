// Example component using apiCall
import React, { useEffect, useState } from 'react';
import { apiCall, uploadFileAPICall, logout } from '../helper/apiHelper';

const ExampleComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiCall('exampleEndpoint');
        setData(response);
      } catch (error) {
        console.error('Fetch Data Error:', error);
      }
    };

    fetchData();
  }, []);

  const handleFileUpload = async (file) => {
    try {
      const response = await uploadFileAPICall('upload', file);
      console.log('File Upload Response:', response);
    } catch (error) {
      console.error('File Upload Error:', error);
    }
  };

  const handleLogout = () => {
    logout(); // Clear token from localStorage
    // Perform any additional logout actions (e.g., redirect to login)
  };

  return (
    <div>
      <h2>Example Component</h2>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      <input type="file" onChange={(e) => handleFileUpload(e.target.files[0])} />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ExampleComponent;
