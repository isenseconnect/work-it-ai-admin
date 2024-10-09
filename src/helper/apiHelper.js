// src/apiHelper.js

import config from "../config";

const BASE_URL = config.baseURL; // Replace with your API base URL
const SCREENSHOT_SERVICE_URL = config.SCREENSHOT_SERVICE_URL;

// Function to make API requests
const apiCall = async (endpoint, method = "GET", payload = null, responseType = 'json') => {
  // Check if the cookies object is defined
  if (document.cookie.length === 0) {
    console.log('Cookies not set');
  }

  const clientId = process.env.REACT_APP_USER_POOL_CLIENT_ID;
  // Access the username from the cookies
  const usernameCookie = `CognitoIdentityServiceProvider.${clientId}.LastAuthUser`;
  let username = getCookieByName(usernameCookie);

  // Access the access token from the cookies
  const tokenCookie = `CognitoIdentityServiceProvider.${clientId}.${username}.accessToken`;
  const token = getCookieByName(tokenCookie);

  const options = {
    method,
    headers: {
      "Content-Type": payload ? "application/json" : undefined,
      Authorization: `Bearer ${token}`,
    },
  };

  if (payload) {
    options.body = JSON.stringify(payload);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Handle different response types
    switch (responseType) {
      case 'json':
        return await response.json();
      case 'text':
        return await response.text();
      case 'blob':
        return await response.blob();
      default:
        throw new Error(`Unsupported response type: ${responseType}`);
    }
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

const screenshotApiCall = async (endpoint, method = "GET", payload = null) => {
  const token = localStorage.getItem("token");

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? token : "",
    },
  };

  if (payload) {
    options.body = JSON.stringify(payload);
  }

  try {
    const response = await fetch(
      `${SCREENSHOT_SERVICE_URL}${endpoint}`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Function to upload files via API
// const uploadFileAPICall = async (endpoint, file) => {
//   const token = localStorage.getItem("token");

//   const formData = new FormData();
//   formData.append("file", file);

//   const options = {
//     method: "POST",
//     headers: {
//       Authorization: token ? token : "",
//     },
//     body: formData,
//   };

//   try {
//     const response = await fetch(`${BASE_URL}${endpoint}`, options);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("File Upload Error:", error);
//     throw error;
//   }
// };


const uploadFileAPICall = async (endpoint, formData) => {
  console.log("uploadFileAPI call formData ", formData);
  const token = localStorage.getItem("token");

  const options = {
    method: "POST",
    headers: {
      Authorization: token ? token : "", // Add 'Bearer ' for token if needed
    },
    body: formData,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("File Upload Error:", error);
    throw error;
  }
};
// Function to handle user logout (clear token from localStorage)


function getCookieByName(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

export { apiCall, screenshotApiCall, uploadFileAPICall };
