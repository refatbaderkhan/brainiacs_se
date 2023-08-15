import React, { useContext, useState } from "react";
import TeacherContext from '../../context/TeacherContext';
import AnnouncementsSection from './AnnouncementsSection';
import CourseCard from './CourseCard';
import Modal from 'react-modal';
import TeacherContextInitializer from "./TeacherContextInitializer";
import "../../styles/teacherLandingPage.css";
import ChatoModal from "./ChatoModal";
const TeacherLandingPage = () => {
  const { state, dispatch } = useContext(TeacherContext);
 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isDMsModalOpen, setIsDMsModalOpen] = useState(false); 
  const [newCourseData, setNewCourseData] = useState({
    name: '',
    title: '',
    enrollementLimit: 0,
  }); 

  const openModal = () => {
    setIsModalOpen(true);
  };
  const openDMsModal = () => {
    setIsDMsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const closeDMsModal = () => {
    setIsDMsModalOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCourseData({
      ...newCourseData,
      [name]: value,
    });
  };
  
  const createNewCourse = () => {
    const newCourse = {
      title: newCourseData.name,
      description: newCourseData.description,
      enrollement_limit:  newCourseData.enrollementLimit, 
    };
    
    dispatch({
      type: 'CREATE_COURSE',
      payload: newCourse,
    });
    
    closeModal();
  };

  return (
    <div>
      <TeacherContextInitializer/>
      <div className="greeting">
        <div className="teacher-image"></div>
        <h1>{`Hello ${localStorage.getItem("teacher_name")} !`}</h1>
      </div>
      <AnnouncementsSection state={state} />
      <div className="courses-header">
        <button className="btn-primary DMs" onClick={openDMsModal}>
          DMs
        </button>
        <button className="btn-primary create-class" onClick={openModal}>
          + Create Course
        </button>
      </div>
      <div className="courses-container">
        {state.courses.map((course, index) => (
          <CourseCard
            key={course.id}
            course={course}
            reportCards={state.courses[index].reportCards}
            announcements={state.announcements}
          />
        ))}
      </div>

  <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Create Course Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <h2>Create New Course</h2>
      <label>
        Course Name:
        <input
        className="modal-inputs"
          type="text"
          name="name"
          value={newCourseData.name}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Course Title:
        <input
        className="modal-inputs"
          type="text"
          name="title"
          value={newCourseData.title}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Enrollement Limit:
        <input
          type="number"
          className="modal-inputs"
          name="enrollementLimit"
          value={newCourseData.enrollementLimit}
          onChange={handleInputChange}
        />
      </label>
      <button onClick={createNewCourse}>Create Course</button>
    </Modal>
    <ChatoModal isDMsModalOpen={isDMsModalOpen} closeDMsModal={closeDMsModal} />
        
     
    </div>
  );
};

export default TeacherLandingPage;
