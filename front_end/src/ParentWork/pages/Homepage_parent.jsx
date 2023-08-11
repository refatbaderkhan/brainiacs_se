import React, { useState } from "react";
import "./Homepage_parent.css";
import image from "../../components/assets/family.jpg";
import { useNavigate } from "react-router-dom";

function Homepage_parent() {
  const [showModal, setShowModal] = useState(false);
  const [selectedChild, setSelectedChild] = useState(null);
  const navigate = useNavigate();

  // Placeholder child data
  const placeholderChild1 = {
    id: 1,
    name: "Child 1",
    progress: 80,
    grades: [
      { course: "Math", grade: 95 },
      { course: "English", grade: 85 },
      // ... Other grades
    ],
    assignments: [
      { title: "Assignment 1", dueDate: "2023-08-15", status: "Completed" },
      { title: "Assignment 2", dueDate: "2023-08-30", status: "Pending" },
      // ... Other assignments
    ],
    // ... Other child information
  };

  const placeholderChild2 = {
    id: 2,
    name: "Child 2",
    progress: 75,
    grades: [
      { course: "Science", grade: 90 },
      { course: "History", grade: 80 },
      // ... Other grades
    ],
    assignments: [
      { title: "Assignment 1", dueDate: "2023-08-20", status: "Completed" },
      { title: "Assignment 2", dueDate: "2023-09-05", status: "Pending" },
      // ... Other assignments
    ],
    // ... Other child information
  };

  const handleCardClick = () => {
    setShowModal(true);
  };

  //   const handleChildSelect = (child) => {
  //     setSelectedChild(child);
  //     setShowModal(false);
  //     navigate(`/child/${child.id}`, { state: child });
  //   };

  const handleCancel = () => {
    setShowModal(false);
  };
  const children = [placeholderChild1, placeholderChild2];
  return (
    <div className="parent-container">
      <div className="greeting_parent">
        <div className="parent-image"></div>
        <h1>{`Hello Parent !`}</h1>
      </div>
      <div className="choose-section">
        <h2>What DO You Want To Do ?</h2>

        <div className="card-selection">
          <div className="card-select" onClick={handleCardClick}>
            <p>
              Progress <br />
              Monitoring
            </p>
          </div>
          <div className="card-select" onClick={handleCardClick}>
            <p>Communication with Teachers</p>
          </div>
          <div className="card-select" onClick={handleCardClick}>
            <p>Attendance and Schedule</p>
          </div>
          <div className="card-select" onClick={handleCardClick}>
            <p>Notifications and Reminders</p>
          </div>
        </div>
        <div className="imagePlusParagraph">
          <div className="image-container">
            <img src={image} alt="Family img" />
          </div>

          <div className="quote">
            <p>
              "Little learners grow up and become just what the world needs.{" "}
              <br /> A world full of little learners today means a universe
              packed with brilliant minds tomorrow."
            </p>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="selectChildModal">
          <h3>Select a Child:</h3>
          <ul>
            {children.map((child) => (
              <li
                key={child.id}
                onClick={() => {
                  setSelectedChild(child);
                  setShowModal(false);
                  navigate("/child", { state: child });
                }}
              >
                {child.name}
              </li>
            ))}
          </ul>
          <button className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default Homepage_parent;
