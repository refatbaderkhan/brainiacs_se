import React, { useState, useEffect } from "react";
import axios from "axios";
import './style.css'

const ModifyUser = ({id, name, email, role, onCancel}) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    role: ""
  })
  console.log(id)
  const link = `http://127.0.0.1:8000/api/users/${id}`
  console.log(link)
  const token = localStorage.getItem('token')
  const headers = { Authorization: `Bearer ${token}`,};

  const handleDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleSubmit = async () => {

    try {
      const users = await axios.post(link, data, { headers });
      console.log('men el modify', users.data);
    } catch (error) {
      console.error("Error fetching data:", error);
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
      <input name="role" placeholder="Enter New Role"  defaultValue={data.password} value={data.password}  onChange={handleDataChange}/>
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default ModifyUser