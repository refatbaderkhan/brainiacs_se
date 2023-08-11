import React from "react";

function MessageThreads({ parentSenderId, teacherId }) {
  // Fetch message threads using an API call or dummy data
  const messageThreads = [
    {
      id: 1,
      senderId: teacherId,
      receiverId: parentSenderId,
      message: "Hello, how can I help you?",
      timestamp: "2023-08-10 09:00:00",
    },
    {
      id: 2,
      senderId: parentSenderId,
      receiverId: teacherId,
      message: "My child needs additional support in math.",
      timestamp: "2023-08-10 09:30:00",
    },
    // ... Add more message threads
  ];

  return (
    <div className="message-threads">
      <h3>Message Threads</h3>
      {messageThreads.map((thread) => (
        <div key={thread.id} className="message-thread">
          <p className="timestamp">{thread.timestamp}</p>
          <div className="message">
            <p>{thread.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MessageThreads;
