import React, { useState, useEffect } from "react";
import TeacherReportEntry from "../../base/TeacherReportEntry";
import StudnetReportEnty from "../../base/StudentReportEntry";

const Reports = ({studentsReportsList,teachersReportsList,userslist,courseslist}) => {
  const [sectionToShow, setSectionToShow] = useState("");
  const [studentsReports, setStudentsReports] = useState(studentsReportsList)
  const [teachersReports, setTeachersReports] = useState(teachersReportsList)
  const [users, setUsers] = useState(userslist)
  const [courses, setCourses] = useState(courseslist)
  

  const handleSectionClick = (section) => {

    setSectionToShow(section);
  };

  return (
    <div className="margin users-container ">
      <div className="card-selection">
        <div className="card-select" onClick={() => handleSectionClick("teachers")}>
          <p>
          Teachers Reports
          </p>
        </div>
        <div className="card-select" onClick={() => handleSectionClick("students")}>
          <p>
          Studnets Reports
          </p>
        </div>
    </div>
    {sectionToShow === "teachers" && (
      <div className="user-management auto-margin">
        {teachersReports.map((teachersReport) => {
          const user = users.find(user => user.id === teachersReport.user_id);
          const course = courses.find(course => course.id === teachersReport.course_id);
          return (
            <div key={teachersReport.id}>
              <TeacherReportEntry
                id={teachersReport.id}
                user_id={teachersReport.user_id}
                user_name={user.name}
                course_name={course.title}
                student_count={teachersReport.student_count}
                completion_rate={teachersReport.completion_rate}
              />
            </div>
          );
        })}
      </div>
    )}
    {sectionToShow === "students" && (
      <div className="user-management auto-margin">
        {studentsReports.map((studentReport) => {
          const user = users.find(user => user.id === studentReport.user_id);
          return (
            <div key={studentReport.id}>
              <StudnetReportEnty
                id={studentReport.id}
                user_id={studentReport.user_id}
                user_name={user.name}
                average_grade={studentReport.average_grade}
                enrolled_courses={studentReport.enrolled_courses}
                completed_courses={studentReport.completed_courses}
              />
            </div>
          );
        })}
      </div>
    )}
    </div> 
  )}

export default Reports