import React, { useState, useEffect } from "react";
import './style.css'

const ModifyCourse = ({title , enrollment_limit, onCancel}) => {
  const [data, setData] = useState({
    title: "",
    enrollment_limit: "",
  })


  const handleDataChange = (e)=>{
    setData({...data, [e.target.name]: e.target.value})
  }

 //const handleSubmit = async ()=>{
 //  try{
 //    const response = await axios.post("http://127.0.0.1:8000/api/add_contact", data)
 //    const newContact = response.data.contact;
 //    
 //    addedContact(newContact);


 //    setData({first_name: "", last_name: "", phonenumber:"", latitude: "", longitude: ""})
 //  }catch(e){
 //    console.log(e)
 //  }
 //  
 //}

  const handleSubmit = () =>
  console.log(data);
  //setData({name: "", email: "", password:""});



  return (
    <div className='modify-container column'>
      <h1>Modify Course:</h1>
      Current Title: {title}
      <input name="title" placeholder="Enter New Title"  defaultValue={data.title} value={data.title} onChange={handleDataChange}/>
      Current Enrollment Limit: {enrollment_limit}
      <input name="enrollment_limit" placeholder="Enter New limit" defaultValue={data.email} value={data.email} onChange={handleDataChange}/>
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default ModifyCourse