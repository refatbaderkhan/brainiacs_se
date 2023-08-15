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

  const token = localStorage.getItem('token')
  const headers = { Authorization: `Bearer ${token}`,};


  const handleDataChange = (e)=>{
    setData({...data, [e.target.name]: e.target.value})
  }

  const handleSubmit = async () => {

    try {
      const users = await axios.post('http://127.0.0.1:8000/api/create', data, { headers });
      console.log('men el create', users.data);
      const newUser = users.data.user; // Assuming the API response returns the newly created user
      console.log(newUser)
      onUserCreated(newUser); // Notify UserManagement

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className='entry-container column'>
      <h1>Create User:</h1>
      <input name="name" placeholder="Enter User Name"  defaultValue={data.name} value={data.name} onChange={handleDataChange}/> 
      <input name="email" placeholder="Enter Email" defaultValue={data.email} value={data.email} onChange={handleDataChange}/>
      <input name="password" placeholder="Enter Password"  defaultValue={data.password} value={data.password}  onChange={handleDataChange}/>
      <input name="role" placeholder="Enter Role"  defaultValue={data.role} value={data.role}  onChange={handleDataChange}/>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default CreateUser