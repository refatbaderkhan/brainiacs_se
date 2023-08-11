import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Child_details.css";

import TeacherList from "../components_parent/TeacherList";
import MessageForm from "../components_parent/MessageForm";
import MessageThreads from "../components_parent/MessageThreads";

function ChildPage() {
  const location = useLocation();
  const child = location.state || {};
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const parentId = localStorage.getItem("parent_id") || "dummy_parent_id";

  //dummy for teachers:
  const teachers = [
    { id: 1, name: "Teacher 1" },
    { id: 2, name: "Teacher 2" },
    { id: 3, name: "Teacher 3" },
  ];
  return (
    <div className="child-details-container">
      <h2 className="child-name">{child.name || "Child Name"}</h2>
      <div className="child-progress">
        <h3>Progress</h3>
        <p>{child.progress || 0}%</p>
      </div>
      <div className="child-grades">
        <h3>Grades</h3>
        <ul>
          {child.grades &&
            child.grades.map((grade, index) => (
              <li key={index}>
                {grade.course}: {grade.grade}
              </li>
            ))}
        </ul>
      </div>
      <div className="child-assignments">
        <h3>Assignments</h3>
        <ul>
          {child.assignments &&
            child.assignments.map((assignment, index) => (
              <li key={index}>
                {assignment.title} - Due: {assignment.dueDate} - Status:{" "}
                {assignment.status}
              </li>
            ))}
        </ul>
      </div>

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
