import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/components.css";
import CourseEntry from "../../base/CourseEntry";
import CreateCourse from "../../base/CreateCourse";

const CourseManagement = ({ courseslist, userslist }) => {
  const [users, setUsers] = useState(userslist);
  const [courses, setCourses] = useState(courseslist);

  const handleCourseDeleted = (courseId) => {
    setCourses((prevCourses) =>
      prevCourses.filter((course) => course.id !== courseId)
    );
  };

  const handleCourseCreated = (newCourse) => {
    setCourses((prevCourses) => [...prevCourses, newCourse]);
  };

  const handleCourseModified = (modifiedCourse) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === modifiedCourse.id ? modifiedCourse : course
      )
    );
  };

  return (
    <div className="margin users-container ">
      <div>
        <CreateCourse
          onCourseCreated={handleCourseCreated}
          userslist={userslist}
        />
      </div>
      <br></br>
      {courses.map((course) => {
        const teacher = users.find((user) => user.id === course.teacher_id);
        console.log(course);
        console.log(teacher);
        return (
          <div key={course.id}>
            <CourseEntry
              id={course.id}
              title={course.title}
              description={course.description}
              enrollment_limit={course.enrollment_limit}
              teacher_id={teacher?.name}
              onCourseDeleted={handleCourseDeleted}
              onModify={handleCourseModified}
            />
            <br />
          </div>
        );
      })}
    </div>
  );
};

export default CourseManagement;
