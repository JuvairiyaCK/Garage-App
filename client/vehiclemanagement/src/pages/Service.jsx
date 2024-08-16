import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useParams } from 'react-router-dom'
import { Row,Col } from 'react-bootstrap'
import { useEffect } from 'react'
import { getCustomerDetail } from '../Api/allApi'
import { useState } from 'react'
import AddNewService from './AddNewService'
import { addServiceContextData } from '../contextApi/CustomerContext'
import { useContext } from 'react'
import DeleteService from './DeleteService'
import EditService from './EditService'

function Service() {

    const [getServices,setServices]=useState([])


    const {addServiceContext}=useContext(addServiceContextData)

    const {id}=useParams()

    useEffect(()=>{
        getDetailData()
    },[addServiceContext])

    const getDetailData=()=>{

      const header={
        "Content-type":"application/json",
        "Authorization":`Token ${sessionStorage.getItem('token')}`
      }

      getCustomerDetail(header,id).then(res=>{
        console.log(res.data);
        setServices(res.data)
      })
    }



  return (
    <div>
        <Header/>
        
        <div className='container mt-3'>
          <Row>
              <Col sm={12} md={4}>
                  <AddNewService id={id}/>
              </Col>
              <Col sm={12} md={8}>
                  <div className='m-4 row '>
                      <table className='table table-bordered table-striped'>
                        <thead>
                          <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            getServices?.service?.length > 0 ?
                                getServices.service.map(item=>(
                                  <tr>
                                      <td>{item.title}</td>
                                      <td>{item.description}</td>
                                      <td>{item.price}</td>
                                      <td>
                                        <DeleteService id={item.id}/>
                                      </td>
                                      <td>
                                          <EditService id={item.id}/>
                                      </td>
                                  </tr>
                                ))

                            :
                            <h4> No services</h4>
                          }
                          
                        </tbody>
                      </table>
                  </div>
              </Col>
              <div>
                 <h5>Total Price: <span>{getServices.total_price?getServices.total_price:0}</span></h5> 
              </div>
          </Row>
        </div>


        <Footer/>
    </div>
  )
}

export default Service