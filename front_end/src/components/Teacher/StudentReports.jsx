import React, { useState } from "react";
import ExpandableTree from './ExpandableTree';
import '../../styles/studentReports.css'
const StudentReports = ({ student ,reportCard}) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="student-reports">
      <ExpandableTree
        title={reportCard.student_name}
        expanded={expanded}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded && (
          <div className="expandable-content">
            <li>Average Grade: {reportCard.studentPerformance.average_grade}</li>
            <li>Completed Courses: {reportCard.studentPerformance.completedCourses}</li>
            <li>Enrolled Courses: {reportCard.studentPerformance.enrolledCourses}</li>
          </div>
        )}
      </ExpandableTree>
    </div>
  );
};

export default StudentReports;
