import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function Header() {

  const navigate=useNavigate()

  const logOutCustomer=()=>{
      sessionStorage.removeItem("token")
      toast.success("Logged out")
      navigate('/')
  }

  return (
    <div>
        <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
          <Link to={'/'} style={{'textDecoration':'none'}}>
          <i className="fa-solid fa-car" />
            {' '}
            <span>Garage App</span>
            </Link>
          </Navbar.Brand>
          <div>
              <Link to={'/customer'} className='btn btn-info me-1' variant="primary">Customers</Link>
              <Button className=' btn btn-danger ms-5 me-0' onClick={logOutCustomer}>Logout</Button>
          </div>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header