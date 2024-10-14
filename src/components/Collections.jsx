import React, { useEffect, useState } from "react";
import { apiCall } from "../helper/apiHelper";
import { Link, useHistory } from 'react-router-dom';


const Collections = () => {

  const history = useHistory();
  
  const [collections, setCollections] = useState([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple form validation
    if (!title.trim() || !description.trim()) {
      setError('Title and description are required.');
      return;
    }
    setError('');

    try {
      const newCollection = await apiCall("collection/add", "POST", {title, description});
      setTitle('');
      setDescription('');
      // setSuccess('Collection created successfully!');
      console.log('Created collection:', newCollection);
      // fetchPublicCollections();
    } catch (error) {
      setError('Error creating collection.');
      console.error('Error creating collection:', error);
    }
  };


  const handleEdit = (collectionId) => {
    const redirectPage = `/collectionDetails/${collectionId}`;
    console.log("redirectPage ", redirectPage);
    history.push(redirectPage)
    // <Link to={redirectPage}>Dashboard</Link>
  }

  const handleDelete = async (tagId) => {
    try {
      return;
      const response = await apiCall("tag/deleteTag", "POST", {tagId});
        const { data } = response;
        // setCollections(data);
      // await deleteTagFromApi(tagId);
      // setCollections((prevTags) => prevTags.filter((tag) => tag.id !== tagId));
      setCollections(data)
    } catch (error) {
      console.error('Error deleting tag:', error);
    }
  };


  const fetchPublicCollections = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiCall("collection/public");
      const { data } = response;
      setCollections(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchPublicCollections();
  }, []);

  return (
    <div className="">
      <h1>Collections</h1>

      <div className="collection-form-container">
      <h2>Create a New Collection</h2>
      <form onSubmit={handleSubmit} className="collection-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter collection title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter collection description"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        {/* {success && <p className="success-message">{success}</p>} */}
        <button type="submit">Create Collection</button>
      </form>
    </div>


      {isLoading && <p>Loading Collections...</p>}
      {collections.length > 0 && (
        <div>
          {collections.map((collection) => (
            <div key={collection.tagId}>
              <hr/>
              <h4>{collection.value}</h4>
              <h4>{collection.title}</h4>
              <h4>{collection.description}</h4>
              <h4>Total Tools :  {collection?.items?.length}</h4>
              <div>

              <button onClick={() => handleEdit(collection.collectionId)}>Edit</button>
              <button onClick={() => handleDelete(collection.collectionId)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collections;
