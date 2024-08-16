import commonApi from "./commonApi";


export const getCustomers=(header)=>{
    return commonApi(header,"GET","http://127.0.0.1:8000/customer/","")
}


export const getCustomerDetail=(header,id)=>{
    return commonApi(header,"GET",`http://127.0.0.1:8000/customer/${id}/`,"")
}

export const addCustomer=(header,data)=>{
    return commonApi(header,"POST","http://127.0.0.1:8000/customer/",data)
}


export const addCustomerService=(header,id,data)=>{
    return commonApi(header,"POST",`http://127.0.0.1:8000/customer/${id}/add_services/`,data)
}


export const delCustomer=(header,id)=>{
    return commonApi(header,"DELETE",`http://127.0.0.1:8000/customer/${id}/`,"")
}

export const delService=(header,id)=>{
    return commonApi(header,"DELETE",`http://127.0.0.1:8000/service/${id}/`,"")
}


export const userRegister=(data)=>{
    return commonApi("","POST","http://127.0.0.1:8000/register/",data)
}

export const tokenGenerate=(data)=>{
    return commonApi("","POST","http://127.0.0.1:8000/token",data)
}

export const EditCustomer=(header,id,data)=>{
    return commonApi(header,"PUT",`http://127.0.0.1:8000/customer/${id}/`,data)
}

export const EditServiceData=(header,id,data)=>{
    return commonApi(header,"PUT",`http://127.0.0.1:8000/service/${id}/`,data)
}

export const GetServiceDetail=(header,id)=>{
    return commonApi(header,"GET",`http://127.0.0.1:8000/service/${id}/`,"")
}