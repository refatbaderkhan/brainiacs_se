import React, { useState, useEffect } from "react";
import axios from "axios";

import './style.css'

const DeleteCourse = ({id, onCancel, onCourseDeleted }) => {

  const link = `http://127.0.0.1:8000/api/courses/${id}`
  const token = localStorage.getItem('token')
  const headers = { Authorization: `Bearer ${token}`,};


  const handleSubmit = async () => {

    try {
      const courses = await axios.delete(link, { headers });
      onCourseDeleted(id);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className='modify-container column'>
      <h1>Delete Course:</h1>
      <button onClick={handleSubmit}>Delete</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default DeleteCourse