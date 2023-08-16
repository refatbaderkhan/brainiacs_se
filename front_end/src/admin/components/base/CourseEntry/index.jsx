import React, { useState, useEffect } from "react";
import "./style.css";
import ModifyCourse from "../ModifyCourse";
import DeleteCourse from "../DeleteCourse";

const CourseEntry = ({
  id,
  title,
  description,
  enrollment_limit,
  teacher_id,
  onCourseDeleted,
  onModify,
}) => {
  const [isModifyCourseVisible, setisModifyCourseVisible] = useState(false);

  const handleModifyClick = () => {
    setisModifyCourseVisible(true);
  };

  const handleCancelModifyClick = () => {
    setisModifyCourseVisible(false);
  };

  const [isDeleteCourseVisible, setisDeleteCourseVisible] = useState(false);

  const handleDeleteClick = () => {
    setisDeleteCourseVisible(true);
  };

  const handleCancelDeleteClick = () => {
    setisDeleteCourseVisible(false);
  };

  const handleCourseDeleted = () => {
    setisDeleteCourseVisible(false);
    onCourseDeleted(id);
  };

  const handleCourseModified = (ModifyCourse) => {
    setisModifyCourseVisible(false);
    onModify(ModifyCourse);
  };

  return (
    <div>
      <div className="entry-container">
        <h3>
          Title:
          <br></br>
          {title}
        </h3>
        <h3>
          Description:
          <br></br>
          {description}
        </h3>
        <br></br>
        <h3>
          Enrollment Limit:
          <br></br>
          {enrollment_limit}
        </h3>
        <h3>
          Teacher:
          <br></br>
          {teacher_id}
        </h3>
        <div className="button-container">
          <button className="card-select" onClick={handleModifyClick}>
            manage
          </button>
          <button className="card-select" onClick={handleDeleteClick}>
            delete
          </button>
        </div>
      </div>
      <div>
        {isModifyCourseVisible && (
          <ModifyCourse
            id={id}
            title={title}
            description={description}
            enrollment_limit={enrollment_limit}
            teacher_id={teacher_id}
            onCancel={handleCancelModifyClick}
            onModify={handleCourseModified}
          />
        )}
      </div>
      {isDeleteCourseVisible && (
        <DeleteCourse
          id={id}
          onCancel={handleCancelDeleteClick}
          onCourseDeleted={handleCourseDeleted}
        />
      )}
    </div>
  );
};

export default CourseEntry;
