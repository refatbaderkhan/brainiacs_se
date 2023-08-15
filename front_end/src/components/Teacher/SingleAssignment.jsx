import React, { useState } from "react";
import '../../styles/assignment.css';
import ExpandableTree from "./ExpandableTree";


const SingleAssignment = ({ assignment }) => {
  const [expandedAssignments, setExpandedAssignments] = useState(false);
  const toggleAssignment = (assignmentId) => {
    setExpandedAssignments(prevState => ({
      ...prevState,
      [assignmentId]: !prevState[assignmentId]
    }));
  };
  return (
    
    <div className="assignment-expandable">
      <ExpandableTree
        title={assignment?.assignment_title}
        expanded={expandedAssignments[assignment?.assignment_id] || false}
        onClick={() => toggleAssignment(assignment?.assignment_id)}
      >
      {expandedAssignments && (
        <div className="assignment-details">
          <p color="black">Due at: {assignment.assignment_due}</p>
          <p>Grade: {assignment.assignment_grade}</p>
          <p>Description: {assignment.assignment_desc}</p>
          <p>Document: {assignment.assignment_doc}</p>  
        </div>
      )}
      </ExpandableTree>
    </div>
   
  );
};

export default SingleAssignment;