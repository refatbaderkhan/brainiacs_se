import React, { useEffect, useState ,useContext} from 'react';
import TeacherContext from '../../context/TeacherContext';

import { useParams } from 'react-router-dom';
import '../../styles/ChatRoom.css'
import Pusher from 'pusher-js'
const ChatRoom = ({ userId }) => {

  const [username, setUsername] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState([]);
  const { state, dispatch } = useContext(TeacherContext);


  const {id , messages:teacherMessages} = state
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
  useEffect(() => {
    const getMessages = async()=>{
      const response = await fetch(`http://127.0.0.1:8000/api/teacher/messages/${localStorage.getItem("teacher_id")}`,{
        method:"GET",
        headers:{
          "Authorization":`Bearer ${localStorage.getItem('token')}`,
        }
      })
      const data = await response.json()
      setMessages(data)
      dispatch({
        type: "ADD_TEACHER_MESSAGES",
        payload: data,
      });
      console.log(data)
      return data
    }
    getMessages()
  }, []);

  const handleNameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async () => {
    if (localStorage.getItem('teacher_name').trim() !== '' && message.trim() !== '') {
      try {
        await fetch("http://127.0.0.1:8000/api/user/messages", {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            "Authorization":`Bearer ${localStorage.getItem('token')}`,

          },
          body: JSON.stringify({
            username: localStorage.getItem('teacher_name'),
            message: message,
            receiverId:params.userId,
            senderId:localStorage.getItem('teacher_id')
          }),
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
      setMessage('');
    }
  };

  return (
    <div className='chat-content'>
      <h2 className='receiverName'>
        {localStorage.getItem("receiver_name")}
      </h2>
      
      <div className='messages'>
        {console.log(messages)}
        {messages.map((msg, index) => {
          if(msg.sender_id === +localStorage.getItem('teacher_id') && msg.receiver_id === +localStorage.getItem('receiver_id') ){
            return (
              <div className='message-item' key={index}>
                <strong>{localStorage.getItem("teacher_name")}: </strong>
                <span className='message-text'>{msg.message_content}</span>
              </div>
            );
          }
          else if(msg.sender_id === +localStorage.getItem('receiver_id') && msg.receiver_id === +localStorage.getItem('teacher_id') ){
            return (
              <div className='message-item' key={index}>
                <strong>{localStorage.getItem("receiver_name")}: </strong>
                <span className='message-text'>{msg.message_content}</span>
              </div>
            );
          }
          const roomIdArray = JSON.parse(localStorage.getItem("roomId"));
          
          const senderInRoom = roomIdArray.includes(+msg.senderId);
          const receiverInRoom = roomIdArray.includes(+msg.receiverId);
  
          if (senderInRoom && receiverInRoom) {
            return (
              <div className='message-item' key={index}>
                <strong>{msg.username}: </strong>
                <span className='message-text'>{msg.message}</span>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
      <div className='message-input'>
      <input
        className='message-input'
        type="text"
        value={message}
        onChange={handleMessageChange}
        placeholder="Enter your message..."
      />
      <button className='submit-button' onClick={handleSubmit}>Submit</button>
      </div>
      
    </div>
  );};

export default ChatRoom;
