import { useState, useContext, useEffect } from "react";
import TeacherContext from "../../context/TeacherContext";

const TeacherContextInitializer = () => {
  const { state, dispatch } = useContext(TeacherContext);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const teacherId = +localStorage.getItem('teacher_id');
        const token = localStorage.getItem('token');
        
        const response = await fetch(`http://127.0.0.1:8000/api/teacher/get_courses/${teacherId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        const data = await response.json();
        setCourses(data.data); 

        
        dispatch({
          type: "ADD_COURSES",
          payload: data.data
        });
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    console.log(courses); 
    courses.forEach((course) => {
      console.log(course)
            const fetchCoursesAssignments = async()=>{
             
              const courseId  = course.id
              const token  = localStorage.getItem('token')
              console.log(token)
              const response = await fetch(`http://127.0.0.1:8000/api/teacher/get_assignments/${courseId}`,{
                method:"GET",
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              })
              const data = await response.json()
              
              console.log(data)
              
            
              dispatch({
                type: "POPULATE_COURSE_ASSIGNMENTS",
                payload: { courseId: course.id, fetched_assignments: data.data },
              });
        
              
              return data.data
            }
          
         fetchCoursesAssignments()
      
    });
  }, [courses]);
  useEffect(() => {
    console.log(courses); 
    courses.forEach((course) => {
      console.log(course)
            const fetchCoursesQuizzes = async()=>{
             
              const courseId  = course.id
              const token  = localStorage.getItem('token')
              console.log(token)
              const response = await fetch(`http://127.0.0.1:8000/api/teacher/get_quizzes/${courseId}`,{
                method:"GET",
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              })
              const data = await response.json()
              console.log(data)
              
            
              dispatch({
                type: "POPULATE_COURSE_QUIZZES",
                payload: { courseId: course.id, fetched_quizzes: data.data },
              });
        
              
              return data.data
            }
          
         fetchCoursesQuizzes()
      
    });
  }, [courses]);
  useEffect(() => {
    console.log(courses); 
    courses.forEach((course) => {
      console.log(course)
            const fetchCoursesRepotCards = async()=>{
             
              const courseId  = course.id
              const token  = localStorage.getItem('token')
              console.log(token)
              const response = await fetch(`http://127.0.0.1:8000/api/teacher/get_students_reports/${courseId}`,{
                method:"GET",
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              })
              const data = await response.json()
              console.log(data.data[0])
              
            
              dispatch({
                type: "POPULATE_COURSE_REPORT_CARDS",
                payload: { courseId: course.id, fetched_reports:data.data },
              });
        
              
              return data.data
            }
          
         fetchCoursesRepotCards()
      
    });
  }, [courses]);
  useEffect(() => {
    console.log(courses); 
    courses.forEach((course) => {
      console.log(course)
            const fetchCoursesStudentsAssignments = async()=>{
             
              const courseId  = course.id
              const token  = localStorage.getItem('token')
              console.log(token)
              console.log(courseId)
              const response = await fetch(`http://127.0.0.1:8000/api/teacher/courses/${courseId}/students-with-assignments`,{
                method:"GET",
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              })
              const data = await response.json()
              console.log(data.data[0])
              
            
              dispatch({
                type: "POPULATE_STUDENTS_ASSIGNMENTS",
                payload: { courseId: course.id, fetched_students_assignments:data.data },
              });
              console.log(data)
        
              
              return data.data
            }
          
         fetchCoursesStudentsAssignments()
      
    });
  }, [courses]);

  useEffect(() => {
    console.log(courses); 
    courses.forEach((course) => {
      console.log(course)
            const fetchCoursesAttendanceSheets = async()=>{
             
              const courseId  = course.id
              const token  = localStorage.getItem('token')
              console.log(token)
              console.log(courseId)
              const response = await fetch(`http://127.0.0.1:8000/api/teacher/attendance/course/${courseId}`,{
                method:"GET",
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              })
              const data = await response.json()
              console.log(data.data)
              
            
              dispatch({
                type: "POPULATE_COURSES_ATTENDANCE",
                payload: { courseId: course.id, fetched_attendance:data },
              });
              console.log(data)
        
              
              return data.data
            }
          
            fetchCoursesAttendanceSheets()
      
    });
  }, [courses]);
  useEffect(() => {
    console.log(courses); 
    courses.forEach((course) => {
      console.log(course)
            const getAnnouncments = async()=>{
             
              const courseId  = course.id
              const token  = localStorage.getItem('token')
              console.log(token)
              console.log(courseId)
              const response = await fetch(`http://127.0.0.1:8000/api/teacher/courses/${courseId}/announcements`,{
                method:"GET",
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              })
              const data = await response.json()
              console.log(data.data)
              dispatch({
                type: "ADD_TEACHER_ANNOUNCEMENTS",
                payload: data ,
              });
              console.log(data)
        
              
              return data.data
            }
          
            getAnnouncments()
      
    });
  }, [courses]);

  return (
    <>
 
    </>
  );
};

export default TeacherContextInitializer;
