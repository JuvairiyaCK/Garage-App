import { useState } from 'react'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Customer from './pages/Customer'
import Service from './pages/Service'
import './bootstrap.min.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './authentication/Register'
import Login from './authentication/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/reg' element={<Register/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/customer' element={<Customer/>}/>
        <Route path='/service/:id' element={<Service/>}/>
      </Routes>
      <ToastContainer/>
    </>
  )
}

export default App
