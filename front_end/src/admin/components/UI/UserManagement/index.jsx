import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/components.css"
import Entry from '../../base/Entry'
import CreateUser from "../../base/CreateUser";


const UserManagement = () => {
  const [deletedUser, setDeletedUser] = useState([]); // New state variable
  const [createUser, setCreatedUser] = useState([]); // New state variable


//const handleUserDeleted = (userId) => {
//  setDeletedUser(userId); // Update deletedUser state with the ID of the deleted user
//};
//
//const handleUserCreated = (userId) => {
//  setCreatedUser(userId);
//};

const handleUserDeleted = (userId) => {
  setUsers(prevUsers => prevUsers.filter(user => user.id !== userId)); // Remove the deleted user from the state
};

const handleUserCreated = (newUser) => {
  setUsers(prevUsers => [...prevUsers, newUser]); // Add the newly created user to the state
};

  const token = localStorage.getItem('token')
  const headers = { Authorization: `Bearer ${token}`,};

  
  const fetchUsers = async () => {
    try {
      const users = await axios.get("http://127.0.0.1:8000/api/users/get", {
        headers });
      const usersdata = users.data.users
      console.log('men el userz', usersdata);
      setUsers(usersdata)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  useEffect(()=>{
    fetchUsers();
  },[])

  const [users, setUsers] = useState([]);


  return (  
    <div className="margin users-container ">
      <div>
      <CreateUser onUserCreated={handleUserCreated}/>
      </div>
      <br></br>
      {users.map((user) => (
          <div key={user.id}>
            <Entry
              id={user.id}
              name={user.name}
              email={user.email}
              role={user.role}
              onUserDeleted={handleUserDeleted} // Pass the user ID to callback
            />
            <br />
          </div>
        )
      )}
    </div>
  );
};

export default UserManagement