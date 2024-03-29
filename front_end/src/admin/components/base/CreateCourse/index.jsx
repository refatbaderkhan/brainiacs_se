import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

const CreateCourse = ({ onCourseCreated, userslist }) => {
  const [data, setData] = useState({
    title: "",
    description: "",
    enrollment_limit: "",
    teacher_id: "",
  });

  const [users, setUsers] = useState(userslist);

  const [response, setResponse] = useState("");

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const handleDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (
      data.title &&
      data.description &&
      data.enrollment_limit &&
      data.teacher_id
    ) {
      try {
        const courses = await axios.post(
          "http://127.0.0.1:8000/api/courses/create",
          data,
          { headers }
        );
        const newCourse = courses.data.course;
        onCourseCreated(newCourse);
        setResponse("Course created successfully.");
        console.log(newCourse);
      } catch (error) {
        console.error("Error fetching data:", error);
        setResponse("An error occurred.");
      }
    } else {
      setResponse("Please fill in all fields before submitting.");
    }
  };

  const teacherOptions = users.filter((user) => user.role === "teacher");

  return (
    <div className="create-container column">
      <h1>Create Course:</h1>
      <input
        name="title"
        placeholder="Enter Course Title"
        defaultValue={data.title}
        value={data.title}
        onChange={handleDataChange}
      />
      <input
        name="description"
        placeholder="Enter Course Description"
        defaultValue={data.description}
        value={data.description}
        onChange={handleDataChange}
      />
      <input
        name="enrollment_limit"
        placeholder="Enter Enrollment_limit"
        defaultValue={data.enrollment_limit}
        value={data.enrollment_limit}
        onChange={handleDataChange}
      />
      <select
        name="teacher_id"
        value={data.teacher_id}
        onChange={handleDataChange}
      >
        <option>Select a Teacher</option>
        {teacherOptions.map((teacher) => (
          <option key={teacher.id} value={teacher.id}>
            {teacher.name}
          </option>
        ))}
      </select>
      <p1>{response}</p1>
      <button className="button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default CreateCourse;
