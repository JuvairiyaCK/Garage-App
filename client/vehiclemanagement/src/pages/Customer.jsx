import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Row,Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'
import AddCustomer from './AddCustomer';
import { useEffect,useState } from 'react';
import { getCustomers } from '../Api/allApi';
import { addCustomerContextData } from '../contextApi/CustomerContext';
import { useContext } from 'react';
import DeleteCustomer from './DeleteCustomer';
import EditCust from './EditCust';

function Customer() {

    const {addCustContext}=useContext(addCustomerContextData)
  // console.log(addCustContext);

  // const [allCustomers,setAllCustomers]=useState([])
  const [allCust,setCustomers]=useState([])

  useEffect(()=>{
    getAllCustomers()
  },[addCustContext])

  const getAllCustomers=()=>{

    const header={
      "Content-type":"application/json",
      "Authorization":`Token ${sessionStorage.getItem('token')}`
    }

    getCustomers(header).then(res=>{
      console.log(res.data);
      setCustomers(res.data)

    })
  }


  return (
    <div>
    <Header/>
        <div className='container'>
          <Row>
              <Col sm={12} md={4}>
                  <AddCustomer/>
              </Col>
              <Col sm={12} md={8}>
                  <div className='m-4 row '>
                  {
                    allCust.length > 0 ?
                      allCust.map(item=>(
                        <Card style={{ width: '18rem' }} className='mx-2 my-2'>
                            <Card.Img variant="top" src={item.image} />
                            <Card.Body>
                                <Card.Title>{item.vehicle_no}</Card.Title>
                                <Card.Text>
                                  <h6>{item.customer_name}</h6>
                                  <h6>{item.phone}</h6>
                                </Card.Text>
                                <Link className='btn btn-info' to={`/service/${item.id}`}>Services</Link>
                                <div className='d-flex align-items-center justify-content-between mt-3 mx-5 me-1'>
                                      <DeleteCustomer id={item.id}/>
                                      <EditCust id={item.id}/>
                                </div>
                            </Card.Body>
                        </Card>
                      ))
                    
                  :<h4> No Customers </h4>

                  }
                  </div>
              </Col>
          </Row>
        </div>
    <Footer/>
    </div>
  )
}

export default Customer