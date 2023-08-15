import React, { useState, useEffect } from "react";
import axios from "axios";

import "./style.css"

const CreateCourse = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
    enrollment_limit: "",
    teacher_id: "",
  })

  const token = localStorage.getItem('token')
  const headers = { Authorization: `Bearer ${token}`,};


  const handleDataChange = (e)=>{
    setData({...data, [e.target.name]: e.target.value})
  }

  const handleSubmit = async () => {

    try {
      const users = await axios.post('http://127.0.0.1:8000/api/create', data, { headers });
      console.log('men el create', users.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };



  return (
    <div className='entry-container column'>
      <h1>Create Course:</h1>
      <input name="title" placeholder="Enter Course Title"  defaultValue={data.title} value={data.title} onChange={handleDataChange}/> 
      <input name="description" placeholder="Enter Course description" defaultValue={data.description} value={data.description} onChange={handleDataChange}/>
      <input name="enrollment_limit" placeholder="Enter Enrollment Limit"  defaultValue={data.enrollment_limit} value={data.enrollment_limit}  onChange={handleDataChange}/>
      <input name="teacher_id" placeholder="Enter Teacher ID"  defaultValue={data.teacher_id} value={data.teacher_id}  onChange={handleDataChange}/>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default CreateCourse