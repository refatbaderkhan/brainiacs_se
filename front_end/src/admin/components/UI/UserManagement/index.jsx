import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/components.css"
import Entry from '../../base/Entry'
import CreateUser from "../../base/CreateUser";


const UserManagement = ({userslist}) => {

const [users, setUsers] = useState(userslist)
console.log('men el users', users.data)



const handleUserDeleted = (userId) => {
  setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
};

const handleUserCreated = (newUser) => {
  setUsers(prevUsers => [...prevUsers, newUser]);
};

const handleUserModified = (modifiedUser) => {
  setUsers(prevUsers =>
    prevUsers.map(user => (user.id === modifiedUser.id ? modifiedUser : user))
  );
};

const mapRoleToLabel = (roleValue) => {
  if (roleValue === "teacher" || roleValue === "2" || roleValue === 2) {
    return "teacher";
  } else if (roleValue === "student" || roleValue === "3" || roleValue === 3) {
    return "student";
  } else if (roleValue === "parent" || roleValue === "4" || roleValue === 4) {
    return "parent";
  } else {
    return "Role";
  }
};

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
              role={mapRoleToLabel(user.role)}
              onUserDeleted={handleUserDeleted} 
              onModify={handleUserModified} 
            />
            <br />
          </div>
        )
      )}
    </div>
  );
};

export default UserManagement