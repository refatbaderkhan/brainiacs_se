import React, { useState, useEffect } from "react";
import './style.css'
import ModifyUser from '../ModifyUser'
import DeleteUser from '../DeleteUser'


const Entry = ({id, name, email, role, onUserDeleted, onModify}) => {

  const [isModifyUserVisible, setIsModifyUserVisible] = useState(false);


  const handleModifyClick = () => {
    setIsModifyUserVisible(true);
  };

  const handleCancelModifyClick = () => {
    setIsModifyUserVisible(false);
  };

  const [isDeleteUserVisible, setIsDeleteUserVisible] = useState(false);

  const handleDeleteClick = () => {
    setIsDeleteUserVisible(true);
  };

  const handleCancelDeleteClick = () => {
    setIsDeleteUserVisible(false);
  };

  
  const handleUserDeleted = () => {
    setIsDeleteUserVisible(false); 
    onUserDeleted(id); 
  };

  const handleUserModified = (modifiedUser) => {
    setIsModifyUserVisible(false); 
    onModify(modifiedUser);
  };

  const mapRoleToLabel = (roleValue) => {
    if (roleValue === "teacher" || roleValue === "2") {
      return "teacher";
    } else if (roleValue === "student" || roleValue === "3") {
      return "student";
    } else if (roleValue === "parent" || roleValue === "4") {
      return "parent";
    } else {
      return "Role";
    }
  };

  return (
    <div>
    <div className='entry-container'>
      <h3>Name:
      <br></br>
        {name}</h3>
      <h3>Email:
        <br></br>
        {email}</h3>
        <br></br>
        <h3>Role: 
        <br></br>
        {mapRoleToLabel(role)}</h3>
      <div className="button-container">
      <button className='card-select' onClick={handleModifyClick} >manage</button>
      <button className='card-select' onClick={handleDeleteClick} >delete</button>
      </div>
    </div>
    <div>
    {isModifyUserVisible && (
        <ModifyUser
          id={id}
          name={name}
          email={email}
          role={role}
          onCancel={handleCancelModifyClick}
          onModify={handleUserModified}
        />
      )}
    </div>
    {isDeleteUserVisible && (
        <DeleteUser
          id={id}
          onCancel={handleCancelDeleteClick}
          onUserDeleted={handleUserDeleted}
        />
      )}
    </div>
  )
}

export default Entry