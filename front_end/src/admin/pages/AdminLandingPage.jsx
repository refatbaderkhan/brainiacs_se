import React, { useState, useEffect } from "react";
import "../styles/admin.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserManagement from "../components/UI/UserManagement";
import CourseManagement from "../components/UI/CourseManagement";

const AdminLandingPage = () => {
  const [test, setTest] = useState(null);
  const [sectionToShow, setSectionToShow] = useState("");

  const token = localStorage.getItem('token')
  const headers = { Authorization: `Bearer ${token}`,};

  const fetchResponse = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/trust_issues", {
        headers });
      console.log(response.data.message);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  useEffect(()=>{
    fetchResponse();
  },[])

  const handleSectionClick = (section) => {
    setSectionToShow(section); // Set the selected section
  };



  return (
    <div className="admin-container">
      <div className="greeting_parent">
        <div className="parent-image"></div>
        <h1>{`Hello Parent !`}</h1>
    </div>
      <h1>ya allah {test}</h1>
      <div className="card-selection">
          <div className="card-select" onClick={() => handleSectionClick("users")}>
            <p>
              Users Management
            </p>
          </div>
          <div className="card-select" onClick={() => handleSectionClick("courses")}>
            <p>
              Courses Management
            </p>
          </div>
          <div className="card-select" onClick={handleSectionClick}>
            <p>
              Reporting and Analytics
            </p>
          </div>
          <div className="card-select" onClick={handleSectionClick}>
            <p>
              System Configuration
            </p>
          </div>
          <div className="card-select" onClick={handleSectionClick}>
            <p>
              Support and Maintenance
            </p>
          </div>
      </div>
      {sectionToShow === "users" && (
        <div className="card-selection auto-margin">
          <UserManagement />
        </div>
      )}
      {sectionToShow === "courses" && (
        <div className="card-selection auto-margin">
          <CourseManagement />
        </div>
      )}
    </div>


  )
}

export default AdminLandingPage