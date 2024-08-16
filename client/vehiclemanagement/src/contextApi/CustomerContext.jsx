import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'

export const addCustomerContextData=createContext()

export const addServiceContextData=createContext()
  

function CustomerContext({children}) {

    const [addCustContext,setAddCustomerContext]=useState("")

    const [addServiceContext,setAddServiceContext]=useState("")


  return (
    <div>
        <addCustomerContextData.Provider value={{addCustContext,setAddCustomerContext}}>
        <addServiceContextData.Provider value={{addServiceContext,setAddServiceContext}}>
                {children}
        </addServiceContextData.Provider>
        </addCustomerContextData.Provider>
    </div>
  )
}

export default CustomerContext