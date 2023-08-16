import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css"

const CreateUser = ({onUserCreated}) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  })

  const [response, setResponse] = useState("");

  const token = localStorage.getItem('token')
  const headers = { Authorization: `Bearer ${token}`,};


  const handleDataChange = (e)=>{
    setData({...data, [e.target.name]: e.target.value})
  }


  const handleSubmit = async () => {
    if (data.name && data.email && data.password && data.role) {
      try {
        const users = await axios.post(
          "http://127.0.0.1:8000/api/create",
          data,
          { headers }
        );
        const newUser = users.data.user;
        onUserCreated(newUser);
        setResponse("User created successfully.");
      } catch (error) {
        console.error("Error fetching data:", error);
        setResponse("An error occurred. Please make sure that you entered a valid email or minimum of 6 characters password and try again.");
      }
    } else {
      setResponse("Please fill in all fields before submitting.");
    }
  };


  return (
    <div className='create-container column'>
      <h1>Create User:</h1>
      <input name="name" placeholder="Enter User Name"  defaultValue={data.name} value={data.name} onChange={handleDataChange}/> 
      <input name="email" placeholder="Enter Email" defaultValue={data.email} value={data.email} onChange={handleDataChange}/>
      <input name="password" placeholder="Enter Password"  defaultValue={data.password} value={data.password}  onChange={handleDataChange}/>
      <select name="role" value={data.role} onChange={handleDataChange}>
        <option value="">Select User Type</option>
        <option value="teacher">Teacher</option>
        <option value="parent">Parent</option>
        <option value="student">Student</option>
      </select>
      <p1>{response}</p1>
      <button className="button" onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default CreateUser