import React, { useState } from 'react'
import "../style.css"
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
import { logIn } from '../../Redux/Actions/Users';

const Login = () => {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const dispatch = useDispatch()
    const history = useNavigate()
     const handleLogin=()=>{
        const loginDetails ={
            email,
            password
        }
        dispatch(logIn(loginDetails,history))
     }
  return (
    <>
      <div className=' register_cover'>
        <div className='glass register_card'>
            <div className='box_1'>
            <h2>aSoci@ls</h2>
            <p>Explore the beauty of people,place and things.</p>
            </div>
            <div className='box_2'>
                <input type="text" className='input_text' placeholder='Enter email' onChange={(e)=>setEmail(e.target.value)} />
                <input type="password" className='input_text' placeholder='Enter password' onChange={(e)=>setPassword(e.target.value)} />
                <button className="btn my-2" style={{width:"80%"}} onClick={handleLogin}>Login</button>
                <small className='my-3'>New to aSoci@ls? <Link className='mx-1' to="/register" >Sign Up</Link></small>
            </div>
        </div>
      </div>
    </>
  )
}

export default Login;
