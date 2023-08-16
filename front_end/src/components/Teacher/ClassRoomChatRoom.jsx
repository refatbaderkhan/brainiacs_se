import React, { useEffect, useState } from 'react';
import '../../styles/ChatRoom.css';
import Pusher from 'pusher-js';
import { useParams } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

const ClassRoomChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState([]);
  const [attendaceCount, setAttendaceCount] = useState(0);
  const [isTeacherAttendance, setIsTeacherAttendance] = useState(false);
  const [areButtonsHidden, setAreButtonsHidden] = useState(false); 
  const navigate = useNavigate()
  const params = useParams();
  const classId = params.classId;
  const teacherId = params.teacherId
  const isTeacher = localStorage.getItem("teacher_id") === teacherId;
  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher('42f92e75cb02e25d4594', {
      cluster: 'ap2',
    });

    const channel = pusher.subscribe('room-messaging-channel');
    channel.bind('room-user-message', function (data) {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    const channel1 = pusher.subscribe('room-attendance-channel');
    channel1.bind('room-user-attendance', function (data) {
      console.log(data)
      if (data.user_id === teacherId) {
        setIsTeacherAttendance(true);
        setAreButtonsHidden(true)
        return
      }
      if(+data.roomId === +localStorage.getItem("course_id")){
        setAttendaceCount(+data.attendanceCount + 1);
      }
      
    });

    return () => {
      pusher.unsubscribe('room-messaging-channel');
      pusher.disconnect();
    };
  }, []);
  useEffect(() => {
    const storedAttendanceCount = localStorage.getItem('attendanceCount');
    if (storedAttendanceCount) {
      setAttendaceCount(parseInt(storedAttendanceCount, 10));
    }
     const storedButtonsVisibility = localStorage.getItem('areButtonsHidden');
    if (storedButtonsVisibility === 'true') {
      setAreButtonsHidden(true);
    } else {
      setAreButtonsHidden(false);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('attendanceCount', attendaceCount);
  }, [attendaceCount]);

  useEffect(() => {
    localStorage.setItem('areButtonsHidden', areButtonsHidden.toString());
  }, [areButtonsHidden]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async () => {
    if (localStorage.getItem("teacher_name").trim() !== '' && message.trim() !== '') {
      try {
        const response = await fetch(
          'http://127.0.0.1:8000/api/user/roomMessage',
          {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
              username: localStorage.getItem("teacher_name"),
              message: message,
              roomId: classId,
            }),
          }
        );
        const data = await response.json();
      } catch (error) {
        console.error('Error sending message:', error);
      }

      setMessage('');
    }
  };
  const handleAttendance = async()=>{
    if (localStorage.getItem("teacher_name").trim() !== '' ) {
      try {
        const response = await fetch(
          'http://127.0.0.1:8000/api/user/roomAttendance',
          {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
              user_id:localStorage.getItem("teacher_id"),
              attendanceCount: attendaceCount,
              username: localStorage.getItem('teacher_name'),
              roomId: classId,
            }),
          }
        );
        const data = await response.json();
        setIsTeacherAttendance(true);
        setAreButtonsHidden(true)
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  }

  const handleBackButton = () => {
    localStorage.removeItem('course_id');
    localStorage.removeItem('course_title');
    localStorage.removeItem('attendanceCount');
    localStorage.removeItem('areButtonsHidden');
    navigate('/teacher'); 
  };

  return (
    <div className="chat-content">
    
     <div className='chatroom-header'>
        <button onClick={handleBackButton}>Back</button>
        <h2>{localStorage.getItem("course_title")}</h2>
        {console.log(areButtonsHidden)}
        {!isTeacherAttendance && !areButtonsHidden && ( 
          <>
            <div style={{ color: "black" }} className='attendance_count'>{attendaceCount} attending</div>
            {isTeacher ? (
              <button onClick={handleAttendance}>End Attendance</button>
            ) : (
              <button onClick={handleAttendance}>Attendance</button>
            )}
          </>
        )}
      </div>
   
      <div className="messages">
        {messages.map((msg, index) => {
          if (+msg.roomId === +classId) {
            return (
              <div className="message-item" key={index}>
                <div className="message-box">
                  <strong>{msg.username}: </strong>
                  <span className="message-text">{msg.message}</span>
                </div>
              </div>
            );
          }
        })}
      </div>

      <div className="message-input">
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder="Enter your message..."
          className="message-input-field"
        />
        <button onClick={handleSubmit} className="submit-button">
          Send
        </button>
      </div>
    </div>
  );
};


export default ClassRoomChatRoom;
