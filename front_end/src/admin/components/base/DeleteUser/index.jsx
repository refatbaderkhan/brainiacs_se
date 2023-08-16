import React, { useState, useEffect } from "react";
import axios from "axios";

import './style.css'

const DeleteUser = ({id, onCancel, onUserDeleted }) => {

  const link = `http://127.0.0.1:8000/api/users/${id}`
  const token = localStorage.getItem('token')
  const headers = { Authorization: `Bearer ${token}`,};


  const handleSubmit = async () => {

    try {
      const users = await axios.delete(link, { headers });
      onUserDeleted(id);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className='modify-container column'>
      <h1>Delete User:</h1>
      <button onClick={handleSubmit}>Delete</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default DeleteUser