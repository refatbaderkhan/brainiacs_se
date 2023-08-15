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
      .post(`http://127.0.0.1:8000/api/enroll/${courseId}`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        // Fetch updated enrolled courses list
        axios
          .get("http://127.0.0.1:8000/api/enrolled-courses", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            setEnrolledCourses(response.data.enrolled_courses);

            const enrolledCourse = courses.find(
              (course) => course.id === courseId
            );

            setCourses((prevCourses) =>
              prevCourses.filter((course) => course.id !== courseId)
            );
          })
          .catch((error) => {
            console.error("Error fetching enrolled courses:", error);
          });
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
        {enrolledCourses.map((enrolledCourse) => (
          <div className="course-card" key={enrolledCourse.id}>
            <h3>{enrolledCourse.course.title}</h3>
            <button onClick={() => selectCourse(enrolledCourse)}>Access</button>
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
