import { useState , useContext ,useEffect } from "react"
import TeacherContext from "../../context/TeacherContext"
import './login.css'
import { useNavigate } from "react-router-dom"
const Login = () => {
  const navigate = useNavigate()
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
   
  const {state ,dispatch} = useContext(TeacherContext)
  const login = async(email,password)=>{
    const response = await fetch("http://127.0.0.1:8000/api/guest/login",{
      method:"POST",
      headers:{
        "Accept":"application/json",
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,
        password,
      })
    })
    const data = await response.json()
    localStorage.setItem("token" , data.data.token)
    localStorage.setItem("id" , data.data.id)
    if(+data.data.role=== 1){
    navigate("/admin")
    dispatch({
      type: "ADD_ADMIN_INFO",
      payload: { adminId: data.data.id, adminName: data.data.name },
    });
    }
    console.log(data)
  }
 

  const handleEmailChange = (e)=>{
    setEmail(e.target.value)
  }
  const handlePassChange = (e)=>{
    setPassword(e.target.value)
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    login(email , password)

  }
  return (
    <div className="loginPage">
    <div className="login_ncontainer">
      <form className="login_form" onSubmit={handleSubmit}>
        <label className="login_label" htmlFor="email">Email</label>
        <input className="login_input" name="email" id="email" type="text" value={email} onChange={handleEmailChange} />

        <label className="login_label" htmlFor="password">Password</label>
        <input  className="login_input" name="password" id="password" type="text" value={password} onChange={handlePassChange} />
        <br />
        <button  className="login_button" type="submit">Login</button>
      </form>
</div>
</div>
  )
}

export default Login