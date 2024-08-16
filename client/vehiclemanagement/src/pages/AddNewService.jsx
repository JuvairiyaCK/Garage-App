import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { addCustomerService } from '../Api/allApi';
import { toast } from 'react-toastify';
import { addServiceContextData } from '../contextApi/CustomerContext';
import { useContext } from 'react';


function AddNewService({id}) {
    console.log(id);
  const [getNewService,setNewService]=useState({
    title:"",description:"",price:""
})

const {setAddServiceContext}=useContext(addServiceContextData)

const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);


console.log(getNewService);


const getService=(e)=>{
        e.preventDefault()

        const {title,description,price}=getNewService
        if(!title || !description || !price){
            toast.warning("invallid data")
        }
        else{

            const header={"Content-type":"application/json",
                "Authorization":`token ${sessionStorage.getItem("token")}`
            }

            addCustomerService(header,id,{title,description,price}).then(res=>{
                console.log(res.data);
                toast.success("Service added")
                setNewService({ title:"",description:"",price:""})
                setAddServiceContext(res)
                 handleClose()
            })
            
        }
}

return (
<div>
    <div className='mt-5'>
        <button className='btn btn-success' onClick={handleShow}>Add Service</button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Service</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form action="">
                    <FloatingLabel controlId="floatingTitle" label="Title" className="mb-3">
                        <Form.Control type="text" placeholder="" onChange={(e)=>(setNewService({...getNewService,title:e.target.value}))} />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingDescription" label="Description" className="mb-3">
                        <Form.Control type="text" placeholder="" onChange={(e)=>(setNewService({...getNewService,description:e.target.value}))} />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPrice" label="Price" className="mb-3" >
                        <Form.Control type="number" placeholder="" onChange={(e)=>(setNewService({...getNewService,price:e.target.value}))} />
                    </FloatingLabel>

                    {/* <div className='d-flex flex-column align-content-center'>
                        <button type='submit' className='btn btn-dark'>Submit</button>
                        <button type='button' className='btn btn-dark mt-2'>Cancel</button>
                    </div> */}
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={(e)=>getService(e)}>
                    Submit
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>

    </div>
</div>
)
}

export default AddNewService