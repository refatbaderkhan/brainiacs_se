import React, { useState, useEffect } from "react";
import axios from "axios";

function Attendence({ childId }) {
  const [attendanceInfo, setAttendanceInfo] = useState([]);
  useEffect(() => {

    if (!childId) {

      return;
    }
    const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2d1ZXN0L2xvZ2luIiwiaWF0IjoxNjkxOTU1MDIwLCJleHAiOjE2OTE5NTg2MjAsIm5iZiI6MTY5MTk1NTAyMCwianRpIjoickpsd0NqcG1penk5VnVzdSIsInN1YiI6IjciLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.yrWIQ9vb3ZXpQMrLLzcPanWRstGALHPCiTHxYYzDR2k"; 

     axios
      .get(`http://127.0.0.1:8000/api/parent/student-attendance/${childId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const data = response.data.data;
        const formattedAttendance = [];

        for (const studentId in data) {
          const studentData = data[studentId];
          const attendance = studentData.attendance;
          const courseName = studentData.course;
          const date = studentData.date;

          formattedAttendance.push({
            studentId: studentId,
            courseName: courseName,
            attendance: attendance,
            date: date,
          });
        }

        setAttendanceInfo(formattedAttendance);
      })
      .catch((error) => {
        console.error("Error fetching attendance data:", error);
      });
  }, [childId]);

  return (
    <div className="attendance-container">
      <h3>Attendance</h3>
      <ul>
        {attendanceInfo.map((attendance) => (
          <li key={attendance.studentId}>
            <strong>Name:</strong> {attendance.courseName},{" "}
            <strong>Attendance:</strong> {attendance.attendance},{" "}
            <strong>Date:</strong> {attendance.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Attendence;
