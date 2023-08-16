import React, { useState, useEffect } from "react";
import "../styles/admin.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserManagement from "../components/UI/UserManagement";
import CourseManagement from "../components/UI/CourseManagement";
import Reports from "../components/UI/Reports";

const AdminLandingPage = () => {
  const [sectionToShow, setSectionToShow] = useState("");
  const [userslist, setUsers] = useState([]);
  const [courseslist, setCourses] = useState([]);
  const [studentsReportsList, setStudentsReports] = useState([]);
  const [teachersReportsList, setTeachersReports] = useState([]);
  const navigate = useNavigate();
  const teachers = userslist.filter((item) => item.role === "teacher");

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/users/get", {
        headers,
      });
      const usersdata = response.data.users;
      setUsers(usersdata);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/courses/get",
        {
          headers,
        }
      );
      const coursesdata = response.data.courses;
      setCourses(coursesdata);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchStudentsReports = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/reports/student-progress/",
        {
          headers,
        }
      );
      const reportData = response.data.performance;
      setStudentsReports(reportData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchTeachersReports = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/reports/teacher-performance/",
        {
          headers,
        }
      );
      const reportData = response.data.performance;
      setTeachersReports(reportData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchCourses();
    fetchStudentsReports();
    fetchTeachersReports();
  }, []);

  const handleSectionClick = (section) => {
    setSectionToShow(section);
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="admin-container">
      <div className="greeting_parent">
        <h1>Adminstration Panel</h1>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>

      <div className="card-selection">
        <div
          className="card-select"
          onClick={() => handleSectionClick("users")}
        >
          <p>Users Management</p>
        </div>
        <div
          className="card-select"
          onClick={() => handleSectionClick("courses")}
        >
          <p>Courses</p>
        </div>
        <div
          className="card-select"
          onClick={() => handleSectionClick("reports")}
        >
          <p>Reports & Statistics</p>
        </div>
      </div>
      {sectionToShow === "users" && (
        <div className="user-management auto-margin">
          <UserManagement userslist={userslist} />
        </div>
      )}
      {sectionToShow === "courses" && (
        <div className="user-management auto-margin">
          <CourseManagement courseslist={courseslist} userslist={userslist} />
        </div>
      )}
      {sectionToShow === "reports" && (
        <div className="user-management auto-margin">
          <Reports
            studentsReportsList={studentsReportsList}
            teachersReportsList={teachersReportsList}
            userslist={userslist}
            courseslist={courseslist}
          />
        </div>
      )}
    </div>
  );
};

export default AdminLandingPage;
