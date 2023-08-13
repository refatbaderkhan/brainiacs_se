import {BrowserRouter as Router , Route , Routes} from 'react-router-dom'
import { TeacherProvider } from './context/TeacherContext'
import TeacherLandingPage from './components/Teacher/TeacherLandingPage'
import Homepage_parent from './ParentWork/pages/Homepage_parent'
import Child_details from './ParentWork/pages/Child_details'
import ChatRoom from './components/Teacher/ChatRoom'
function App(){
  
  

  return (
    <Router>

      <div className="container">
      <TeacherProvider>
        <Routes>
          
            <Route path="/" element={<TeacherLandingPage/>}/>
            <Route path="/ChatRoom/:userId" element={<ChatRoom/>}/>
          
          </Routes>
        </TeacherProvider>

        {/* Routes for Parent  */}
       <Routes>
               <Route path="/parent" element={<Homepage_parent />}/>
               <Route path="/child/:id" element={<Child_details />}/>
               
       </Routes>


      </div>
    </Router>
    

  )
}

export default App