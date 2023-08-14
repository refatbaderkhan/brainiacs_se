import React, { useState, useEffect } from "react";
import axios from "axios";

function MessageThreads({ parentSenderId, teacherId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2d1ZXN0L2xvZ2luIiwiaWF0IjoxNjkxOTcyMzY1LCJleHAiOjE2OTE5NzU5NjUsIm5iZiI6MTY5MTk3MjM2NSwianRpIjoiVkp0UEQxcEt0VUsySFJubiIsInN1YiI6IjciLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.AAYDt52QO8gDijEq08NOvvms6JPxAxN1W3xsCrCBvyI"; 
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/parent/messages/${teacherId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setMessages(response.data.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [teacherId]);

  return (
    <div className="message-threads">
      <h3>Message Threads</h3>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <strong>From: {message.sender_name}</strong>
            <br />
            <strong>To: {message.receiver_name}</strong>
            <br />
            {message.message_content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MessageThreads;
