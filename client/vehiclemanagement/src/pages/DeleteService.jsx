import React from 'react'
import { Button } from 'react-bootstrap'
import { delService } from '../Api/allApi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addServiceContextData } from '../contextApi/CustomerContext';
import { useContext } from 'react';


function DeleteService({id}) {

  const {setAddServiceContext}=useContext(addServiceContextData)


    const navigate=useNavigate()

    const delServiceData=()=>{

        const header={
            "Content-type":"application/json",
            "Authorization":`Token ${sessionStorage.getItem('token')}`
          }

         delService(header,id).then(res=>{
            console.log(res.data);
            toast.success("Service Deleted")
            setAddServiceContext(res)
            navigate('/customer')

         }) 
    }

  return (
    <div>
        <Button className='btn btn-danger' onClick={delServiceData}>Delete</Button>
    </div>
  )
}

export default DeleteService