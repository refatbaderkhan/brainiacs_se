import React from "react";

function TeacherList({ teachers, onSelectTeacher }) {
  // Create a set to store unique teacher IDs
  const uniqueTeacherIds = new Set();

  // Filter teachers to get unique teachers based on IDs
  const uniqueTeachers = teachers.filter((teacher) => {
    if (!uniqueTeacherIds.has(teacher.id)) {
      uniqueTeacherIds.add(teacher.id);
      return true;
    }
    return false;
  });

  return (
    <div className="teacher-list">
      <h3>Teachers</h3>
      <ul>
        {uniqueTeachers.map((teacher) => (
          <li
            key={teacher.id}
            onClick={() => onSelectTeacher(teacher)}
            className="teacher-item"
          >
            {teacher.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeacherList;
