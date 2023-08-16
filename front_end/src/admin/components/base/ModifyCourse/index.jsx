import React, { useState, useEffect } from "react";
import axios from "axios";
import './style.css'

const ModifyCourse = ({id, title, description, enrollment_limit, teacher_id, onCancel, onModify}) => {
  const [data, setData] = useState({
    title: "",
    description: "",
    enrollment_limit: "",
    teacher_id: ""
  })

  const [response, setResponse] = useState("");


  const link = `http://127.0.0.1:8000/api/courses/${id}`
  const token = localStorage.getItem('token')
  const headers = { Authorization: `Bearer ${token}`,};

  const handleDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleSubmit = async () => {
    console.log(link)
    if (data.title && data.description && data.enrollment_limit && data.teacher_id) {
      try {
        const courses = await axios.post(link, data, { headers });
        const modifiedCourse = courses.data.course;
        onModify(modifiedCourse);
        setResponse("Course modified successfully.");
      } catch (error) {
        console.error("Error fetching data:", error);
        setResponse("An error occurred.");
      }
    } else {
      setResponse("Please fill in all fields before submitting.");
    }
  };

  return (
    <div className='modify-container column'>
      <h1>Modify Course:</h1>
      Current title: {title}
      <input name="title" placeholder="Enter New title"  defaultValue={data.title} value={data.title} onChange={handleDataChange}/>
      Current Description: {description}
      <input name="description" placeholder="Enter New description" defaultValue={data.description} value={data.description} onChange={handleDataChange}/>
      Current Enrollment Limit: {enrollment_limit}
      <input name="enrollment_limit" placeholder="Enter New Enrollment Limit" defaultValue={data.enrollment_limit} value={data.enrollment_limit} onChange={handleDataChange}/>
      Current Teacher ID: {teacher_id}
      <input name="teacher_id" placeholder="Enter New Teacher ID" defaultValue={data.teacher_id} value={data.teacher_id} onChange={handleDataChange}/>
      <p>{response}</p>
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default ModifyCourse