import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { addCustomer } from '../Api/allApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { addCustomerContextData } from '../contextApi/CustomerContext';
import { useContext } from 'react';



function AddCustomer() {

    const {setAddCustomerContext}=useContext(addCustomerContextData)

    const [getNewCustomer,setNewCustomer]=useState({
        customer_name:"",phone:"",vehicle_no:"",image:""
    })


    const navigate=useNavigate()

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    console.log(getNewCustomer);


    const formSubmit=(e)=>{
        e.preventDefault()
        const {customer_name,phone,vehicle_no,image}=getNewCustomer

        if(!customer_name || !phone || !vehicle_no || !image){
            toast.warning("invallid data")
        }
        else{
            const formData=new FormData()
            formData.append("customer_name",getNewCustomer.customer_name)
            formData.append("phone",getNewCustomer.phone)
            formData.append("vehicle_no",getNewCustomer.vehicle_no)
            formData.append("image",getNewCustomer.image)

            const header={"Content-type":"multipart/form-data",
                "Authorization":`token ${sessionStorage.getItem("token")}`
            }
            addCustomer(header,formData).then(res=>{
                console.log(res.data);
                toast.success("Customer Added")
                setNewCustomer({customer_name:"",phone:"",vehicle_no:"",image:""})
                // navigate('/customer')
                setAddCustomerContext(res)
                handleClose()
            })
        }
    }

    // const formCancel=()=>{
    //      setNewCustomer({customer_name:"",phone:"",vehicle_no:"",image:""})
    // }


  return (
    <div>
        <div className='mt-5'>
            <button className='btn btn-success' onClick={handleShow}>Add Customer</button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form action="">
                        <FloatingLabel controlId="floatingName" label="Customer Name" className="mb-3">
                            <Form.Control type="text" placeholder="" onChange={(e)=>(setNewCustomer({...getNewCustomer,customer_name:e.target.value}))}/>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPhone" label="Phone" className="mb-3">
                            <Form.Control type="number" placeholder="" onChange={(e)=>(setNewCustomer({...getNewCustomer,phone:e.target.value}))} />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingVehicleNo" label="Vehicle No" className="mb-3">
                            <Form.Control type="text" placeholder="" onChange={(e)=>(setNewCustomer({...getNewCustomer,vehicle_no:e.target.value}))} />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingImage" label="Image" className="mb-3">
                            <Form.Control type="file" placeholder="" onChange={(e)=>(setNewCustomer({...getNewCustomer,image:e.target.files[0]}))} />
                        </FloatingLabel>

                        {/* <div className='d-flex flex-column align-content-center'>
                            <button type='submit' className='btn btn-dark' onClick={(e)=>formSubmit(e)}>Submit</button>
                            <button type='button' className='btn btn-dark mt-2' onClick={formCancel} >Cancel</button>
                        </div> */}
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={(e)=>formSubmit(e)}>
                        Create
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

export default AddCustomer