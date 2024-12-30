import React, { useState } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [references, setReferences] = useState([]);
  const [error, setError] = useState("");

  const sendMessage = async () => {
    if (!message.trim()) {
      alert("Please enter a question.");
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/chatbot/", {
        message,
      });

      setError("");
      setResponse(res.data.response || "No response provided.");
      setReferences(res.data.references || []);
    } catch (err) {
      console.error(err);
      setResponse("");
      setReferences([]);
      setError(err.response?.data?.error || "Unable to get a response from the server.");
    }
  };

  return (
    <div className="chatbot-container">
      <header className="chatbot-header">
        <h1>Chatbot Recommendation App</h1>
      </header>
      <main className="chatbot-main">
        <textarea
          rows="4"
          cols="50"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your question here..."
          className="chatbot-textarea"
        />
        <button onClick={sendMessage} className="chatbot-button">Send</button>
        {error && <div className="chatbot-error">{error}</div>}
        <div className="chatbot-response">
          <h2>Response:</h2>
          <p>{response || "No response yet."}</p>
        </div>
        <div className="chatbot-references">
          <h3>References:</h3>
          <ul>
            {references.length > 0 ? (
              references.map((ref, index) => (
                <li key={index}>
                  <a href={ref.url} target="_blank" rel="noopener noreferrer">
                    {ref.title}
                  </a>
                </li>
              ))
            ) : (
              <p>No references provided.</p>
            )}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;
