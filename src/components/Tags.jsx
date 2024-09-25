import React, { useEffect, useState } from "react";
import { apiCall } from "../helper/apiHelper";

const Tags = () => {
  const [tags, setTags] = useState([]);
  const [newTagValue, setNewTagValue] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleBlockUser = () => {
    console.log("handleBlockuser ");
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!question || !answer) {
      alert("Please enter both question and answer");
      return;
    }

    try {
      const response = await fetch("https://your-api-endpoint/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, answer }),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit question: ${response.status}`);
      }

      // Handle successful submission (e.g., clear form, show success message)
      setQuestion("");
      setAnswer("");
      alert("Question submitted successfully!");
    } catch (error) {
      console.error("Error submitting question:", error);
      alert("Failed to submit question."); // Inform user in case of error
    }
  };

  const handleDelete = async (tagId) => {
    try {
      const response = await apiCall("tag/deleteTag", "POST", {tagId});
        const { data } = response;
        // setTags(data);
      // await deleteTagFromApi(tagId);
      // setTags((prevTags) => prevTags.filter((tag) => tag.id !== tagId));
      setTags(data)
    } catch (error) {
      console.error('Error deleting tag:', error);
    }
  };

  const handleAddTag = async () => {
    try {
      const response = await apiCall("tag/addTag", "POST", {value: newTagValue});
        const { data } = response;
      setTags(data)
    } catch (error) {
      console.log("error ", error);
    }
  }

  useEffect(() => {
    const fetchTags = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiCall("tag/getTags");
        const { data } = response;
        setTags(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTags();
  }, []);

  return (
    <div className="faq-page">
      <h1>Tags</h1>

      {isLoading && <p>Loading Tags...</p>}
      {tags.length > 0 && (
        <div>
          {tags.map((tag) => (
            <h4 key={tag.tagId}>
              <hr/>
              {/* <p>{tag.tagId}</p> */}
              <p className="">{tag.value}</p>
              <button onClick={() => handleDelete(tag.tagId)}>Delete</button>
              {/* <hr/> */}
            </h4>
          ))}
        </div>
      )}

      <div>
        <input
          type="text"
          value={newTagValue}
          onChange={(e) => setNewTagValue(e.target.value)}
          placeholder="Enter new tag"
        />
        <button onClick={handleAddTag}>Add Tag</button>
      </div>

    </div>
  );
};

export default Tags;
