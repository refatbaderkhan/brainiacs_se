import React from 'react';
import Modal from 'react-modal';
import { useState, useEffect , useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import TeacherContext from '../../context/TeacherContext';

const ChatoModal = ({ isDMsModalOpen, closeDMsModal }) => {
  const { state, dispatch } = useContext(TeacherContext);


  const {id} = state
 
  const [users, setUsers] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://127.0.0.1:8000/api/getAllUsers", {
        method: "GET",
        headers: {
          "Authorization":`Bearer ${localStorage.getItem('token')}`,

        }
      });

      const data = await response.json();
      console.log(data);
      setUsers(data.users);
    };

    fetchUsers();
  }, []);
  const handleChatStart = (userId , user_name)=>{
    console.log(userId)
    navigate(`/ChatRoom/${userId}`, { userId:  userId  })
     localStorage.setItem("roomId" , JSON.stringify([+userId,+localStorage.getItem('teacher_id')]))
     localStorage.setItem("receiver_name" ,user_name)
     localStorage.setItem("receiver_id" ,userId)
  }

  return (
    <div>
      <Modal
        isOpen={isDMsModalOpen}
        onRequestClose={closeDMsModal}
        contentLabel="Create Course Modal"
        className="modal"
        overlayClassName="overlay"
      >
        {console.log(users)}
        {users !== null && users?.map(user => {
          return <div receiverId={user.id} style={{color:"black"}}>
            <div className='chatUser'>
              <div>
              {user.name}
            {console.log(user)}
              </div>
              <div>
                <button onClick={()=>handleChatStart(user.id , user.name)} style={{width:"100px" ,height:"20px"  }}>chat</button>
              </div>
           
            </div>
            
           
            </div>;
        })}
      </Modal>
    </div>
  );
};

export default ChatoModal;
