import React from 'react'
import { userRegister } from '../Api/allApi'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Register() {

  const navigate=useNavigate()

  const [userData,setUserData]=useState({
    username:"",email:"",password:""
  })



  const userRegisterData=(e)=>{
      e.preventDefault()
      console.log(userData);

      const {username,email,password}=userData

      if(!username || !email || !password){
        toast.warning("Invallid Data")
      }
      else{
        userRegister(userData).then(res=>{
          console.log(res.data);
          toast.success("User Registered")
          setUserData({username:"",email:"",password:""})
          navigate('/')
        })
      }
  }


  return (
    <div className='w-100 d-flex align-items-center justify-content-center mt-5'>
      <div className='w-50 p-5 border shadow '>
      <h4 className='text-center'>Register</h4>
      <form action="" >
        <input type="text" placeholder='Username' className='form-control' onChange={(e)=>(setUserData({...userData,username:e.target.value}))} /> <br />
        <input type="email" placeholder='Email' className='form-control' onChange={(e)=>(setUserData({...userData,email:e.target.value}))}  /> <br />
        <input type="password" placeholder='Password' className='form-control' onChange={(e)=>(setUserData({...userData,password:e.target.value}))}  /> <br />
        <div className='justify-content-center'>
          <button className='btn btn-info' onClick={userRegisterData}>Register</button>
        </div>

      </form>
      </div>
    </div>
  )
}

export default Register