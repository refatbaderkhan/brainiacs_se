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
          "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2d1ZXN0L2xvZ2luIiwiaWF0IjoxNjkxOTIyMTgyLCJleHAiOjE2OTE5MjU3ODIsIm5iZiI6MTY5MTkyMjE4MiwianRpIjoiNXgzcW14TWZYTjlIdlBDSyIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.FKWZcGHwgHBqiRWZ-Dg1p-ekoTUgvoFDlDMflMRe_ss"
        }
      });

      const data = await response.json();
      console.log(data.users);
      setUsers(data.users);
    };

    fetchUsers();
  }, []);
  const handleChatStart = (userId)=>{
    console.log(userId)
    navigate(`/ChatRoom/${userId}`, { userId:  userId  })
     localStorage.setItem("roomId" , JSON.stringify([+userId,+id]))
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
            {user.email}
            {console.log(user)}
            <button onClick={()=>handleChatStart(user.id)} style={{width:"100px" ,height:"20px"  }}>chat</button>
            </div>;
        })}
      </Modal>
    </div>
  );
};

export default ChatoModal;
