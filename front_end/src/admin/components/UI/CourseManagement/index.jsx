import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/components.css"
import CourseEntry from '../../base/CourseEntry'
import CreateCourse from "../../base/CreateCourse";


const CourseManagement = ({courseslist}) => {

  const [courses, setCourses] = useState(courseslist)
  
  
  const handleCourseDeleted = (courseId) => {
    setCourses((prevCourses) => prevCourses.filter((course) => course.id !== courseId));
  };
  
  const handleCourseCreated = (newCourse) => {
    setCourses(prevCourses => [...prevCourses, newCourse]);
  };
  
  const handleCourseModified = (modifiedCourse) => {
    setCourses(prevCourses =>
      prevCourses.map(course => (course.id === modifiedCourse.id ? modifiedCourse : course))
    );
  };
  
  
    return (  
      <div className="margin users-container ">
        <div>
        <CreateCourse onCourseCreated={handleCourseCreated}/>
        </div>
        <br></br>
        {courses.map((course) => (
            <div key={course.id}>
              <CourseEntry
                id={course.id}
                title={course.title}
                description={course.description}
                enrollment_limit={course.enrollment_limit}
                teacher_id={course.teacher_id}
                onCourseDeleted={handleCourseDeleted} 
                onModify={handleCourseModified} 
              />
              <br />
            </div>
          )
        )}
      </div>
    );
  };
  
  export default CourseManagement