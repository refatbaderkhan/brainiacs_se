import {BrowserRouter as Router , Route , Routes} from 'react-router-dom'
import { TeacherProvider } from './context/TeacherContext'
import TeacherLandingPage from './components/Teacher/TeacherLandingPage'
import Homepage_parent from './ParentWork/pages/Homepage_parent'
import Child_details from './ParentWork/pages/Child_details'
function App(){
  
  

  return (
    <Router>

      <div className="container">
      <TeacherProvider>
        <Routes>
          
            <Route path="/" element={<TeacherLandingPage/>}/>
          
          </Routes>
        </TeacherProvider>

        {/* Routes for Parent  */}
       <Routes>
               <Route path="/parent" element={<Homepage_parent />}/>
               <Route path="/child" element={<Child_details />}/>
               
       </Routes>


      </div>
    </Router>
    

  )
}

export default App