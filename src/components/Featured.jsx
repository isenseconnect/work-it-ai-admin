import React, { useEffect, useState } from "react";
import { apiCall } from "../helper/apiHelper";

const Featured = (props) => {
  const { id } = props.match.params;
  console.log("id ", id);

  const [collections, setCollections] = useState([]);
  const [showFeature, setShowFeature] = useState("tool");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedTools, setSelectedTools] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple form validation
    if (!title.trim() || !description.trim()) {
      setError("Title and description are required.");
      return;
    }
    setError("");

    try {
      const newCollection = await apiCall(
        "collection/getCollectionDetails",
        "POST",
        {
          title,
          description,
        }
      );
      setTitle("");
      setDescription("");
      // setSuccess('Collection created successfully!');
      console.log("Created collection:", newCollection);
    } catch (error) {
      setError("Error creating collection.");
      console.error("Error creating collection:", error);
    }
  };

  const handleSearch = async () => {
    console.log("searchInput ", searchInput);
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiCall(
        `tools/getAll?limit=15&search=${searchInput}`
        // {
        //   query: searchInput,
        // }
      );
      const { data } = response;
      setSearchResults(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTool = async (toolId) => {
    await apiCall("tools/deleteTool", "POST", { toolId });
    alert("tool deleted");
    handleSearch();
  };
  const saveResults = async () => {
    console.log(selectedTools);
    const newCollection = await apiCall(
      "collection/modifyCollectionItems",
      "POST",
      { collectionId: id, addItems: selectedTools }
    );
    fetchPublicCollections();

    setSearchInput("");
    setSearchResults([]);
    setSelectedTools([]);
  };

  const handleDelete = async (toolId) => {
    console.log("toold Id ", toolId);
    const newCollection = await apiCall(
      "collection/modifyCollectionItems",
      "POST",
      { collectionId: id, removeItems: [toolId] }
    );
    // fetchPublicCollections();
    setSearchInput("");
    setSearchResults([]);
  };

  const handleCheckboxChange = (toolId) => {
    if (selectedTools.includes(toolId)) {
      setSelectedTools(selectedTools.filter((id) => id !== toolId));
    } else {
      setSelectedTools([...selectedTools, toolId]);
    }
  };

  const fetchPublicCollections = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiCall(
        `collection/getCollectionDetails/`,
        "POST",
        {
          collectionId: id,
        }
      );
      const { result } = response;
      console.log("response ", response);
      console.log("data ", result);
      setCollections(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPublicCollections();
  }, []);

  const changeFeature = (data) => {
    setShowFeature(data);
  };

  return (
    <div>
      <h1>Data</h1>
      <div style={{ padding: "20px" }}>
        <button onClick={() => changeFeature("tool")}>Tools</button>
        <button onClick={() => changeFeature("collection")}>Collections</button>
        <button onClick={() => changeFeature("profile")}>Profile</button>
      </div>

      {showFeature === "tool" && (
        <>
          <div>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search tools..."
            />
            <button onClick={handleSearch}>Search</button>
          </div>
          {searchResults.length > 0 && (
            <>
              <div>
                <h1>Search Results</h1>
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      {/* <th>Select</th> */}
                      {/* <th>Featured</th> */}
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults.map((result) => (
                      <tr key={result._id}>
                        <td>{result.title}</td>
                        <td>{result.description}</td>
                        {/* <td>
                          <input
                            type="checkbox"
                            checked={selectedTools.includes(result.toolId)}
                            onChange={() => handleCheckboxChange(result.toolId)}
                          />
                        </td> */}
                        <button
                          onClick={() => {
                            deleteTool(result.toolId);
                          }}
                        >
                          Delete
                        </button>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <hr />
              </div>
              <button onClick={saveResults}>Save</button>
            </>
          )}
        </>
      )}

      {collections?.toolDetails?.length > 0 && (
        <div>
          <h1>Tools List</h1>
          <table>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Title</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {collections?.toolDetails.map((tool, index) => (
                <tr key={tool.tagId}>
                  <td>{index + 1}</td>
                  <td>{tool.title}</td>
                  <td>{tool.description}</td>
                  <td>
                    <button onClick={() => handleDelete(tool?.toolId)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Featured;
