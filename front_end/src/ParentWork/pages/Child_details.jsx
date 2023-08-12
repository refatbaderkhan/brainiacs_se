import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Child_details.css";
import axios from "axios";

import TeacherList from "../components_parent/TeacherList";
import MessageForm from "../components_parent/MessageForm";
import MessageThreads from "../components_parent/MessageThreads";
import Attendence from "../components_parent/Attendence";

function ChildPage() {
  const location = useLocation();
  const child = location.state || {};
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const parentId = localStorage.getItem("parent_id") || "dummy_parent_id";
  const [childDetails, setChildDetails] = useState({
    student: {},
    courses_progress: [],
    student_performance: {
      enrolled_courses: 0,
      completed_courses: 0,
      average_grade: null,
    },
  });
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const accessToken =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2d1ZXN0L2xvZ2luIiwiaWF0IjoxNjkxODc5NjcyLCJleHAiOjE2OTE4ODMyNzIsIm5iZiI6MTY5MTg3OTY3MiwianRpIjoiRFFYdzM1Q3dZdkpSeXJYcyIsInN1YiI6IjciLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.Cja0IAfKandr4V-duovvlMYYUEkEKwsXIJ0m9qra-3M";
    const updatedTeachers = [];

    axios
      .get(`http://127.0.0.1:8000/api/parent/child/${child.id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setChildDetails(response.data.data);

        response.data.data.courses_progress.forEach((courseProgress) => {
          const teacherId = courseProgress.course.teacher_id;
          const teacherExists = updatedTeachers.find(
            (teacher) => teacher.id === teacherId
          );

          //   if (
          //     updatedTeachers.filter((teacher) => teacher.id === teacherId) != []
          //   ) {
          if (!teacherExists) {
            axios
              .get(`http://127.0.0.1:8000/api/parent/teachers/${teacherId}`, {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              })
              .then((response) => {
                const teacher = response.data.data;
                updatedTeachers.push({ id: teacher.id, name: teacher.name });
                setTeachers(updatedTeachers);
              })
              .catch((error) => {
                console.error("Error fetching teacher:", error);
              });
          }
        });
      })
      .catch((error) => {
        console.error("Error fetching child details:", error);
      });
  }, []);
  return (
    <div className="child-details-container">
      <h2 className="child-name">
        {childDetails.student.name || "Child Name"}
      </h2>
      <div className="child-progress">
        <h3>Progress</h3>
        <p>{childDetails.student_performance.enrolled_courses || 0}%</p>
      </div>
      <div className="child-grades">
        <h3>Grades</h3>
        <ul>
          {childDetails.courses_progress.map((courseProgress) =>
            courseProgress.grades.map((grade) => (
              <li key={grade.id}>
                {courseProgress.course.title}: {grade.grade}
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="child-assignments">
        <h3>Assignments</h3>
        <ul>
          {childDetails.courses_progress.map((courseProgress) =>
            courseProgress.course.assignments.map((assignment) => (
              <li key={assignment.id}>
                {assignment.title} - Due: {assignment.due_date} -
                {/* Status:{" "}
                {assignment.status} */}
              </li>
            ))
          )}
        </ul>
      </div>

      <Attendence childId={child.id} />

      {/* Display the teacher list */}
      <TeacherList teachers={teachers} onSelectTeacher={setSelectedTeacher} />

      {/* Display the message form */}
      {selectedTeacher && (
        <MessageForm
          parentSenderId={parentId}
          teacherId={selectedTeacher.id}
          onCancel={() => setSelectedTeacher(null)}
        />
      )}

      {/* Display the message threads */}
      {selectedTeacher && (
        <MessageThreads
          parentSenderId={parentId}
          teacherId={selectedTeacher.id}
        />
      )}
    </div>
  );
}

export default ChildPage;
