import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CourseDetailsPage.css";

function CourseDetailsPage({ selectedCourse }) {
  const [courseMaterials, setCourseMaterials] = useState([]);

  const accessToken = localStorage.getItem("token");

  useEffect(() => {
    if (selectedCourse) {
      axios
        .get(
          `http://127.0.0.1:8000/api/course-materials/${selectedCourse.id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          setCourseMaterials(response.data.course_materials);
        })
        .catch((error) => {
          console.error("Error fetching course materials:", error);
        });
    }
  }, [accessToken, selectedCourse]);

  return (
    <div className="course-details-page">
      <h2>{selectedCourse.title} Details</h2>
      <p>{selectedCourse.description}</p>

      <h3>Course Materials:</h3>
      <ul>
        {courseMaterials.map((material) => (
          <li key={material.id}>{material.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default CourseDetailsPage;
