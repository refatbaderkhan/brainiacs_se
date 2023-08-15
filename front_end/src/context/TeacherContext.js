import { createContext , useState , useEffect ,useReducer} from "react";

const TeacherContext = createContext()

export const TeacherProvider = ({ children }) => {
  const initialState ={
    isError:false,
    isSuccess:false,
    isPending:false,
    name:"",
    id:0,
    messages:[
      {
        sender_id:11,
        receiver_id:2,
        created_at:10/11/2023,
        message_content:"Hello"
      },
      {
        sender_id:2,
        receiver_id:11,
        created_at:10/11/2023,
        message_content:"Hi"
      },
      {
        sender_id:11,
        receiver_id:2,
        created_at:10/11/2023,
        message_content:"kifak"
      },
      {
        sender_id:2,
        receiver_id:11,
        created_at:10/11/2023,
        message_content:"hamdellaa enta kif"
      },
      {
        sender_id:11,
        receiver_id:2,
        created_at:10/11/2023,
        message_content:"hamdella"
      },
      {
        sender_id:2,
        receiver_id:11,
        created_at:10/11/2023,
        message_content:"elle"
      },
      {
        sender_id:11,
        receiver_id:2,
        created_at:10/11/2023,
        message_content:"wen sar l homework"
      },
      {
        sender_id:11,
        receiver_id:2,
        created_at:10/11/2023,
        message_content:"Hello"
      },
      
        {
          sender_id: 11,
          receiver_id: 3,
          created_at: "10/11/2023",
          message_content: "Hello"
        },
        {
          sender_id: 3,
          receiver_id: 11,
          created_at: "10/11/2023",
          message_content: "Hey there!"
        },
        {
          sender_id: 11,
          receiver_id: 3,
          created_at: "10/11/2023",
          message_content: "How are you?"
        },
        {
          sender_id: 3,
          receiver_id: 11,
          created_at: "10/11/2023",
          message_content: "I'm doing well, thanks!"
        },
        {
          sender_id: 11,
          receiver_id: 3,
          created_at: "10/11/2023",
          message_content: "That's great to hear!"
        },
        {
            sender_id: 11,
            receiver_id: 4,
            created_at: "10/11/2023",
            message_content: "Hey!"
          },
          {
            sender_id: 4,
            receiver_id: 11,
            created_at: "10/11/2023",
            message_content: "Hello there!"
          },
          {
            sender_id: 11,
            receiver_id: 4,
            created_at: "10/11/2023",
            message_content: "How's your day going?"
          },
          {
            sender_id: 4,
            receiver_id: 11,
            created_at: "10/11/2023",
            message_content: "It's been good, thanks!"
          },
          {
            sender_id: 11,
            receiver_id: 4,
            created_at: "10/11/2023",
            message_content: "Glad to hear that!"
          } 
    ],
    // announcements:[
    //   {
    //     course_id:1,
    //     title:"Apples announecement",
    //     announcement:"Apples are free today at the cafeteria"
    //   }
    // ],
    courses:[
      // {
      //   id:1,
      //   title:"React CLass Basics SEF34",
      //   description:"Learn React JS ",
      //   enrollement_limit:35,
      //   attendance_sheet:"",
      //   course_quizzes:[
      //     {
      //       quizz_id:1,
      //       quizz_doc:"Apples/test.xlsx",
      //       quizz_grade:100,
      //       quizz_title:"Desktop Quizzes",
      //       quizz_description:"This is a quiz"
      //     },
      //     {
      //       quizz_id:2,
      //       quizz_doc:"Desktop/test.xlsx",
      //       quizz_grade:100,
      //       quizz_title:"Apples Quizzes",
      //       quizz_description:"This is not a quiz"
      //     },
      //     {
      //       quizz_id:3,
      //       quizz_doc:"Marso/last.xlsx",
      //       quizz_grade:50,
      //       quizz_title:"Narso Quizzes",
      //       quizz_description:"Maybe not a quiz"
      //     },
      //   ],
      //   course_assignments:[
      //     {
      //       assignment_id: 1,
      //       assignment_doc:"../assignments/css",
      //       assignment_desc:"Restaurant Website",
      //       assignment_title:"Css Html",
      //       assignment_grade:100,
      //       assignment_due:11/11/2020
      //     },
      //     {
      //       assignment_id:2,
      //       assignment_doc:"../assignments/uncleBob",
      //       assignment_desc:"Yt Videos",
      //       assignment_title:"Uncle Bob",
      //       assignment_grade:50,
      //       assignment_due:11/11/2020
      //     }
      //   ],
      //   reportCards : [
      //     {
      //       id:1,
      //       student_name : "toni",
      //       studentPerformance:{
      //         student_id: 11 , 
      //         average_grade:90,
      //         completedCourses:15,
      //         enrolledCourses:5
      //       }
      //     },
      //     {
      //       id:100,
      //       student_name : "Samir",
      //       studentPerformance:{
      //         student_id: 123 , 
      //         average_grade:50,
      //         completedCourses:5,
      //         enrolledCourses:4
      //       }
      //     },
      //     {
      //       id:133,
      //       student_name : "Tanjara",
      //       studentPerformance:{
      //         student_id: 113 , 
      //         average_grade:70,
      //         completedCourses:7,
      //         enrolledCourses:3
      //       }
      //     },
    
      //   ],
      //   students:[
      //     {
      //       id: 11,
      //       name:"toni",
      //       assignments:[
      //         {
      //           assignment_id: 1,
      //           assignment_doc:"../toni/assignment/1",
      //           submitted_at:"11/10/1969",
      //           assignment_name:"Training for useDebounce",
      //           feedback:"",
      //           grade:0
      //         },
      //         {
      //           assignment_id: 2,
      //           assignment_doc:"../toni/assignment/2",
      //           submitted_at:"11/11/1969",
      //           assignment_name:"Training for useMemo",
      //           feedback:"",
      //           grade:0
      //         },
      //         {
      //           assignment_id: 3,
      //           assignment_doc:"../toni/assignment/3",
      //           submitted_at:"11/12/1969",
      //           assignment_name:"Training for useEffect",
      //           feedback:"",
      //           grade:0,
      //         },
      //         {
      //           assignment_id: 4,
      //           assignment_doc:"../toni/assignment/4",
      //           assignment_name:"Training for useCallback",
      //           submitted_at:"1/1/1970",
      //           feedback:"",
      //           grade:0
      //         },
      //       ]
      //     },
      //     {
      //       id: 12,
      //       name:"Samir",
      //       assignments:[
      //         {
      //           assignment_id: 1,
      //           assignment_doc:"../Samir/assignment/1",
      //           assignment_name:"Training for useMemo",
      //           submitted_at:"11/10/1969",
      //           feedback:"",
      //           grade:0
      //         },
      //         {
      //           assignment_id: 2,
      //           assignment_doc:"../Samir/assignment/2",
      //           submitted_at:"11/11/1969",
      //           assignment_name:"Training for useEffect",
      //           feedback:"",
      //           grade:0
      //         },
      //         {
      //           assignment_id: 3,
      //           assignment_doc:"../Samir/assignment/3",
      //           assignment_name:"Training for useCallback",
      //           submitted_at:"11/12/1969",
      //           feedback:"",
      //           grade:0
      //         }
      //       ]
      //     },
      //     {
      //       id: 13,
      //       name:"Tanjara",
      //       assignments:[
      //         {
      //           assignment_id: 1,
      //           assignment_name:"Training for useEffect",
      //           assignment_doc:"../Tanjara/assignment/1",
      //           submitted_at:"11/12/1969",
      //           grade:0
      //         },
      //         {
      //           assignment_id: 3,
      //           assignment_name:"Training for useCallback",
      //           assignment_doc:"../Tanjara/assignment/3",
      //           submitted_at:"11/10/1969",
      //           grade:0
      //         }
      //       ]
      //     },
      //   ], 
      // } , 
      // {
      //   id:2,
      //   title:"NodeJS Basics",
      //   description:"Learn Node JS ",
      //   enrollement_limit:25,
      //   course_quizzes:[
      //     {
      //       quizz_id:4,
      //       quizz_doc:"NodeJS/NodeJS.xlsx",
      //       quizz_grade:100,
      //       quizz_title:"NodeJS Quizzes",
      //       quizz_description:"This is a quiz"
      //     },
      //     {
      //       quizz_id:5,
      //       quizz_doc:"NodeJS1/test.xlsx",
      //       quizz_grade:100,
      //       quizz_title:"NodeJS1 Quizzes",
      //       quizz_description:"This is not a quiz"
      //     },
      //     {
      //       quizz_id:6,
      //       quizz_doc:"NodeJS2/NodeJS2.xlsx",
      //       quizz_grade:110,
      //       quizz_title:"NodeJS2 Quizzes",
      //       quizz_description:"Maybe not a quiz"
      //     },
      //   ],
      //   attendance_sheet:[
      //     {
      //       student_name:"toni",
      //       attendend_times:5
      //     },
      //     {
      //       student_name:"Samira",
      //       attendend_times:5
      //     },
      //     {
      //       student_name:"Tansa Hamza",
      //       attendend_times:5
      //     }
      //   ],
      //   course_assignments: [{
      //     assignment_id:  3,
      //     assignment_doc:"../assignments/JS",
      //     assignment_desc:"XYZWW Website",
      //     assignment_title:"JS Vanilla",
      //     assignment_grade:100,
      //     assignment_due:11/11/2020
      //   },
      //   {
      //     assignment_id:4,
      //     assignment_doc:"../assignments/React",
      //     assignment_desc:"Train for useState State",
      //     assignment_title:"Frontend web dev",
      //     assignment_grade:100,
      //     assignment_due:11/11/2020
      //   }],
      //   reportCards : [
      //     {
      //       id:1,
      //       student_name : "toni",
      //       studentPerformance:{
      //         student_id: 11 , 
      //         average_grade:90,
      //         completedCourses:15,
      //         enrolledCourses:5
      //       }
      //     },
      //     {
      //       id:200,
      //       student_name : "Samira",
      //       studentPerformance:{
      //         student_id: 123 , 
      //         average_grade:50,
      //         completedCourses:5,
      //         enrolledCourses:4
      //       }
      //     },
      //     {
      //       id:173,
      //       student_name : "Tansa Hamza",
      //       studentPerformance:{
      //         student_id: 113 , 
      //         average_grade:70,
      //         completedCourses:7,
      //         enrolledCourses:3
      //       }
      //     },
    
      //   ],
      //   students:[
      //     {
      //       id: 11,
      //       name:"toni",
      //       assignments:[
      //         {
      //           assignment_id: 67,
      //           assignment_doc:"../toni/assignment/67",
      //           submitted_at:"11/9/1969",
      //           assignment_name:"Training for Emitting events",
      //           feedback:"",
      //           grade:0
      //         },
      //         {
      //           assignment_id: 68,
      //           assignment_doc:"../toni/assignment/2",
      //           submitted_at:"11/11/1969",
      //           assignment_name:"Training for Restful Apps",
      //           feedback:"",
      //           grade:0
      //         },
      //         {
      //           assignment_id: 69,
      //           assignment_doc:"../toni/assignment/3",
      //           submitted_at:"11/12/1969",
      //           assignment_name:"Training for Middlewares",
      //           feedback:"",
      //           grade:0,
      //         },
      //         {
      //           assignment_id: 70,
      //           assignment_doc:"../toni/assignment/4",
      //           assignment_name:"Training for authoristaion",
      //           submitted_at:"1/1/1970",
      //           feedback:"",
      //           grade:0
      //         },
      //       ]
      //     },
      //     {
      //       id: 123,
      //       name:"Samira",
      //       assignments:[
      //         {
      //           assignment_id: 67,
      //           assignment_doc:"../Samira/assignment/67",
      //           submitted_at:"11/9/1969",
      //           assignment_name:"Training for Emitting events",
      //           feedback:"",
      //           grade:0
      //         },
      //         {
      //           assignment_id: 68,
      //           assignment_doc:"../Samira/assignment/2",
      //           submitted_at:"11/11/1969",
      //           assignment_name:"Training for Restful Apps",
      //           feedback:"",
      //           grade:0
      //         },
      //         {
      //           assignment_id: 69,
      //           assignment_doc:"../Samira/assignment/3",
      //           submitted_at:"11/12/1969",
      //           assignment_name:"Training for Middlewares",
      //           feedback:"",
      //           grade:0,
      //         },
      //         {
      //           assignment_id: 70,
      //           assignment_doc:"../Samira/assignment/4",
      //           assignment_name:"Training for authoristaion",
      //           submitted_at:"1/1/1970",
      //           feedback:"",
      //           grade:0
      //         },
      //       ]
      //     },
      //     {
      //       id: 113,
      //       name:"Tansa Hamza",
      //       assignments:[
      //         {
      //           assignment_id: 67,
      //           assignment_doc:"../Tansa Hamza/assignment/67",
      //           submitted_at:"11/9/1969",
      //           assignment_name:"Training for Emitting events",

      //           grade:0
      //         },
      //         {
      //           assignment_id: 70,
      //           assignment_doc:"../Tansa Hamza/assignment/4",
      //           assignment_name:"Training for authoristaion",
      //           submitted_at:"1/1/1970",
      //           grade:0
      //         },
      //       ]
      //     },
      //   ], 
      // } , 
    ],
   
  }
  ;
  const reducer = (state, action) => {
    let updatedCourses
    let { courseId , assignmentId, grade, feedback} = action.payload;
    switch (action.type) {
      case "ADD_TEACHER_INFO":
      return{
        ...state ,
        name:action.payload.teacherName,
        id:action.payload.teacherId,

      }
      case "ADD_TEACHER_ANNOUNCEMENTS":
        console.log(action.payload)
    
      const courseAnnouncements = state.announcements || [];
      return {
        ...state,
        announcements: [...courseAnnouncements , ...action.payload]
      };
      case "ADD_SINGLE_ANNOUNCEMENT":
        console.log(action.payload)
    
      const Announcements = state.announcements || [];
  
      return {
        ...state,
        announcements: [...Announcements , action.payload]
      };
      case "ADD_TEACHER_MESSAGES":
      return{
        ...state ,
        messages:action.payload
      }
    
     
      case "ADD_COURSES":
      return{
        ...state ,
        courses:action.payload,
      }
      case 'CREATE_COURSE':
        const newCourse = {
          id: state.courses.length + 1,
          title: action.payload.title,
          description: action.payload.description,
          enrollement_limit: action.payload.enrollement_limit,
          reportCards: [],
          students: [],
          course_assignments: [],
          course_quizzes: [],
        };
        return {
          ...state,
          courses: [...state.courses, newCourse],
        };
      case 'POPULATE_COURSE_ASSIGNMENTS':
        const {fetched_assignments} = action.payload
        updatedCourses = state.courses?.map(course => {
         
          if (course.id === courseId) {
           const filteredAssignments = fetched_assignments?.map(assignment=>{
            
            return {
              assignment_id:assignment.id,
              assignment_doc:assignment.content_url,
              assignment_desc:assignment.description,
              assignment_title:assignment.title,
              assignment_grade:100,
              assignment_due:assignment.due_date
            }
           })
              const courseAssignments = course.course_assignments || [];
            return {
              ...course,
              course_assignments: [...courseAssignments , ...filteredAssignments]
            };
          }
          return course;
        });
        return {
          ...state,
          courses: updatedCourses,
        };
      case 'POPULATE_COURSES_ATTENDANCE':
        const {fetched_attendance} = action.payload
        console.log(fetched_attendance)
        updatedCourses = state.courses?.map(course => {
         
          if (course.id === courseId) {
           
              const courseAttendance = course. attendance_sheet || [];
            return {
              ...course,
              attendance_sheet: [...courseAttendance , ...fetched_attendance]
            };
          }
          return course;
        });
        return {
          ...state,
          courses: updatedCourses,
        };
      case 'POPULATE_COURSE_QUIZZES':
        const {fetched_quizzes} = action.payload
        updatedCourses = state.courses.map(course => {
         
          if (course.id === courseId) {
           const filteredQuizzes = fetched_quizzes.map(quizz=>{
            return {
              quizz_id:quizz.id,
              quizz_doc:quizz.content_url,
              quizz_description:quizz.description,
              quizz_title:quizz.title,
              quizz_grade:100,
            }
           })
              const courseQuizzes= course.course_quizzes || [];
        
            return {
              ...course,
              course_quizzes: [...courseQuizzes , ...filteredQuizzes]
            };
          }

          return course;
        });
        return {
          ...state,
          courses: updatedCourses,
        };
      case 'POPULATE_COURSE_REPORT_CARDS':
        const {fetched_reports} = action.payload
        updatedCourses = state.courses.map(course => {
         
          if (course.id === courseId) {
           console.log(fetched_reports)
           const filteredReports = fetched_reports.map(report=>{
            console.log(report.performance?.user_id)
            return {
              id:report.performance?.id,
              student_name : report.student.name,
              studentPerformance:{
                student_id: report.performance?.user_id , 
                average_grade:report.performance?.average_grade,
                completedCourses:report.performance?.completed_courses,
                enrolledCourses:report.performance?.enrolled_courses
              }
            }
           })
              const courseReports= course.reportCards || [];
            console.log(filteredReports)
            return {
              ...course,
              reportCards: [...courseReports , ...filteredReports]
            };
          }
        
          return course;
        });
        console.log(updatedCourses)
        return {
          ...state,
          courses: updatedCourses,
        };
      case "POPULATE_STUDENTS_ASSIGNMENTS":
        const {fetched_students_assignments} = action.payload
        console.log(fetched_students_assignments)
        updatedCourses = state.courses.map(course => {
         
          if (course.id === courseId) {
     
          //  const filteredAStudentsssignments = fetched_students_assignments.map(student_assignments=>{
          //   console.log(student_assignments)
          //   return {
          //     // id:report.performance?.id,
          //     // student_name : report.student.name,
          //     // studentPerformance:{
          //     //   student_id: report.performance?.user_id , 
          //     //   average_grade:report.performance?.average_grade,
          //     //   completedCourses:report.performance?.completed_courses,
          //     //   enrolledCourses:report.performance?.enrolled_courses
          //     // }
          //   }
          //  })
              const courseStudents= course.students || [];
            // console.log(filteredReports)
            return {
              ...course,
              students: [...courseStudents , ...fetched_students_assignments]
            };
          }
        
          return course;
        });
        console.log(updatedCourses)
        return {
          ...state,
          courses: updatedCourses,
        };
        case 'ADD_ASSIGNMENT':
            const {assignment} = action.payload
            updatedCourses = state.courses.map(course => {

              if (course.id === courseId) {
   
                return {
                  ...course,
                  course_assignments: [...course.course_assignments
                    , assignment],
                };
              }
              return course;
            });
            return {
              ...state,
              courses: updatedCourses,
            };
        case 'ADD_QUIZZ':
          const {quizz} = action.payload
             
            updatedCourses = state.courses.map(course => {
              
              if (course.id === courseId) {
          
                return {
                  ...course,
                  course_quizzes: [...course.course_quizzes
                    , quizz],
                };
              }
              return course;
            });
            return {
              ...state,
              courses: updatedCourses,
            };
            case 'GRADE_ASSIGNMENT':
              updatedCourses = state.courses.map(course => {
                if (course.id === courseId) {
            
                  const updatedStudents = course.students.map(student => {
                    if (student.name === grade.studentName) {
                      const updatedAssignments = student.assignments.map(assignment => {
                        
                        if (assignment.assignment_id === +assignmentId) {
                          
                          return {
                            ...assignment,
                            grade: grade.grade,
                          };
                        }
                        return assignment;
                      });
            
                      return {
                        ...student,
                        assignments: updatedAssignments,
                      };
                    }
                    return student;
                  });
            
                  return {
                    ...course,
                    students: updatedStudents,
                  };
                }
                return course;
              });
            
              return {
                ...state,
                courses: updatedCourses,
              };
            case 'ADD_FEEDBACK':
              updatedCourses = state.courses.map(course => {
                if (course.id === courseId) {
                  const updatedStudents = course.students.map(student => {
                    if (student.name === feedback.studentName) {
                      const updatedAssignments = student.assignments.map(assignment => {
                        
                        if (assignment.assignment_id === +assignmentId) {
                          
                          return {
                            ...assignment,
                            feedback: feedback.feedback,
                          };
                        }
                        return assignment;
                      });
            
                      return {
                        ...student,
                        assignments: updatedAssignments,
                      };
                    }
                    return student;
                  });
            
                  return {
                    ...course,
                    students: updatedStudents,
                  };
                }
                return course;
              });
            
              return {
                ...state,
                courses: updatedCourses,
              };
            
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);


  
  return (
    <TeacherContext.Provider value={{state ,dispatch }}>
      {children}
    </TeacherContext.Provider>
  );
};

export default TeacherContext