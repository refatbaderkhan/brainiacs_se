import React from "react";
import "../../styles/AnnouncementsSection.css"; 
import Carousel from "./test";

const AnnouncementsSection = ({ state }) => {
  const uniqueStudentIds = new Set();

  const allStudents = [];

  for (const course of state.courses) {
    for (const student of course.students) {
      if (!uniqueStudentIds.has(student.id)) {
        uniqueStudentIds.add(student.id);
        allStudents.push(student);
      }
    }
  }

  return (
    <div className="announcements-section">
      <div className="announcements-header">
        <h2>Announcements</h2>
      </div>
      <div className="announcement-form">
        <h3>Create Announcement</h3>
        <input type="text" placeholder="Course Name" />
        <textarea placeholder="Type your announcement here"></textarea>
        <button className="post-button">Post Announcement</button>
      </div>
      <br />
      <br />
      <Carousel students={allStudents}/>
      <div className="search-bar">
          <input type="text" placeholder="Search for courses" />
          <button className="search-button">Search</button>
      </div>
    </div>
  );
};

export default AnnouncementsSection;
