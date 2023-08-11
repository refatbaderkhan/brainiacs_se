import React, { useContext, useState } from "react";

import ExpandableTree from './ExpandableTree';
import StudentAssignments from './StudentAssignments';
import StudentReports from './StudentReports';
import SingleAssignment from "./SingleAssignment";
import Modal from 'react-modal';
import TeacherContext from '../../context/TeacherContext';


const CourseCard = ({ course , reportCards ,announcements}) => {
  const { state, dispatch } = useContext(TeacherContext);
  const [allAssignmentsExpanded, setAllassignmentsExpanded] = useState(false);
  const [assignmentsExpanded, setAssignmentsExpanded] = useState(false);
  const [reportsExpanded, setReportsExpanded] = useState(false);
  const [announcementsExpanded, setAnnouncementsExpanded] = useState(false);
  const [singleAnnouncementExpanded, setSingleAnnouncementExpanded] = useState(false);
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [newAssignmentData, setNewAssignmentData] = useState({
    title: "",
    due: "",
    grade: 0,
    description: "",
    document: "",
  });
  console.log(course.attendance_sheet[0]?.student_name)
  const openAssignmentModal = () => {
    setIsAssignmentModalOpen(true);
  };
  
  const closeAssignmentModal = () => {
    setIsAssignmentModalOpen(false);
  };
  const handleAssignmentInputChange = (event) => {
    const { name, value } = event.target;
    setNewAssignmentData({
      ...newAssignmentData,
      [name]: value,
    });
  };
  const addAssignment = () => {
    const newAssignment = {
      assignment_title: newAssignmentData.title,
      assignment_due: newAssignmentData.due,
      assignment_grade: newAssignmentData.grade,
      assignment_desc: newAssignmentData.description,
      assignment_doc:' newAssignmentData.document',
      assignment_id:course.course_assignments.length+1
    };
  
    dispatch({
      type: 'ADD_ASSIGNMENT',
      payload: {courseId:course.id ,assignment:newAssignment},
    });
    closeAssignmentModal();
  };
  const openAttendanceModal = () => {
    setIsAttendanceModalOpen(true);
  };
  
  const closeAttendanceModal = () => {
    setIsAttendanceModalOpen(false);
  };
  return (
    <div className="course-card">
      <div className="course-card-title">
        <h3>{course.title}</h3>
        <button className="btn-primary open-class">
          Open class
        </button>
        <button className="btn-primary add-assignment"  onClick={openAssignmentModal}>
          Add assignment
        </button>
        <button className="btn-primary check-attendance"  onClick={openAttendanceModal}>
          Check attendance sheet
        </button>
        
        <button className="btn-primary add-feedback">
          Add feedback
        </button>
      </div>
      <ExpandableTree
        title="All Assignments"
        expanded={allAssignmentsExpanded}
        onClick={() => setAllassignmentsExpanded(!allAssignmentsExpanded)}
      >
        {course.course_assignments.map(assignment => (
          <SingleAssignment key={course.id} assignment={assignment} />
        ))}
      </ExpandableTree>
      <ExpandableTree
        title="Students Assignments"
        expanded={assignmentsExpanded}
        onClick={() => setAssignmentsExpanded(!assignmentsExpanded)}
      >
        {course.students.map(student => (
          <StudentAssignments key={student.id} student={student} />
        ))}
      </ExpandableTree>
      <ExpandableTree
        title="Checking Student Reports"
        expanded={reportsExpanded}
        onClick={() => setReportsExpanded(!reportsExpanded)}
      >
        {course.students.map((student,index) => {
          return (
          <StudentReports key={student.id} student={student} reportCard={reportCards[index]} />
        )})}
      </ExpandableTree>
      <ExpandableTree
        title="Class Announcements"
        expanded={announcementsExpanded}
        onClick={() => setAnnouncementsExpanded(!announcementsExpanded)}
      >
        {announcements.length !== 0 && (
    announcements.map((announcement, index) => (
      announcement.course_id === course.id ?
      <ExpandableTree
        key={index}
        title={announcement.title}
        expanded={singleAnnouncementExpanded}
        onClick={() => setSingleAnnouncementExpanded(!singleAnnouncementExpanded)}
      >
        <p>{announcement.announcement}</p>
      </ExpandableTree>
      : <p>No Annoucements posted for this class</p>
    ))
  )}
      </ExpandableTree>
      <Modal
  isOpen={isAssignmentModalOpen}
  onRequestClose={closeAssignmentModal}
  contentLabel="Add Assignment Modal"
  className="modal"
  overlayClassName="overlay"
>
  <h2>Add New Assignment</h2>
  <label>
    Title:
    <input
      type="text"
      name="title"
      value={newAssignmentData.title}
      onChange={handleAssignmentInputChange}
      className="modal-inputs"
      placeholder="Assignment Title"
    />
  </label>
  <label>
    Due Date:
    <input
      type="date"
      name="due"
      value={newAssignmentData.due}
      onChange={handleAssignmentInputChange}
      className="modal-inputs"
      placeholder="Assignment Due"

    />
  </label>
  <label>
    Grade:
    <input
      type="number"
      name="grade"
      value={newAssignmentData.grade}
      onChange={handleAssignmentInputChange}
      className="modal-inputs"
      placeholder="Assignment Grade"

    />
  </label>
  <label>
    Description:
    <textarea
      name="description"
      value={newAssignmentData.description}
      onChange={handleAssignmentInputChange}
      className="modal-inputs"
      placeholder="Assignment Description"

    />
  </label>
  <label>
    Document:
    <input
      type="file"
      className="modal-inputs"

      name="document"
      value={newAssignmentData.document}
      onChange={handleAssignmentInputChange}
    />
  </label>
  <button onClick={addAssignment}>Add Assignment</button>
</Modal>
      <Modal
  isOpen={isAttendanceModalOpen}
  onRequestClose={closeAttendanceModal}
  contentLabel="Check Class Attendance"
  className="modal"
  overlayClassName="overlay"
>
{course.attendance_sheet && course.attendance_sheet.length > 0 && (
  <table>
    <thead>
      <tr style={{color:"black"}}>
        <th>Student Name</th>
        <th>Attended Times</th>
      </tr>
    </thead>
    <tbody style={{color:"black"}}>
      {course.attendance_sheet.map((student) => (
        <tr style={{textAlign:"center"}} key={student.student_name}>
          <td style={{ color: "black" }}>{student.student_name}</td>
          <td style={{ color: "black" }}>{student.attendend_times}</td>
        </tr>
      ))}
    </tbody>
  </table>
)}
</Modal>
    </div>
  );
};

export default CourseCard;
