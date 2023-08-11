import React from "react";
import "./Homepage_parent.css";
import image from "../../components/assets/family.jpg";

function Homepage_parent() {
  return (
    <div className="parent-container">
      <div className="greeting_parent">
        <div className="parent-image"></div>
        <h1>{`Hello Parent !`}</h1>
      </div>

      <div className="choose-section">
        <h2>What DO You Want To Do ?</h2>

        <div className="card-selection">
          <div className="card-select">
            <p>
              Progress <br />
              Monitoring
            </p>
          </div>
          <div className="card-select">
            <p>Communication with Teachers</p>
          </div>
          <div className="card-select">
            <p>Attendance and Schedule</p>
          </div>
          <div className="card-select">
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
    </div>
  );
}

export default Homepage_parent;
