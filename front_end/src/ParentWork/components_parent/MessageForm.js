import React, { useState, useEffect } from "react";
import Pusher from "pusher-js";
import axios from "axios"; 

function MessageForm({ parentSenderId, teacherId, onCancel }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Initialize Pusher and subscribe to the 'chat' channel
    const pusher = new Pusher("4094a9b9c2078e80bf69", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("chat");

    // Listen for the 'Message_parent' event
    channel.bind("Message_parent", (data) => {
      alert(`New Message: ${JSON.stringify(data)}`);
    });

    // Cleanup when the component unmounts
    return () => {
      pusher.unsubscribe("chat");
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
const accessToken =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2d1ZXN0L2xvZ2luIiwiaWF0IjoxNjkxOTcyMzY1LCJleHAiOjE2OTE5NzU5NjUsIm5iZiI6MTY5MTk3MjM2NSwianRpIjoiVkp0UEQxcEt0VUsySFJubiIsInN1YiI6IjciLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.AAYDt52QO8gDijEq08NOvvms6JPxAxN1W3xsCrCBvyI";

    // Send the message using the API call
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/parent/message/${teacherId}`,
        {
          username: parentSenderId,
          message: message,
        },
        {
          headers: {
             Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(response.data); 

      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
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