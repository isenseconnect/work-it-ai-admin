import React, { useEffect, useRef, useState } from "react";
import { apiCall, uploadFileAPICall } from "../helper/apiHelper";
import { Link, useHistory } from "react-router-dom";

import axios from "axios"; // Optional, if using axios

const Tool = () => {
  const squareStyle = {
    width: "150px",
    height: "150px",
    border: "1px solid #ccc",
    position: "relative",
    display: "inline-block",
    margin: "10px",
    cursor: "pointer",
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "5px",
    right: "5px",
    // background: "rgba(255, 255, 255, 0.8)",
    border: "none",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  };
  const CloseButton = () => (
    <button style={closeButtonStyle} onClick={(e) => e.stopPropagation()}>
      X
    </button>
  );
  const handleFileChange = (event, setFile) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
    }
  };
  const handleClearFile = (fileName) => {

    if(fileName === 'logo') { 
      setLogoFile(null);
    }
  };

  const history = useHistory();
  const imageInputRef = useRef(null);
  const logoInputRef = useRef(null);


  const [tool, setTool] = useState({
    title: "",
    description: "",
    actionLink: "",
    imageLink: "",
    logoLink: "",
    tags: [],
  });

  const [tagInput, setTagInput] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [logoFile, setLogoFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTool({ ...tool, [name]: value });
  };

  const handleTagAdd = () => {
    if (tagInput.trim() === "") return;
    setTool((prevTool) => ({
      ...prevTool,
      tags: [...prevTool.tags, tagInput.trim()],
    }));
    setTagInput("");
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  // const handleFileChange = (e) => {
  //   const { name, files } = e.target;
  //   if (files.length > 0) {
  //     const file = files[0];
  //     if (name === 'imageFile') {
  //       setImageFile(file);
  //     } else if (name === 'logoFile') {
  //       setLogoFile(file);
  //     }
  //   }
  // };

  // const handleClearFile = (type) => {
  //   if (type === 'image') {
  //     setImageFile(null);
  //   } else if (type === 'logo') {
  //     setLogoFile(null);
  //   }
  // };

  const handleApiCall = async () => {
    const formData = new FormData();
    const fileMetadata = {};

    formData.append("title", tool.title);
    formData.append("description", tool.description);
    formData.append("actionLink", tool.actionLink);
    console.log("type of tags ", typeof tool.tags); 
    console.log("tool.tags ", tool.tags); 
    console.log("formDagta ", formData) 
    formData.append("tags", JSON.stringify(tool.tags));
    // formData.append("tags", tool.tags);

    if (imageFile) { 
      formData.append("files", imageFile);
      fileMetadata[imageFile.name] = { type: 'image' };
    } 
    if (logoFile)  {
      formData.append("files", logoFile);
      fileMetadata[logoFile.name] = { type: 'logo' };
    } 

    try {
      console.log("formData ", formData)
      const response = await uploadFileAPICall("/tool/addTool", formData);
      console.log("API response:", response.data);
    } catch (error) {
      console.error("API call error:", error);
    }
    // Resetting the form (optional)
    alert("Tool Added Successfully");

    setTool({
      title: "",
      description: "",
      actionLink: "",
      imageLink: "",
      logoLink: "",
      tags: [],
    });
    setImageFile(null);
    setLogoFile(null);
  };
  return (
    <div>
      <h1>Tool Page</h1>

      {/* Form for updating the tool state */}
      <div>
        <h2>Update Tool Information</h2>
        <form>
          <div>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={tool.title}
                onChange={handleInputChange}
                placeholder="Enter tool title"
              />
            </label>
          </div>
          <div>
            <label>
              Description:
              <textarea
                name="description"
                value={tool.description}
                onChange={handleInputChange}
                placeholder="Enter tool description"
              />
            </label>
          </div>
          <div>
            <label>
              Action Link:
              <input
                type="url"
                name="actionLink"
                value={tool.actionLink}
                onChange={handleInputChange}
                placeholder="Enter action link"
              />
            </label>
          </div>
          <div>
      <div
        style={squareStyle}
        onClick={() => imageInputRef.current.click()}
      >
        {imageFile ? (
          <>
            <img src={URL.createObjectURL(imageFile)} alt="Uploaded" style={imageStyle} />
            <CloseButton onClick={(e) => {
              e.stopPropagation();
              handleClearFile(setImageFile, imageInputRef);
            }} />
          </>
        ) : (
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => handleFileChange(e, setImageFile)}
          />
        )}
      </div>
      
      <div
        style={squareStyle}
        onClick={() => logoInputRef.current.click()}
      >
        {logoFile ? (
          <>
            <img src={URL.createObjectURL(logoFile)} alt="Uploaded" style={imageStyle} />
            <CloseButton onClick={(e) => {
              e.stopPropagation();
              handleClearFile(setLogoFile, logoInputRef);
            }} />
          </>
        ) : (
          <input
            ref={logoInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => handleFileChange(e, setLogoFile)}
          />
        )}
      </div>
    </div>

          {/* <div>
            <label>
              Image Upload:
              <input
                type="file"
                name="imageFile"
                accept="image/*"
                onChange={handleFileChange}
              />
              {imageFile && (
                <div>
                  <p>Selected Image: {imageFile.name}</p>
                  <button
                    type="button"
                    onClick={() => handleClearFile("image")}
                  >
                    Clear Image
                  </button>
                </div>
              )}
            </label>
          </div>
          <div>
            <label>
              Logo Upload:
              <input
                type="file"
                name="logoFile"
                accept="image/*"
                onChange={handleFileChange}
              />
              {logoFile && (
                <div>
                  <p>Selected Logo: {logoFile.name}</p>
                  <button type="button" onClick={() => handleClearFile("logo")}>
                    Clear Logo
                  </button>
                </div>
              )}
            </label>
          </div> */}
          <div>
            <label>
              Tags:
              <input
                type="text"
                value={tagInput}
                onChange={handleTagInputChange}
                placeholder="Enter a tag and click Add"
              />
              <button type="button" onClick={handleTagAdd}>
                Add Tag
              </button>
            </label>
            {tool.tags.length > 0 && (
              <ul>
                {tool.tags.map((tag, index) => (
                  <li key={index}>{tag}</li>
                ))}
              </ul>
            )}
          </div>
        </form>
      </div>

      {/* Button to trigger API call */}
      <div>
        <button onClick={handleApiCall}>Create</button>
      </div>
    </div>
  );
};

export default Tool;
