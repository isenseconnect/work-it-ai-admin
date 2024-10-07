// src/components/Login.js

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { handleSignIn } from '../utils/cognitoActions';
// import { Route, Redirect } from 'react-router-dom';

const Login = () => {

  const history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => {
    try {
      const response = await handleSignIn({ username, password });
       if(response.success) window.location.reload();
    } catch (error) {
      console.error('Login Error:', error.message);
    }
  };


  return (
    <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '400px',
      height: '400px',
      margin: 'auto',
      padding: '20px',
      boxSizing: 'border-box',
      gap: '20px',
      // border: '1px solid #ccc',
      // boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
    }}
    >
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
