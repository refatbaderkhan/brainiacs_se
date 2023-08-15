import React, { useState, useEffect } from "react";
import axios from "axios";

function MessageThreads({ parentSenderId, teacherId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
      // Retrieve the token from local storage
    const accessToken = localStorage.getItem("token"); 
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
      {console.log(messages)}
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
