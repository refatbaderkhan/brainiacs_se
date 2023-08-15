import React, { useState, useEffect } from "react";
import './style.css'
import ModifyUser from '../ModifyUser'
import DeleteUser from '../DeleteUser'
import ModifyCourse from '../ModifyCourse'
import DeleteCourse from '../DeleteCourse'


const CourseEntry = ({id, title, enrollment_limit }) => {

  const [isModifyCourseVisible, setIsModifyCourseVisible] = useState(false);

  const handleModifyClick = () => {
    setIsModifyCourseVisible(true);
  };

  const handleCancelModifyClick = () => {
    setIsModifyCourseVisible(false);
  };

  const [isDeleteCourseVisible, setIsDeleteCourseVisible] = useState(false);

  const handleDeleteClick = () => {
    setIsDeleteCourseVisible(true);
  };

  const handleCancelClick = () => {
    setIsDeleteCourseVisible(false);
  };

  return (
    <div>
    <div className='entry-container'>
      <h2>{title}</h2>
      <h2>{enrollment_limit}</h2>
      <button className='card-select' onClick={handleModifyClick} >manage</button>
      <button className='card-select' onClick={handleDeleteClick} >delete</button>
    </div>
    <div>
    {isModifyCourseVisible && (
        <ModifyCourse
          title={title}
          enrollment_limit={enrollment_limit}
          onCancel={handleCancelModifyClick} // Pass the cancel handler to ModifyUser
        />
      )}
    </div>
    {isDeleteCourseVisible && (
        <DeleteCourse
          id={id}
          onCancel={handleCancelClick} // Pass the cancel handler to ModifyUser
        />
      )}
    </div>
  )
}

export default CourseEntry