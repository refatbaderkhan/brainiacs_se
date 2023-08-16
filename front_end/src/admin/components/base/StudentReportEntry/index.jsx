import React, { useState, useEffect } from "react";
import './style.css'


const StudnetReportEntry = ({id, user_id,user_name, average_grade, enrolled_courses, completed_courses}) => {

  return (
    <div className='entry-container'>
      <h3>Student:
      <br></br>
        {user_name}</h3>
      <h3>Average Grade:
        <br></br>
        {average_grade}</h3>
        <br></br>
        <h3>Enrolled Courses: 
        <br></br>
        {enrolled_courses}</h3>
        <h3>Completed Courses: 
        <br></br>
        {completed_courses}</h3>
    </div>
  )
}

export default StudnetReportEntry