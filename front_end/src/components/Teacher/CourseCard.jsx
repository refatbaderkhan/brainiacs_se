import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExpandableTree from "./ExpandableTree";
import StudentAssignments from "./StudentAssignments";
import StudentReports from "./StudentReports";
import SingleAssignment from "./SingleAssignment";
import SingleQuizz from "./SingleQuiz";
import Modal from "react-modal";
import TeacherContext from "../../context/TeacherContext";

const CourseCard = ({ course, reportCards, announcements }) => {
  console.log(reportCards)
  const navigate = useNavigate()
  const { state, dispatch } = useContext(TeacherContext);
  const [allAssignmentsExpanded, setAllassignmentsExpanded] = useState(false);
  const [allQuizzesExpanded, setAllQuizzesExpanded] = useState(false);
  const [assignmentsExpanded, setAssignmentsExpanded] = useState(false);
  const [reportsExpanded, setReportsExpanded] = useState(false);
  const [announcementsExpanded, setAnnouncementsExpanded] = useState(false);
  const [announcementExpandedStates, setAnnouncementExpandedStates] = useState([]);

  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [isQuizzModalOpen, setIsQuizzModalOpen] = useState(false);
  const [newAssignmentData, setNewAssignmentData] = useState({
    title: "",
    due: "",
    grade: 0,
    description: "",
    document: "",
  });
  const [newQuizzData, setNewQuizzData] = useState({
    quizz_doc:"",
    quizz_grade:0,
    quizz_title:"",
    quizz_description:""
  });
  // console.log(course.attendance_sheet[0]?.student_name)
  console.log(course);  
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
  const handleQuizzInputChange = (event) => {
    const { name, value } = event.target;
    setNewQuizzData({
      ...newQuizzData,
      [name]: value,
    });
  };
  const addAssignment = async () => {
    const newAssignment = {
      assignment_title: newAssignmentData.title,
      assignment_due: newAssignmentData.due,
      assignment_grade: newAssignmentData.grade,
      assignment_desc: newAssignmentData.description,
      assignment_doc: " newAssignmentData.document",
      assignment_id: course.course_assignments.length + 1,
    };
    const body = JSON.stringify({
       course_id: course.id,
       title: newAssignmentData.title ,
       description: newAssignmentData.description ,
       content_url:"NewContent.png",
       due_date:`${newAssignmentData.due} 00:00:00`
  
})

    const response = await fetch("http://127.0.0.1:8000/api/teacher/create_assignment" , {
      method:"POST",
      headers:{
        "Authorization":`Bearer ${localStorage.getItem('token')}`,
        'Accept':"application/json",
        'Content-Type':"application/json"
      },
      body
    })
    const data = await response.json()
    console.log(data)
    console.log(222222222)
    dispatch({
      type: "ADD_ASSIGNMENT",
      payload: { courseId: course.id, assignment: newAssignment },
    });
    closeAssignmentModal();
  };
  const addQuizz =async () => {
    const newQuizz = {
      quizz_title: newQuizzData.quizz_title,
     quizz_grade: newQuizzData.quizz_grade,
      quizz_desc: newQuizzData.quizz_description,
     quizz_doc: " newAssignmentData.document",
      quizz_id: course.course_quizzes?.length + 1,
    };
    console.log(newQuizz)
    console.log(newQuizzData)
    const body = JSON.stringify({
      course_id: course.id,
      title:newQuizzData.quizz_title ,
      description:newQuizzData.quizz_description ,
      content_url:"NewContent.png", 
  })

   const response = await fetch("http://127.0.0.1:8000/api/teacher/create_quiz" , {
     method:"POST",
     headers:{
       "Authorization":`Bearer ${localStorage.getItem('token')}`,
       'Accept':"application/json",
       'Content-Type':"application/json"
     },
     body
   })
   const data = await response.json()
   console.log(data)
    dispatch({
      type: "ADD_QUIZZ",
      payload: { courseId: course.id, quizz: newQuizz },
    });
    closeQuizzModal(); 
  };
  const openAttendanceModal = () => {
    setIsAttendanceModalOpen(true);
  };
  const openQuizzModal = () => {
    setIsQuizzModalOpen(true);
  };

  const closeAttendanceModal = () => {
    setIsAttendanceModalOpen(false);
  };
  const closeQuizzModal = () => {
    setIsQuizzModalOpen(false);
  };
  const toggleAnnouncementExpansion = (index) => {
    const newExpandedStates = [...announcementExpandedStates];
    newExpandedStates[index] = !newExpandedStates[index];
    setAnnouncementExpandedStates(newExpandedStates);
  };
  const goToRoom = (courseId , courseTitle , teacherId)=>{
    console.log(teacherId)
    localStorage.setItem("course_title" , courseTitle)
    localStorage.setItem("course_id" , courseId)
    navigate(`/ClassRoomChatRoom/${courseId}/${teacherId}` ,)
  }
  
  return (
    <div className="course-card">
      <div className="course-card-title">
        <h3>{course.title}</h3>
        {console.log(course)}
        <button onClick={()=>goToRoom(course.id , course.title ,  course.teacher_id)} className="btn-primary open-class">Open class</button>
        <button
          className="btn-primary add-assignment"
          onClick={openAssignmentModal}
        >
          Add assignment
        </button>
        <button
          className="btn-primary check-attendance"
          onClick={openAttendanceModal}
        >
          Check attendance sheet
        </button>

        <button onClick={openQuizzModal} className="btn-primary add-Quizz">Add Quizz</button>
      </div>
      <ExpandableTree
        title="All Assignments"
        expanded={allAssignmentsExpanded}
        onClick={() => setAllassignmentsExpanded(!allAssignmentsExpanded)}
      >

        {course.course_assignments && course.course_assignments?.map((assignment,index) => {
  
          return(
          
          <div assignmentId={`${assignment.assignment_id}`} >
           
          <SingleAssignment key={course.id} assignment={assignment} />

          </div>
        )})}
      </ExpandableTree>
      <ExpandableTree
        title="Quizzes"
        expanded={allQuizzesExpanded}
        onClick={() => setAllQuizzesExpanded(!allQuizzesExpanded)}
      >
        {course.course_quizzes?.map((quizz) => (
          <SingleQuizz key={quizz.quizz_id} quizz={quizz} />
        ))}
      </ExpandableTree>
      <ExpandableTree
        title="Students Assignments"
        expanded={assignmentsExpanded}
        onClick={() => setAssignmentsExpanded(!assignmentsExpanded)}
      >
        {course.students?.map((student) => (
          <StudentAssignments key={student.id} student={student} course={course}/>
        ))}
      </ExpandableTree>
      <ExpandableTree
        title="Checking Student Reports"
        expanded={reportsExpanded}
        onClick={() => setReportsExpanded(!reportsExpanded)}
      >
        {reportCards?.map((student, index) => {
          console.log(reportCards[index])
          return (
            <StudentReports
              key={student.id}
              student={student}
              reportCard={reportCards[index]}
            />
          );
        })}
      </ExpandableTree>
      <ExpandableTree
        title="Class Announcements"
        expanded={announcementsExpanded}
        onClick={() => setAnnouncementsExpanded(!announcementsExpanded)}
      >
       {announcements?.length !== 0 &&
  announcements?.map((announcement, index) =>
    announcement.course_id === course.id && (
      <ExpandableTree
        key={index}
        title={announcement.title}
        expanded={announcementExpandedStates[index] || false} // Read expansion state from the array
        onClick={() => toggleAnnouncementExpansion(index)} // Pass the index to the toggle function
      >
        <p>{announcement.announcement}</p>
      </ExpandableTree>
    )
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
        {console.log(course.attendance_sheet)}
        {course.attendance_sheet && course.attendance_sheet.length > 0 && (
          <table>
            <thead>
              <tr style={{ color: "black" }}>
                <th>Student Name</th>
                <th>Attended Times</th>
              </tr>
            </thead>
            <tbody style={{ color: "black" }}>
              {course.attendance_sheet.map((student) => {
                console.log(student)
                return(
                <tr style={{ textAlign: "center" }} key={student.student_name}>
                  <td style={{ color: "black" }}>{student.student_name}</td>
                  <td style={{ color: "black" }}>{student. attendance_times}</td>
                </tr>
              )})}
            </tbody>
          </table>
        )}
      </Modal>
      <Modal
        isOpen={isQuizzModalOpen}
        onRequestClose={closeQuizzModal}
        contentLabel="Create Quizz"
        className="modal"
        overlayClassName="overlay"
      >
         <h2>Add New Assignment</h2>
        <label>
          <input
            type="text"
            name="quizz_title"
            value={newQuizzData.quizz_title}
            onChange={handleQuizzInputChange}
            className="modal-inputs"
            placeholder="Quizz Title"
          />
        </label>
        <label>
          Grade:
          <input
            type="number"
            name="quizz_grade"
            value={newQuizzData.quizz_grade}
            onChange={handleQuizzInputChange}
            className="modal-inputs"
            placeholder="Quizz Grade"
          />
        </label>
        <label>
          Description:
          <textarea
          type="text"
            name="quizz_description"
            value={newQuizzData.quizz_description}
            onChange={handleQuizzInputChange}
            className="modal-inputs"
            placeholder="Quizz Description"
          />
        </label>
        <label>
          Document:
          <input
            type="file"
            className="modal-inputs"
            value={newQuizzData.quizz_doc}
            onChange={handleQuizzInputChange}
            name="quizz_doc"
          />
        </label>
        <button onClick={addQuizz}>Add Quizz</button>
      </Modal>
    </div>
  );
};

export default CourseCard;
