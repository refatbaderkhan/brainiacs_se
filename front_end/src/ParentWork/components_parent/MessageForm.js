import React, { useState } from "react";

function MessageForm({ parentSenderId, teacherId, onCancel }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the message using an API call or any desired logic
    console.log(`Message sent to teacher ${teacherId}: ${message}`);
    setMessage(""); // Clear the message input after sending
  };

  return (
    <div className="message-form">
      <h3>Send a Message to the Teacher</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message here..."
        />
        <div className="button-container">
          <button type="submit">Send</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default MessageForm;
