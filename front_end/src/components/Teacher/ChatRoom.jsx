import React, { useEffect, useState ,useContext} from 'react';
import TeacherContext from '../../context/TeacherContext';

import { useParams } from 'react-router-dom';
import '../../styles/ChatRoom.css'
import Pusher from 'pusher-js'
const ChatRoom = ({ userId }) => {
  console.log(userId)
  const [username, setUsername] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState([]);
  const { state, dispatch } = useContext(TeacherContext);


  const {id} = state
  const params = useParams()


  
  let allMessages = []
  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher('42f92e75cb02e25d4594', {
      cluster: 'ap2',
    });

    const channel = pusher.subscribe('messaging-channel');
    channel.bind('user-message', function (data) {
      console.log(data)
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    
    return () => {
      pusher.unsubscribe('messaging-channel');
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
        await fetch("http://127.0.0.1:8000/api/user/messages", {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2d1ZXN0L2xvZ2luIiwiaWF0IjoxNjkxOTIyMTgyLCJleHAiOjE2OTE5MjU3ODIsIm5iZiI6MTY5MTkyMjE4MiwianRpIjoiNXgzcW14TWZYTjlIdlBDSyIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.FKWZcGHwgHBqiRWZ-Dg1p-ekoTUgvoFDlDMflMRe_ss`,
          },
          body: JSON.stringify({
            username: username,
            message: message,
            receiverId:params.userId,
            senderId:id
          }),
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
      // setMessages((prevMessages) => [...prevMessages, { username, message }]);

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
       { console.log(JSON.parse(localStorage.getItem("roomId"))[0])}
  {messages.map((msg, index) => {
    // Parse the roomId array from Local Storage
    const roomIdArray = JSON.parse(localStorage.getItem("roomId"));
    
    // Check if senderId and receiverId are present in the roomId array
    const senderInRoom = roomIdArray.includes(+msg.senderId);
    const receiverInRoom = roomIdArray.includes(+msg.receiverId);
    console.log(senderInRoom)
    console.log(receiverInRoom)

    // Display the message if both senderId and receiverId are in the roomId array
    if (senderInRoom && receiverInRoom) {
      console.log(msg);
      return (
        <div key={index}>
          <strong>{msg.username}: </strong>
          {msg.message}
        </div>
      );
    } else {
      return null; // Do not display the message
    }
  })}

      </div>
    </div>
  );
};

export default ChatRoom;
