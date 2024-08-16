import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useEffect,useState } from 'react'
import { getCustomers } from '../Api/allApi'


function Home() {
    

    const [customerData,setCustomerData]=useState([])

   useEffect(()=>{
      getUser()
   },[])


   const getUser=()=>{

    const header={
      "Content-type":"application/json",
      "Authorization":`Token ${sessionStorage.getItem('token')}`
    }

    getCustomers(header).then(res=>{
      console.log(res.data);
      const customers=res.data
       

      const current_date=new Date()
      const date=current_date.getUTCDate()
      const month=current_date.getUTCMonth()+1
      const year=current_date.getUTCFullYear()

      const curr_date=date.toString().padStart(2,0)
      const curr_month=month.toString().padStart(2,0)
      const day=`${year}-${curr_month}-${curr_date}`
      console.log(day);


      const cust=customers.filter((item)=>item.date==day)
      console.log(cust);
      setCustomerData(cust)

    })
   }


  return (
    
    <div>
        <Header/>
        <div className='text-center container mb-4'>
        <h4 className='mt-4'>Today's Chart</h4>
          <table className='table table-bordered table-striped'>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Phone</th>
                <th>Vehicle No</th>
              </tr>
            </thead>
            <tbody>
              {
                customerData.length > 0 ?
                  customerData.map(item=>(
                    <tr>
                      <td>{item.customer_name}</td>
                      <td>{item.phone}</td>
                      <td>{item.vehicle_no}</td>
                    </tr>
                ))
             

              : <h4>No Customers </h4>

              }
            </tbody>
          </table>
        </div>
        
        <Footer/>
    </div>
  )
}

export default Home