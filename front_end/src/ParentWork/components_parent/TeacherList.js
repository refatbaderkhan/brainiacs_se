import React from "react";

function TeacherList({ teachers, onSelectTeacher }) {
  
  return (
    <div className="teacher-list">
      <h3>Teachers</h3>
      <ul>
        {teachers.map((teacher) => (
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
