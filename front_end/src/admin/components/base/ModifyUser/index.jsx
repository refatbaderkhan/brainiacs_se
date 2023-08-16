import React, { useState, useEffect } from "react";
import axios from "axios";
import './style.css'

const ModifyUser = ({id, name, email, role, onCancel, onModify}) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    role: ""
  })

  const [response, setResponse] = useState("");


  const link = `http://127.0.0.1:8000/api/users/${id}`
  const token = localStorage.getItem('token')
  const headers = { Authorization: `Bearer ${token}`,};

  const handleDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleSubmit = async () => {
    if (data.name && data.email && data.role) {
      try {
        const users = await axios.post(link, data, { headers });
        const modifiedUser = users.data.user;
        onModify(modifiedUser);
        setResponse("User modified successfully.");
      } catch (error) {
        console.error("Error fetching data:", error);
        setResponse("An error occurred. Please make sure that you entered a valid email, and try again.");
      }
    } else {
      setResponse("Please fill in all fields before submitting.");
    }
  };

  return (
    <div className='modify-container column'>
      <h1>Modify User:</h1>
      Current Name: {name}
      <input name="name" placeholder="Enter New User Name"  defaultValue={data.name} value={data.name} onChange={handleDataChange}/>
      Current Email: {email}
      <input name="email" placeholder="Enter New Email" defaultValue={data.email} value={data.email} onChange={handleDataChange}/>
      Current Role: {role}
      <select name="role" value={data.role} onChange={handleDataChange}>
        <option value="">Select User Type</option>
        <option value="2">Teacher</option>
        <option value="3">Student</option>
        <option value="4">Parent</option>
      </select>
      <p>{response}</p>
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default ModifyUser