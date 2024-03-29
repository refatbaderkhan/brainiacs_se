import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Child_details.css";
import axios from "axios";

import TeacherList from "../components_parent/TeacherList";
import MessageForm from "../components_parent/MessageForm";
import MessageThreads from "../components_parent/MessageThreads";
import Attendence from "../components_parent/Attendence";
import NotificationsPopOut from "../components_parent/NotificationsPopOut ";
import ScheduleMeetingForm from "../components_parent/ScheduleMeetingForm";

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
  const [showNotifications, setShowNotifications] = useState(false);
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  useEffect(() => {
    // Retrieve the token from local storage
    const accessToken = localStorage.getItem("token");
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
      {/* Button to open notifications */}
      <button onClick={toggleNotifications}>Show Notifications</button>

      <h2 className="child-name">
        {childDetails.student.name || "Child Name"}
      </h2>

      <div className="child-progress">
        <h3>Progress</h3>
        <p>
          Enrolled Courses:{" "}
          {childDetails.student_performance.enrolled_courses || 0}
        </p>
        <p>
          Completed Courses:{" "}
          {childDetails.student_performance.completed_courses || 0}
        </p>
        <p>
          Average Grade:{" "}
          {childDetails.student_performance.average_grade || "N/A"}
        </p>
      </div>

      <div className="child-courses">
        <h3>Courses</h3>
        {childDetails.courses_progress.map((courseProgress) => (
          <div key={courseProgress.course.id} className="course-details">
            <h4>{courseProgress.course.title}</h4>
            <p>Description: {courseProgress.course.description}</p>

            <h5>Assignments</h5>
            <ul>
              {courseProgress.course.assignments.map((assignment) => (
                <li key={assignment.id}>
                  {assignment.title} - Due: {assignment.due_date}
                  {courseProgress.grades.map((grade) => {
                    if (grade.assignment_id === assignment.id) {
                      return ` - Grade: ${grade.grade || "N/A"}`;
                    }
                    return null;
                  })}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Attendence childId={childDetails.student.id} />

      {/* Display the teacher list */}
      <TeacherList teachers={teachers} onSelectTeacher={setSelectedTeacher} />

      {/* Display the scheduling form */}
      {selectedTeacher && (
        <ScheduleMeetingForm
          parentSenderId={parentId}
          teacherId={selectedTeacher.id}
        />
      )}

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
      {/* Show notifications pop-out if state is true */}
      {showNotifications && (
        <NotificationsPopOut onClose={toggleNotifications} childId={child.id} />
      )}
    </div>
  );
}

export default ChildPage;
