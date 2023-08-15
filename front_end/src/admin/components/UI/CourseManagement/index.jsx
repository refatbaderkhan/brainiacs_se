import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/components.css"
import Entry from '../../base/Entry'
import CourseEntry from '../../base/CourseEntry'

import CreateUser from "../../base/CreateUser";
import CreateCourse from "../../base/CreateCourse";


const CourseManagement = () => {

  const fetchResponse = async () =>{
    const response = await axios.get("http://127.0.0.1:8000/api/guest/trust_issues");
    console.log('men el ui',response.data.message)
  }

  useEffect(()=>{
    fetchResponse();
  },[])

  return (  
    <div className="margin users-container ">
      <div>
      <CreateCourse/>
      </div>
      <br></br>
      <div>
      <CourseEntry title='refat' enrollment_limit='refatbaderkhan@gmail.com' role='teacher'/>
      </div>
      <br></br>
      <div>
      <CourseEntry/>
      </div>
    </div>
  )
}

export default CourseManagement