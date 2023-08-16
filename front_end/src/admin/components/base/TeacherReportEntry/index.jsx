import React, { useState, useEffect } from "react";
import './style.css'


const TeacherReportEntry = ({id, user_id, user_name, course_id, course_name, student_count, completion_rate}) => {

  return (
    <div className='entry-container'>
      <h3>Teacher:
      <br></br>
        {user_name}</h3>
      <h3>Course:
        <br></br>
        {course_name}</h3>
        <br></br>
        <h3>Students Count: 
        <br></br>
        {student_count}</h3>
        <h3>Completion Rate: 
        <br></br>
        {completion_rate}</h3>
    </div>
  )
}

export default TeacherReportEntry