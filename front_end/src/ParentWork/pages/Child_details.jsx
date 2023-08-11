import React from "react";
import { useLocation } from "react-router-dom";
import "./Child_details.css";

function ChildPage() {
  const location = useLocation();
  const child = location.state || {};

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
    </div>
  );
}

export default ChildPage;
