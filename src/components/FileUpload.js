// src/components/FileUpload.js

import React, { useState, useEffect } from "react";
import {
  apiCall,
  screenshotApiCall,
  uploadFileAPICall,
} from "../helper/apiHelper";
import ReactPaginate from "react-paginate";
import { showSuccessToast } from "../helper/showToast";
import config from "../config";
const BASE_URL = config.baseURL;

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedData, setUploadedData] = useState([]);
  const [uploadError, setUploadError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  // TODO: temp change.
  const [scrappedData, setScrappedData] = useState(null);
  const itemsPerPage = 10; // Number of items per page

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setUploadedData([]); // Reset uploadedData when selecting a new file
    setUploadError(null); // Reset uploadError when selecting a new file
  };

  const handlePhotoUpload = () => {
    console.log("handlePhotoUpload");
  };

  const handlePreview = async () => {
    if (selectedFile) {
      try {
        const response = await uploadFileAPICall("preview/csv", selectedFile);
        if (response.status && response.data) {
          setUploadedData(response.data);
          setUploadError(null); // Reset uploadError
          setCurrentPage(0); // Reset current page to 0
        } else {
          console.log("resonse ", response);
          setUploadError("Error uploading file, REASON : " + response.message); // Set error message if upload fails
        }
      } catch (error) {
        console.error("File Upload Error:", error);
        setUploadError("Error uploading file, REASON : ", +error.message); // Set error message if upload fails
      }
    }
  };

  const handleUpload = async () => {
    console.log("handleUpload() called");
    try {
      console.log("handlePhotoUpload");
      const response = await uploadFileAPICall("upload/csv", selectedFile);
      showSuccessToast(response.message);
      console.log("response.message ", response.message);
    } catch (error) {
      console.log("error ", error);
    }
  };

  const scrapHandle = async () => {
    console.log("scrapHandle() called");
    const response = await screenshotApiCall("screenshot2", "POST", {
      data: uploadedData,
    });
    setScrappedData(response.data);
    console.log("response ", response);
  };

  const backupCSV = async () => {
    try {
      const response = await apiCall("tools/backup", "GET", null, "text");
      const csvData = `data:text/csv;charset=utf-8,${encodeURIComponent(response)}`;

      const link = document.createElement("a");
      link.href = csvData;
      link.download = "data.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the file:", error.message);
    }
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const renderSerialNumber = (index) => {
    return currentPage * itemsPerPage + index + 1;
  };

  const renderRowColor = (index) => {
    return index % 2 === 0 ? "lightgray" : "white"; // Alternate row colors
  };

  return (
    <div>
      <h3>Upload CSV File</h3>
      <input type="file" onChange={handleFileChange} />
      <div>
        <button onClick={handlePreview}>Preview</button>
        <button onClick={handleUpload}>Upload</button>
        <button onClick={backupCSV}>Backup CSV</button>
      </div>
      <button onClick={scrapHandle}>Scrap Images</button>

      {scrappedData && <>{JSON.stringify(scrappedData)}</>}

      {/* Display uploaded data in a table with pagination */}
      {uploadedData.length > 0 && (
        <div>
          <h4>Uploaded Data</h4>
          <table>
            <thead>
              <tr>
                <th>Serial No.</th>
                <th>Title</th>
                <th>Action Link</th>
                <th>Description</th>
                <th>Category</th>
                <th>Tags</th>
                <th>HomePageIcon</th>
                <th>Logo</th>
              </tr>
            </thead>
            <tbody>
              {uploadedData
                .slice(
                  currentPage * itemsPerPage,
                  (currentPage + 1) * itemsPerPage
                )
                .map((item, index) => (
                  <tr
                    key={index}
                    style={{ backgroundColor: renderRowColor(index) }}
                  >
                    <td>{renderSerialNumber(index)}</td>
                    <td>{item.title}</td>
                    <td>
                      <a
                        href={item.actionLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.actionLink}
                      </a>
                      {/* Display favicon as a small icon */}
                      {item.faviconUrl && (
                        <img
                          src={item.faviconUrl}
                          alt="Favicon"
                          width="16"
                          height="16"
                        />
                      )}
                    </td>
                    <td>{item.description}</td>
                    <td>{item.category}</td>
                    <td>{item.tags.join(", ")}</td>
                    <td>
                      <button
                        onClick={() =>
                          handlePhotoUpload(currentPage * itemsPerPage + index)
                        }
                      >
                        Upload Photo
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          handlePhotoUpload(currentPage * itemsPerPage + index)
                        }
                      >
                        Upload Photo
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div>
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={Math.ceil(uploadedData.length / itemsPerPage)}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </div>
        </div>
      )}

      {/* Display upload error message if upload fails */}
      {uploadError && <p style={{ color: "red" }}>{uploadError}</p>}
    </div>
  );
};

export default FileUpload;
