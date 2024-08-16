import React from 'react'
import { Button } from 'react-bootstrap'
import { EditCustomer, getCustomerDetail } from '../Api/allApi'
import { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { addCustomerContextData } from '../contextApi/CustomerContext';
import { useContext } from 'react';


function EditCust({id}) {

    const {setAddCustomerContext}=useContext(addCustomerContextData)

    const [newCustData,setNewCustData]=useState(
        {id:"",customer_name:"",phone:"",vehicle_no:"",image: null,imagePreview: null}
    )

    // const {id}=useParams()
    console.log(id);
    

    useEffect(()=>{
        getCust()
    },[])

    const getCust=()=>{
        const header={"Content-type":"application/json",
            "Authorization":`token ${sessionStorage.getItem("token")}`
        }
        getCustomerDetail(header,id).then(res=>{
            console.log(res.data);
            setNewCustData({id:res.data.id,customer_name:res.data.customer_name,phone:res.data.phone,vehicle_no:res.data.vehicle_no,image:null,imagePreview: res.data.image})          
        })

    }

    const updateCust=(e)=>{
        e.preventDefault()
        
        const {customer_name,phone,vehicle_no,image}=newCustData

        if(!customer_name || !phone || !vehicle_no ){
            toast.warning("invallid data")
        }
        else{
            const formData=new FormData()
            formData.append("customer_name",newCustData.customer_name)
            formData.append("phone",newCustData.phone)
            formData.append("vehicle_no",newCustData.vehicle_no)
            if (image) {
            formData.append("image",newCustData.image)
            }
            const header={"Content-type":"multipart/form-data",
                "Authorization":`token ${sessionStorage.getItem("token")}`
            }
            EditCustomer(header,id,formData).then(res=>{
                console.log(res.data);
                toast.success("Customer Updated")
                setAddCustomerContext(res)
                handleClose()
            })
        }
    }


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewCustData({
                ...newCustData,
                image: file, // Set the new image file
                imagePreview: URL.createObjectURL(file) // Update preview with new image
            });
        }
    };


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <div>
    <div>
        <Button className='btn btn-success mx-1' onClick={handleShow}>Edit</Button>
    </div>
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
        <Modal.Title>Edit Customer</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <form action="">
            <FloatingLabel controlId="floatingName" label="Customer Name" className="mb-3">
                <Form.Control type="text" placeholder="" value={newCustData.customer_name} onChange={(e)=>(setNewCustData({...newCustData,customer_name:e.target.value}))}/>
            </FloatingLabel>
            <FloatingLabel controlId="floatingPhone" label="Phone" className="mb-3">
                <Form.Control type="number" placeholder="" value={newCustData.phone} onChange={(e)=>(setNewCustData({...newCustData,phone:e.target.value}))} />
            </FloatingLabel>
            <FloatingLabel controlId="floatingVehicleNo" label="Vehicle No" className="mb-3">
                <Form.Control type="text" placeholder="" value={newCustData.vehicle_no} onChange={(e)=>(setNewCustData({...newCustData,vehicle_no:e.target.value}))} />
            </FloatingLabel>
            <FloatingLabel controlId="floatingImage" label="Image" className="mb-3">
                <Form.Control type="file" placeholder=""  onChange={handleImageChange} />
                {newCustData.imagePreview && (
                                <div className="mt-3">
                                    <p>Current Image:</p>
                                    <img src={newCustData.imagePreview} alt="Current" style={{ width: '100%', maxHeight: '200px' }} />
                                </div>
                            )}
            </FloatingLabel>

            {/* <div className='d-flex flex-column align-content-center'>
                <button type='submit' className='btn btn-dark' onClick={(e)=>formSubmit(e)}>Submit</button>
                <button type='button' className='btn btn-dark mt-2' onClick={formCancel} >Cancel</button>
            </div> */}
        </form>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="primary" onClick={(e)=>{updateCust(e)}}>
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

export default EditCust