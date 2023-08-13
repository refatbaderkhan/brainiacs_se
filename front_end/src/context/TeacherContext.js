import { createContext , useState , useEffect ,useReducer} from "react";

const TeacherContext = createContext()

export const TeacherProvider = ({ children }) => {
  const initialState ={
    isError:false,
    isSuccess:false,
    isPending:false,
    name:"Toni",
    id:11,
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
    announcements:[
      {
        course_id:1,
        title:"Apples announecement",
        announcement:"Apples are free today at the cafeteria"
      }
    ],
    courses:[
      {
        id:1,
        title:"React CLass Basics SEF34",
        description:"Learn React JS ",
        enrollement_limit:35,
        attendance_sheet:"",
        course_quizzes:[
          {
            quizz_id:1,
            quizz_doc:"Apples/test.xlsx",
            quizz_grade:100,
            quizz_title:"Desktop Quizzes",
            quizz_description:"This is a quiz"
          },
          {
            quizz_id:2,
            quizz_doc:"Desktop/test.xlsx",
            quizz_grade:100,
            quizz_title:"Apples Quizzes",
            quizz_description:"This is not a quiz"
          },
          {
            quizz_id:3,
            quizz_doc:"Marso/last.xlsx",
            quizz_grade:50,
            quizz_title:"Narso Quizzes",
            quizz_description:"Maybe not a quiz"
          },
        ],
        course_assignments:[
          {
            assignment_id: 1,
            assignment_doc:"../assignments/css",
            assignment_desc:"Restaurant Website",
            assignment_title:"Css Html",
            assignment_grade:100,
            assignment_due:11/11/2020
          },
          {
            assignment_id:2,
            assignment_doc:"../assignments/uncleBob",
            assignment_desc:"Yt Videos",
            assignment_title:"Uncle Bob",
            assignment_grade:50,
            assignment_due:11/11/2020
          }
        ],
        reportCards : [
          {
            id:1,
            student_name : "toni",
            studentPerformance:{
              student_id: 11 , 
              average_grade:90,
              completedCourses:15,
              enrolledCourses:5
            }
          },
          {
            id:100,
            student_name : "Samir",
            studentPerformance:{
              student_id: 123 , 
              average_grade:50,
              completedCourses:5,
              enrolledCourses:4
            }
          },
          {
            id:133,
            student_name : "Tanjara",
            studentPerformance:{
              student_id: 113 , 
              average_grade:70,
              completedCourses:7,
              enrolledCourses:3
            }
          },
    
        ],
        students:[
          {
            id: 11,
            name:"toni",
            assignments:[
              {
                assignment_id: 1,
                assignment_doc:"../toni/assignment/1",
                submitted_at:"11/10/1969",
                assignment_name:"Training for useDebounce",
                feedback:"",
                grade:0
              },
              {
                assignment_id: 2,
                assignment_doc:"../toni/assignment/2",
                submitted_at:"11/11/1969",
                assignment_name:"Training for useMemo",
                feedback:"",
                grade:0
              },
              {
                assignment_id: 3,
                assignment_doc:"../toni/assignment/3",
                submitted_at:"11/12/1969",
                assignment_name:"Training for useEffect",
                feedback:"",
                grade:0,
              },
              {
                assignment_id: 4,
                assignment_doc:"../toni/assignment/4",
                assignment_name:"Training for useCallback",
                submitted_at:"1/1/1970",
                feedback:"",
                grade:0
              },
            ]
          },
          {
            id: 12,
            name:"Samir",
            assignments:[
              {
                assignment_id: 1,
                assignment_doc:"../Samir/assignment/1",
                assignment_name:"Training for useMemo",
                submitted_at:"11/10/1969",
                feedback:"",
                grade:0
              },
              {
                assignment_id: 2,
                assignment_doc:"../Samir/assignment/2",
                submitted_at:"11/11/1969",
                assignment_name:"Training for useEffect",
                feedback:"",
                grade:0
              },
              {
                assignment_id: 3,
                assignment_doc:"../Samir/assignment/3",
                assignment_name:"Training for useCallback",
                submitted_at:"11/12/1969",
                feedback:"",
                grade:0
              }
            ]
          },
          {
            id: 13,
            name:"Tanjara",
            assignments:[
              {
                assignment_id: 1,
                assignment_name:"Training for useEffect",
                assignment_doc:"../Tanjara/assignment/1",
                submitted_at:"11/12/1969",
                grade:0
              },
              {
                assignment_id: 3,
                assignment_name:"Training for useCallback",
                assignment_doc:"../Tanjara/assignment/3",
                submitted_at:"11/10/1969",
                grade:0
              }
            ]
          },
        ], 
      } , 
      {
        id:2,
        title:"NodeJS Basics",
        description:"Learn Node JS ",
        enrollement_limit:25,
        course_quizzes:[
          {
            quizz_id:4,
            quizz_doc:"NodeJS/NodeJS.xlsx",
            quizz_grade:100,
            quizz_title:"NodeJS Quizzes",
            quizz_description:"This is a quiz"
          },
          {
            quizz_id:5,
            quizz_doc:"NodeJS1/test.xlsx",
            quizz_grade:100,
            quizz_title:"NodeJS1 Quizzes",
            quizz_description:"This is not a quiz"
          },
          {
            quizz_id:6,
            quizz_doc:"NodeJS2/NodeJS2.xlsx",
            quizz_grade:110,
            quizz_title:"NodeJS2 Quizzes",
            quizz_description:"Maybe not a quiz"
          },
        ],
        attendance_sheet:[
          {
            student_name:"toni",
            attendend_times:5
          },
          {
            student_name:"Samira",
            attendend_times:5
          },
          {
            student_name:"Tansa Hamza",
            attendend_times:5
          }
        ],
        course_assignments: [{
          assignment_id:  3,
          assignment_doc:"../assignments/JS",
          assignment_desc:"XYZWW Website",
          assignment_title:"JS Vanilla",
          assignment_grade:100,
          assignment_due:11/11/2020
        },
        {
          assignment_id:4,
          assignment_doc:"../assignments/React",
          assignment_desc:"Train for useState State",
          assignment_title:"Frontend web dev",
          assignment_grade:100,
          assignment_due:11/11/2020
        }],
        reportCards : [
          {
            id:1,
            student_name : "toni",
            studentPerformance:{
              student_id: 11 , 
              average_grade:90,
              completedCourses:15,
              enrolledCourses:5
            }
          },
          {
            id:200,
            student_name : "Samira",
            studentPerformance:{
              student_id: 123 , 
              average_grade:50,
              completedCourses:5,
              enrolledCourses:4
            }
          },
          {
            id:173,
            student_name : "Tansa Hamza",
            studentPerformance:{
              student_id: 113 , 
              average_grade:70,
              completedCourses:7,
              enrolledCourses:3
            }
          },
    
        ],
        students:[
          {
            id: 11,
            name:"toni",
            assignments:[
              {
                assignment_id: 67,
                assignment_doc:"../toni/assignment/67",
                submitted_at:"11/9/1969",
                assignment_name:"Training for Emitting events",
                feedback:"",
                grade:0
              },
              {
                assignment_id: 68,
                assignment_doc:"../toni/assignment/2",
                submitted_at:"11/11/1969",
                assignment_name:"Training for Restful Apps",
                feedback:"",
                grade:0
              },
              {
                assignment_id: 69,
                assignment_doc:"../toni/assignment/3",
                submitted_at:"11/12/1969",
                assignment_name:"Training for Middlewares",
                feedback:"",
                grade:0,
              },
              {
                assignment_id: 70,
                assignment_doc:"../toni/assignment/4",
                assignment_name:"Training for authoristaion",
                submitted_at:"1/1/1970",
                feedback:"",
                grade:0
              },
            ]
          },
          {
            id: 123,
            name:"Samira",
            assignments:[
              {
                assignment_id: 67,
                assignment_doc:"../Samira/assignment/67",
                submitted_at:"11/9/1969",
                assignment_name:"Training for Emitting events",
                feedback:"",
                grade:0
              },
              {
                assignment_id: 68,
                assignment_doc:"../Samira/assignment/2",
                submitted_at:"11/11/1969",
                assignment_name:"Training for Restful Apps",
                feedback:"",
                grade:0
              },
              {
                assignment_id: 69,
                assignment_doc:"../Samira/assignment/3",
                submitted_at:"11/12/1969",
                assignment_name:"Training for Middlewares",
                feedback:"",
                grade:0,
              },
              {
                assignment_id: 70,
                assignment_doc:"../Samira/assignment/4",
                assignment_name:"Training for authoristaion",
                submitted_at:"1/1/1970",
                feedback:"",
                grade:0
              },
            ]
          },
          {
            id: 113,
            name:"Tansa Hamza",
            assignments:[
              {
                assignment_id: 67,
                assignment_doc:"../Tansa Hamza/assignment/67",
                submitted_at:"11/9/1969",
                assignment_name:"Training for Emitting events",

                grade:0
              },
              {
                assignment_id: 70,
                assignment_doc:"../Tansa Hamza/assignment/4",
                assignment_name:"Training for authoristaion",
                submitted_at:"1/1/1970",
                grade:0
              },
            ]
          },
        ], 
      } , 
    ],
   
  }
  ;
  const reducer = (state, action) => {
    let updatedCourses
    let { courseId , assignmentId, grade, feedback} = action.payload;
    switch (action.type) {
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
                console.log(course)
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
                  console.log(assignmentId)
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