import React, { useState, useEffect } from "react";
import './style.css'
import ModifyUser from '../ModifyUser'
import DeleteUser from '../DeleteUser'


const Entry = ({id, name, email, role, onUserDeleted }) => {

  const [isModifyUserVisible, setIsModifyUserVisible] = useState(false); // Initialize state


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

  const handleCancelClick = () => {
    setIsDeleteUserVisible(false);
  };

  
  const handleUserDeleted = () => {
    setIsDeleteUserVisible(false); // Close the DeleteUser component
    onUserDeleted(id); // Pass the user ID to the callback
  };

  return (
    <div>
    <div className='entry-container'>
      <h2>{name}</h2>
      <h2>{email}</h2>
      <h2>{role}</h2>
      <button className='card-select' onClick={handleModifyClick} >manage</button>
      <button className='card-select' onClick={handleDeleteClick} >delete</button>
    </div>
    <div>
    {isModifyUserVisible && (
        <ModifyUser
          id={id}
          name={name}
          email={email}
          role={role}
          onCancel={handleCancelModifyClick} // Pass the cancel handler to ModifyUser
        />
      )}
    </div>
    {isDeleteUserVisible && (
        <DeleteUser
          id={id}
          onCancel={handleCancelClick} // Pass the cancel handler to ModifyUser
          onUserDeleted={handleUserDeleted}
        />
      )}
    </div>
  )
}

export default Entry