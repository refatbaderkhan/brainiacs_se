import {BrowserRouter as Router , Route , Routes} from 'react-router-dom'
import { TeacherProvider } from './context/TeacherContext'
import TeacherLandingPage from './components/Teacher/TeacherLandingPage'
function App(){
  
  

  return (
    <Router>

      <div className="container">
      <TeacherProvider>
        <Routes>
          
            <Route path="/" element={<TeacherLandingPage/>}/>
          
          </Routes>
        </TeacherProvider>
      


      </div>
    </Router>
    

  )
}

export default App