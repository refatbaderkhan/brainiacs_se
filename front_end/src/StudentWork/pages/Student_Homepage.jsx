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
      .get("http://127.0.0.1:8000/api/available-courses", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setCourses(response.data.available_courses);
      })
      .catch((error) => {
        console.error("Error fetching available courses:", error);
      });

    // Fetch enrolled courses
    axios
      .get("http://127.0.0.1:8000/api/enrolled-courses", {
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
  }, [accessToken]);

  const enrollInCourse = (courseId) => {
    axios
      .post(
        `http://127.0.0.1:8000/api/student/enroll-in-course/${courseId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        // Handle enrollment success
        // You can fetch enrolled courses again to update the list
      })
      .catch((error) => {
        console.error("Error enrolling in course:", error);
      });
  };

  const selectCourse = (course) => {
    setSelectedCourse(course);
  };

  return (
    <div className="student-homepage">
      <h1>Welcome, {localStorage.getItem("name")}!</h1>

      <h2>Enrolled Courses:</h2>
      <div className="course-cards">
        {enrolledCourses.map((course) => (
          <div className="course-card" key={course.id}>
            <h3>{course.course.title}</h3>

            <button onClick={() => selectCourse(course)}>Access</button>
          </div>
        ))}
      </div>

      <h2>Available Courses:</h2>
      <div className="course-cards">
        {courses.map((course) => (
          <div className="course-card" key={course.id}>
            <h3>{course.title}</h3>

            <button onClick={() => enrollInCourse(course.id)}>Enroll</button>
          </div>
        ))}
      </div>

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
