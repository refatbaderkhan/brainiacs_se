import React, { useContext, useState } from "react";
import TeacherContext from '../../context/TeacherContext';
import ExpandableTree from './ExpandableTree';
import '../../styles/studentAssignments.css';
import Modal from 'react-modal';
  
const StudentAssignments = ({ student , course }) => {
  const [expanded, setExpanded] = useState(false);
  const [expandedAssignments, setExpandedAssignments] = useState({});
  const [isGradingModalOpen, setIsGradingModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [gradingModalStates, setGradingModalStates] = useState({
    grade:0,
    studentName: ''
  });
  const [feedbackModalStates, setFeedbackModalStates] = useState({
    feedback:0,
    studentName: ''
  });
  const [currentAssignment, setCurrentAssignment] = useState(null); 
  const { state, dispatch } = useContext(TeacherContext);


  const toggleAssignment = (assignmentId) => {
    setExpandedAssignments(prevState => ({
      ...prevState,
      [assignmentId]: !prevState[assignmentId]
    }));
  };

  const openGradingModal = (e) => {
    setIsGradingModalOpen(true);
    console.log(e.target.parentElement.parentElement.parentElement.getAttribute("assignmentid"))
    setCurrentAssignment(e.target.parentElement.parentElement.parentElement.getAttribute("assignmentid"))
  };
  const openFeedbackModal = (e) => {
    setIsFeedbackModalOpen(true);
    setCurrentAssignment(e.target.parentElement.parentElement.parentElement.getAttribute("assignmentid"))
  };
  
  const closeGradingModal = () => {
    setIsGradingModalOpen(false);
  };
  const closeFeedbackModal = () => {
    setIsFeedbackModalOpen(false);
  };
  const handleGradeChange = (newGrade,studentName) => {
   
    setGradingModalStates(prevState => ({
      ...prevState,
      grade:newGrade,
      studentName
    }));
  };

  const handleFeedbackChange = (newFeedback ,studentName) => {
    setFeedbackModalStates(prevState => ({
      ...prevState,
      feedback:newFeedback,
      studentName
    }));
  };
  const gradeAssignment = (e) => {
    console.log(e.target)
    console.log(currentAssignment)
    dispatch({
      type: 'GRADE_ASSIGNMENT',
      payload: {
        assignmentId:currentAssignment,
        grade:gradingModalStates,
        courseId:course.id
      },
    });
    closeGradingModal()
  };
  const addFeedback = (e) => {
    console.log(e.target)
    console.log(currentAssignment)
    dispatch({
      type: 'ADD_FEEDBACK',
      payload: {
        assignmentId:currentAssignment,
        feedback:feedbackModalStates,
        courseId:course.id
      },
    });
    closeFeedbackModal()
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
              <div  assignmentId={`${assignment.assignment_id}`}  key={assignment.assignment_id}>
                <ExpandableTree
                  title={assignment.assignment_name}
                  expanded={expandedAssignments[assignment.assignment_id] || false}
                  onClick={() => toggleAssignment(assignment.assignment_id)}
                  hw
                  openGradingModal={openGradingModal}
                  openFeedbackModal={openFeedbackModal}
                >
               
                  {
                    <div className="expandable-content">
                        <div>
                          <li>doc:{assignment.assignment_doc}</li>
                          <li>Submitted At: {assignment.submitted_at}</li>
                          <li>Grade: {assignment.grade}</li>
                          <li>Feedback: {assignment.feedback}</li>
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
            { (
              <>
                <p style={{ color: "black" }}>{assignment.assignment_name}</p>
                <input
                  className="modal-inputs"
                  type="number"
                  onChange={(e) => handleGradeChange(e.target.value , student.name)}
                  value={gradingModalStates.grade|| ""}
                  style={{ color: "black" }}
                />
                <button onClick={gradeAssignment}>Grade</button>
              </>
            )}
          </Modal>
          <Modal
            isOpen={isFeedbackModalOpen}
            onRequestClose={closeFeedbackModal}
            contentLabel="Add Feedback"
            className="modal"
            overlayClassName="overlay"
          >
            {(
              <>
                <p style={{ color: "black" }}>{assignment.assignment_name}</p>
                <input
                  className="modal-inputs"
                  onChange={(e) => handleFeedbackChange(e.target.value ,  student.name)}
                  value={feedbackModalStates.feedback|| ""}
                  style={{ color: "black" }}
                />
                <button onClick={addFeedback}>Add Feedback</button>

              </>
            )}
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
