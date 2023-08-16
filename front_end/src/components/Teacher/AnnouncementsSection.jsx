import React from "react";
import "../../styles/AnnouncementsSection.css"; 
import Carousel from "./test";
import { useState, useEffect , useContext } from 'react';
import TeacherContext from '../../context/TeacherContext';

const AnnouncementsSection = ({ state }) => {
  const uniqueStudentIds = new Set();
  const [selectedCourseId, setSelectedCourseId] = useState(""); 
  const [announcementContent, setAnnouncementContent] = useState("");
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const allStudents = [];
  console.log(state);
  const { dispatch } = useContext(TeacherContext);

  // for (const course of state.courses) {
  //   for (const student of course.students) {
  //     if (!uniqueStudentIds.has(student.id)) {
  //       uniqueStudentIds.add(student.id);
  //       allStudents.push(student);
  //     }
  //   }
  // }
    const handlePostAnnoucement =async () => {
      console.log(announcementContent , selectedCourseId)
      const newAnnouncement = {
        course_id: +selectedCourseId,
        title:announcementTitle,
        announcement: announcementContent
    }
    const response =await fetch("http://127.0.0.1:8000/api/teacher/create_annoucement",{
      method:"POST",
      headers:{
        "Authorization":`Bearer ${localStorage.getItem('token')}`,
       'Accept':"application/json",
       'Content-Type':"application/json"
      },
      body:JSON.stringify(newAnnouncement)
    })
    const data = await response.json()
    console.log(data)
      dispatch({
        type: "ADD_SINGLE_ANNOUNCEMENT",
        payload: newAnnouncement,
      });
      setAnnouncementContent('')
      setSelectedCourseId('')
      setAnnouncementTitle('')
    }
  return (
    <div className="announcements-section">
      <div className="announcements-header">
        <h2>Announcements</h2>
      </div>
      <div className="announcement-form">
        <h3>Create Announcement</h3>
        <select
  className="course-dropdown"
  value={selectedCourseId}
  onChange={(e) => setSelectedCourseId(e.target.value)}
>
  <option value="">Select a Course</option>
  {state.courses.map((course) => (
    <option
      key={course.id}
      value={course.id}
      style={{
        background: "linear-gradient(to bottom, #4c6bf5, #1e3eab)",
        color: "white",
        padding: "10px",
      }}
    >
      {course.title}
    </option>
  ))}
</select>
<input
  className="announcement-input"
  placeholder="Type your announcement's title here"
  value={announcementTitle}
  onChange={(e) => setAnnouncementTitle(e.target.value)}
></input>
<textarea
  className="announcement-textarea"
  placeholder="Type your announcement here"
  value={announcementContent}
  onChange={(e) => setAnnouncementContent(e.target.value)}
></textarea>

        <button onClick={handlePostAnnoucement} className="post-button">Post Announcement</button>
      </div>
     
      {/* <Carousel students={allStudents} />
      <div className="search-bar">
        <input type="text" placeholder="Search for courses" />
        <button className="search-button">Search</button>
      </div> */}
    </div>
  );
};

export default AnnouncementsSection;
