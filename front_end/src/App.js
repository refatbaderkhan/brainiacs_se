import {BrowserRouter as Router , Route , Routes} from 'react-router-dom'
import { TeacherProvider } from './context/TeacherContext'
import TeacherLandingPage from './components/Teacher/TeacherLandingPage'
import Homepage_parent from './ParentWork/pages/Homepage_parent'
import Child_details from './ParentWork/pages/Child_details'
import ChatRoom from './components/Teacher/ChatRoom'
import AdminLandingPage from './admin/pages/AdminLandingPage'
import Login from './components/Auth/Login'
import Student_Homepage from './StudentWork/pages/Student_Homepage'

function App(){
  
  

  return (
    <Router>

      <div className="container">
      <TeacherProvider>
        <Routes>
          
            <Route path="/" element={<Login/>}/>
            <Route path="/teacher" element={<TeacherLandingPage/>}/>
            <Route path="/" element={<Login/>}/>
            <Route path="/teacher" element={<TeacherLandingPage/>}/>
            <Route path="/ChatRoom/:userId" element={<ChatRoom/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path="/admin" element={<AdminLandingPage />} />
            <Route path='/admin/*' element={<h1>404 Page not Found</h1>}/>

          </Routes>
        </TeacherProvider>

        {/* Routes for Parent  */}
       <Routes>

               <Route path="/parent" element={<Homepage_parent />}/>
               <Route path="/child/:id" element={<Child_details />}/>
               
       </Routes>


         {/* Routes for Parent  */}
       <Routes>

               <Route path="/student" element={<Student_Homepage />}/>
               
       </Routes>

      </div>
    </Router>
    

  )
}

export default App