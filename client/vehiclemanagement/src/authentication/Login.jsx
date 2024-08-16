import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { tokenGenerate } from '../Api/allApi'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Login() {

  const navigate=useNavigate()

  const [loginData,setLoginData]=useState({
    username:"",password:""
  })

  const getLoginData=(e)=>{
    e.preventDefault()
    console.log(loginData);

    const {username,password}=loginData

    if(!username || !password){
      toast.warning("invallid data")
    }
    else{
      tokenGenerate(loginData).then(res=>{
        console.log(res.data);
        sessionStorage.setItem("token",res.data.token)
        toast.success("login Successful!")
        navigate('/home')
      })
    }
  }

  return (
    <div className='w-100 d-flex align-items-center justify-content-center mt-5'>
    <div className='w-50 p-5 border shadow '>
    <h4 className='text-center'>Login</h4>
    <form action="" >
      <input type="text" placeholder='Username' className='form-control' onChange={(e)=>(setLoginData({...loginData,username:e.target.value}))} /> <br />
      <input type="password" placeholder='Password' className='form-control' onChange={(e)=>(setLoginData({...loginData,password:e.target.value}))}  /> <br />
      <div className='d-flex justify-content-between'>
          <button className='btn btn-info' onClick={getLoginData}>Login</button>
          <Link to={'/reg'}>Alredy registered Login here</Link>
        </div>
    </form>
    </div>
  </div>
  )
}

export default Login