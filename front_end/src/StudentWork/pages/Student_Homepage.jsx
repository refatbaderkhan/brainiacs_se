import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Student_Homepage.css";

function StudentHomePage() {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const accessToken = localStorage.getItem("token");

  useEffect(() => {
    // Fetch available courses
    axios
      .get("http://127.0.0.1:8000/api/student/courses", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setCourses(response.data.courses);
      })
      .catch((error) => {
        console.error("Error fetching available courses:", error);
      });

    // Fetch enrolled courses
    axios
      .get("http://127.0.0.1:8000/api/student/enrolled-courses", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setEnrolledCourses(response.data.enrolled_courses);
      })
      .catch((error) => {
        console.error("Error fetching enrolled courses:", error);
      });
  }, []);

  const enrollInCourse = (courseId) => {};

  const selectCourse = (course) => {
    setSelectedCourse(course);
  };

  return (
    <div className="student-homepage">
      <h1>Welcome to Student Dashboard</h1>

      <h2>Available Courses:</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            {course.title} - {course.description}
            <button onClick={() => enrollInCourse(course.id)}>Enroll</button>
          </li>
        ))}
      </ul>

      <h2>Enrolled Courses:</h2>
      <ul>
        {enrolledCourses.map((course) => (
          <li key={course.id}>
            {course.title} - {course.description}
            <button onClick={() => selectCourse(course)}>Access</button>
          </li>
        ))}
      </ul>

      {selectedCourse && (
        <div className="selected-course">
          <h3>{selectedCourse.title}</h3>
          <p>{selectedCourse.description}</p>
          {/* Implement interactive learning components here */}
        </div>
      )}
    </div>
  );
}

export default StudentHomePage;
