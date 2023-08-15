import React, { useState, useEffect } from "react";
import './style.css'

const DeleteCourse = ({id, onCancel}) => {

  const handleSubmit = () =>
  console.log({id});



  return (
    <div className='modify-container column'>
      <h1>Delete Course:</h1>
      <button onClick={handleSubmit}>Delete</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default DeleteCourse