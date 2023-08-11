// import React, { useState } from "react";
// import '../../styles/assignment.css';
// import Modal from 'react-modal';
// const AssignmentExpandable = ({ assignment }) => {

//   const [expanded, setExpanded] = useState(false);
//   const [isGradingModalOpen, setIsGradingModalOpen] = useState(false);

//   const openGradingModal = () => {
//     setIsGradingModalOpen(true);
//   };
  
//   const closeGradingModal = () => {
//     setIsGradingModalOpen(false);
//   };

//   return (
//     <div className="assignment-expandable">
//       <div
//         className={`assignment-header ${expanded ? "expanded" : ""}`}
//         onClick={() => setExpanded(!expanded)}
//       >
//         {assignment.assignment_name}
//       </div>
//       {expanded && (
//         <div className="assignment-details">
//           <p>Submitted at: {assignment.submitted_at}</p>
//           <p>Grade: {assignment.grade}</p>
//         </div>
//       )}
//             <Modal
//   isOpen={isGradingModalOpen}
//   onRequestClose={closeGradingModal}
//   contentLabel="Grade Assignments"
//   className="modal"
//   overlayClassName="overlay"
// >
// {assignment}
// </Modal>
//     </div>
//   );
// };

// export default AssignmentExpandable;
