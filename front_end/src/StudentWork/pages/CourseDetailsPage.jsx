import React, { useState, useEffect } from "react";
import axios from "axios";
import QuizDetails from "../components_student/QuizDetails";
import "./CourseDetailsPage.css";

function CourseDetailsPage({ selectedCourse }) {
  const [courseMaterials, setCourseMaterials] = useState([]);
  const [completedAssignments, setCompletedAssignments] = useState([]);
  const [upcomingAssignments, setUpcomingAssignments] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const accessToken = localStorage.getItem("token");

  useEffect(() => {
    if (selectedCourse) {
      // Fetch course materials
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

      // Fetch completed assignments for the specific course
      axios
        .get(
          `http://127.0.0.1:8000/api/completed-assignments/${selectedCourse.id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          setCompletedAssignments(response.data.completed_assignments);
        })
        .catch((error) => {
          console.error("Error fetching completed assignments:", error);
        });

      // Fetch upcoming assignments for the specific course
      axios
        .get(
          `http://127.0.0.1:8000/api/upcoming-assignments/${selectedCourse.id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          setUpcomingAssignments(response.data.upcoming_assignments);
        })
        .catch((error) => {
          console.error("Error fetching upcoming assignments:", error);
        });
      // Fetch quizzes for the specific course
      axios
        .get(`http://127.0.0.1:8000/api/courses/${selectedCourse.id}/quizzes`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setQuizzes(response.data.quizzes);
        })
        .catch((error) => {
          console.error("Error fetching quizzes:", error);
        });
    }
  }, [accessToken, selectedCourse]);

  return (
    <div className="course-details-page">
      <h2>{selectedCourse.title} Details</h2>
      <p>{selectedCourse.description}</p>

      <h3>Course Materials:</h3>
      {courseMaterials && courseMaterials.length > 0 ? (
        <ul>
          {courseMaterials.map((material) => (
            <li key={material.id}>{material.title}</li>
          ))}
        </ul>
      ) : (
        <p>No course materials available.</p>
      )}
      <h3>Completed Assignments:</h3>
      <ul>
        {completedAssignments.map((completedAssignment) => (
          <li key={completedAssignment.id}>
            Assignment ID: {completedAssignment.assignment_id}, Title:{" "}
            {completedAssignment.assignment.title}, Grade:{" "}
            {completedAssignment.grade}
            <p>Description: {completedAssignment.assignment.description}</p>
          </li>
        ))}
      </ul>

      <h3>Upcoming Assignments:</h3>
      <ul>
        {upcomingAssignments.map((assignmentInfo) => (
          <li key={assignmentInfo.assignment.id}>
            Assignment Title: {assignmentInfo.assignment.title}
            <br />
            Description: {assignmentInfo.assignment.description}
            <br />
            Due Date: {assignmentInfo.assignment.due_date}
          </li>
        ))}
      </ul>

      <h3>Quizzes:</h3>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id}>
            {quiz.title}
            <button onClick={() => setSelectedQuiz(quiz.id)}>View Quiz</button>
            {/* Render QuizDetails component if this quiz is selected */}
            {selectedQuiz === quiz.id && <QuizDetails quizId={selectedQuiz} />}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseDetailsPage;
