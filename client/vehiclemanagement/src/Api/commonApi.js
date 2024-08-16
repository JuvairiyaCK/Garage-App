import axios from 'axios'
import Header from '../components/Header'



const commonApi=(reqheader,reqmethod,requrl,reqbody)=>{
    const config={
        method:reqmethod,
        url:requrl,
        data:reqbody,
        headers:reqheader?reqheader:{"Content-Type":"application/json"}
    }
    return axios(config)
}

export default commonApi