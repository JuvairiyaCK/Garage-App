import React from 'react'
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { EditServiceData, GetServiceDetail } from '../Api/allApi';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { addServiceContextData } from '../contextApi/CustomerContext';
import { useContext } from 'react';


function EditService({id}) {

    const {setAddServiceContext}=useContext(addServiceContextData)


    const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const [newServiceData,setNewServiceData]=useState(
    {id:"",title:"",description:"",price:""}
)

useEffect(()=>{
    getService()
},[])

const getService=()=>{
    const header={"Content-type":"application/json",
        "Authorization":`token ${sessionStorage.getItem("token")}`
    }
    GetServiceDetail(header,id).then(res=>{
        console.log(res.data);
        setNewServiceData({id:res.data.id,title:res.data.title,description:res.data.description,price:res.data.price})
        
    })
}

 const updateService=(e)=>{
    e.preventDefault()
    const {title,description,price}=newServiceData

    if(!title || !description || !price){
        toast.warning("invallid data")
    }
    else{
        const header={"Content-type":"application/json",
            "Authorization":`token ${sessionStorage.getItem("token")}`
        }
        EditServiceData(header,id,{title,description,price}).then(res=>{
                console.log(res.data);
               toast.success(" Service Updateted") 
               setAddServiceContext(res)
               handleClose()
        })
    }
 }


  return (
    <div>
    <div>
        <Button className='btn btn-success' onClick={handleShow}>Edit</Button>
    </div>
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
        <Modal.Title>Add Service</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <form action="">
            <FloatingLabel controlId="floatingTitle" label="Title" className="mb-3">
                <Form.Control type="text" placeholder="" value={newServiceData.title} onChange={(e)=>(setNewServiceData({...newServiceData,title:e.target.value}))} />
            </FloatingLabel>
            <FloatingLabel controlId="floatingDescription" label="Description" className="mb-3">
                <Form.Control type="text" placeholder="" value={newServiceData.description} onChange={(e)=>(setNewServiceData({...newServiceData,description:e.target.value}))} />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPrice" label="Price" className="mb-3" >
                <Form.Control type="number" placeholder="" value={newServiceData.price} onChange={(e)=>(setNewServiceData({...newServiceData,price:e.target.value}))} />
            </FloatingLabel>

            {/* <div className='d-flex flex-column align-content-center'>
                <button type='submit' className='btn btn-dark'>Submit</button>
                <button type='button' className='btn btn-dark mt-2'>Cancel</button>
            </div> */}
        </form>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="primary" onClick={(e)=>{updateService(e)}}>
           Update
        </Button>
        <Button variant="secondary" onClick={handleClose}>
            Close
        </Button>
    </Modal.Footer>
</Modal>

</div>
  )
}

export default EditService