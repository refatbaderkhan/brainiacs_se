import React, { useState } from "react";
import ExpandableTree from './ExpandableTree';
import '../../styles/studentAssignments.css';
import Modal from 'react-modal';
  
const StudentAssignments = ({ student }) => {
  const [expanded, setExpanded] = useState(false);
  const [expandedAssignments, setExpandedAssignments] = useState({});
  const [isGradingModalOpen, setIsGradingModalOpen] = useState(false);


  const toggleAssignment = (assignmentId) => {
    setExpandedAssignments(prevState => ({
      ...prevState,
      [assignmentId]: !prevState[assignmentId]
    }));
  };

  const openGradingModal = () => {
    setIsGradingModalOpen(true);
  };
  
  const closeGradingModal = () => {
    setIsGradingModalOpen(false);
  };
  return (
    <div className="student-assignments">
      <ExpandableTree
        title={`${student.name}'s Assignments`}
        expanded={expanded}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded && (
          <div className="expandable-content">
            {student.assignments.map(assignment => (
              <div key={assignment.assignment_id}>
                <ExpandableTree
                  title={assignment.assignment_name}
                  expanded={expandedAssignments[assignment.assignment_id] || false}
                  onClick={() => toggleAssignment(assignment.assignment_id)}
                  hw
                  openGradingModal={openGradingModal}
                >
               
                  {
                    <div className="expandable-content">
                        <div>
                          <li>doc:{assignment.assignment_doc}</li>
                          <li>Submitted At: {assignment.submitted_at}</li>
                          <li>Grade: {assignment.grade}</li>
                        </div>
                    </div>
                  }
                </ExpandableTree>
                <Modal
                  isOpen={isGradingModalOpen}
                  onRequestClose={closeGradingModal}
                  contentLabel="Grade Assignments"
                  className="modal"
                  overlayClassName="overlay"
                >
                {
                  <>
                  <p style={{color:"black"}}>{assignment.assignment_name}</p>
                  <input value={assignment.grade} style={{color:"black"}}/>
                  {/* wrong display */}
                  </>
                }
                </Modal>
              </div>
            ))}
          </div>
        )}
      </ExpandableTree>
    </div>
  );
};

export default StudentAssignments;
