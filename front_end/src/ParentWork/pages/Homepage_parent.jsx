import React, { useState, useEffect } from "react";
import "./Homepage_parent.css";
import image from "../../components/assets/family.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Homepage_parent() {
  const [showModal, setShowModal] = useState(false);
  const [selectedChild, setSelectedChild] = useState(null);
  const navigate = useNavigate();
  const [children, setChildren] = useState([]);

  useEffect(() => {
    // API endpoint for fetching children data
    const apiEndpoint = "http://127.0.0.1:8000/api/parent/children";

    // Retrieve the token from local storage
    const accessToken = localStorage.getItem("token");
    axios
      .get(apiEndpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const childrenData = response.data.data;
        const childrenArray = Object.keys(childrenData).map((id) => ({
          id,
          name: childrenData[id],
        }));

        setChildren(childrenArray);
      })
      .catch((error) => {
        console.error("Error fetching children:", error);
      });
  }, []);

  const handleCardClick = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

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
                  navigate(`/child/${child.id}`, { state: child }); // Passing child info to the route
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
