import React, { useEffect, useState } from "react";
import { apiCall } from "../helper/apiHelper";

const Users = () => {
  const [faqs, setFaqs] = useState([]);
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
      await apiCall("faq/addFaq", "POST", { question, answer });
      setQuestion("");
      setAnswer("");
      alert("Faq added successfully!");
    } catch (error) {
      console.error("Error submitting question:", error);
      alert("Failed to submit question."); // Inform user in case of error
    }
  };

  useEffect(() => {
    const fetchFaqs = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiCall("faq/getFaqs");
        const { data } = response;
        setFaqs(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  return (
    <div className="faq-page">
      <h1>Frequently Asked Questions</h1>

      {isLoading && <p>Loading FAQs...</p>}
      {error && <p>Error fetching FAQs: {error}</p>}
      {faqs.length > 0 && (
        <ul>
          {faqs.map((faq) => (
            <li key={faq.id}>
              <p className="faq-question">{faq.question}</p>
              <p className="faq-answer">{faq.answer}</p>
            </li>
          ))}
        </ul>
      )}

      <h2>Submit Your Question</h2>
      <form onSubmit={handleSubmit} style={{ display: "" }}>
        <label htmlFor="question">Question:</label>
        <textarea
          id="question"
          name="question"
          rows="5"
          value={question}
          onChange={handleQuestionChange}
        />
        <label htmlFor="answer">Answer:</label>
        <textarea
          id="answer"
          name="answer"
          rows="5"
          value={answer}
          onChange={handleAnswerChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Users;
