import React from 'react'
import { Button } from 'react-bootstrap'
import { delCustomer } from '../Api/allApi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useContext } from 'react';
import { addCustomerContextData } from '../contextApi/CustomerContext'



function DeleteCustomer({id}) {

  const {setAddCustomerContext}=useContext(addCustomerContextData)


    const navigate=useNavigate()

    const deleteData=()=>{

        const header={
            "Content-type":"application/json",
            "Authorization":`Token ${sessionStorage.getItem('token')}`
          }

    delCustomer(header,id).then(res=>{
        console.log(res.data);
        toast.success('Customer Deleted')
        navigate('/customer')
        setAddCustomerContext(res)
    })
    }

  return (
    <div>
        <Button className='btn btn-danger ms-5' onClick={deleteData}>Delete</Button>
    </div>
  )
}

export default DeleteCustomer