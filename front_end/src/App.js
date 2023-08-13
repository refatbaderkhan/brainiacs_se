import {BrowserRouter as Router , Route , Routes} from 'react-router-dom'
import { TeacherProvider } from './context/TeacherContext'
import TeacherLandingPage from './components/Teacher/TeacherLandingPage'
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
      
      </div>
    </Router>
    

  )
}

export default App