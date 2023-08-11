import {BrowserRouter as Router , Route , Routes} from 'react-router-dom'
import { TeacherProvider } from './context/TeacherContext'
import TeacherLandingPage from './components/Teacher/TeacherLandingPage'
import Homepage_parent from './ParentWork/pages/Homepage_parent'
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
       </Routes>


      </div>
    </Router>
    

  )
}

export default App