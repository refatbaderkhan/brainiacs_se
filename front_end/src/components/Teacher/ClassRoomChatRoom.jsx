import React, { useEffect, useState } from 'react';
import '../../styles/ChatRoom.css'
import Pusher from 'pusher-js'
const ChatRoom = ({ channel }) => {
  
  const [username, setUsername] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState([]);
  let allMessages = []
  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher('42f92e75cb02e25d4594', {
      cluster: 'ap2',
    });

    const channel = pusher.subscribe('room-messaging-channel');
    channel.bind('room-user-message', function (data) {
     
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      pusher.unsubscribe('room-messaging-channel');
      pusher.disconnect();
    };
  }, []);

  const handleNameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async () => {
    if (username.trim() !== '' && message.trim() !== '') {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/user/roomMessage", {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2d1ZXN0L2xvZ2luIiwiaWF0IjoxNjkxODgyMDMwLCJleHAiOjE2OTE4ODU2MzAsIm5iZiI6MTY5MTg4MjAzMCwianRpIjoicDYydzZqcExLWkxmWGRKMSIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.kpR2yLxbUrNm03W9CX2I0yH16_euaWTTgAEYS7llv10`,
          },
          body: JSON.stringify({
            username: username,
            message: message,
            roomId:8
          }),
        });
        const data = await response.json()
       
      } catch (error) {
        console.error('Error sending message:', error);
      }
      
      setMessage(''); 
    }
  };

  return (
    <div className='chat-content'>
      <input
        type="text"
        value={username}
        onChange={handleNameChange}
        placeholder="Enter your name..."
      />
      <input
        type="text"
        value={message}
        onChange={handleMessageChange}
        placeholder="Enter your message..."
      />
      <button onClick={handleSubmit}>Submit</button>
      <div className='messages'>
      <div className='messages'>
  {messages.map((msg, index) => (
   (
      <div key={index}>
        <strong>{msg.username}: </strong>
        {msg.message}
      </div>
    )
  ))}
</div>
      </div>
    </div>
  );
};

export default ChatRoom;
