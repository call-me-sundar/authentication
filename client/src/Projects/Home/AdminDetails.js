import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';

export default function AdminDetails() {
    const [details, setDetails] = useState([]);
    const [loader, setLoader] = useState(false);

    let username = localStorage.getItem('username');
    let getAdminDetails = async () =>{
        try{
            setLoader(true);
            let res = await axios.post('http://localhost:5000/getadmin',{
            username: username
        })
        setDetails(res.data)
        console.log(res.data);
        }catch(err){
            setLoader(false)
            alert(err)
        }finally{
            setLoader(false)
        }
    }
    useEffect(()=>{
        getAdminDetails();
    },[])
  return (
    <div>
        {loader && <Loader/>}
        <h1 className='m-3'>Admin Details</h1>
        {details?.map((val) => (
            <div className='m-0' key={val.id}>
                <table className='table table-striped m-0 d-block  rounded-3'>
                    <tr>
                        <td className='col-1'>Id</td>
                        <td className='col-1'>{val.id}</td>
                    </tr>
                    <tr>
                        <td className='col-1'>User Name</td>
                        <td className='col-1'>{val.username}</td>
                    </tr>
                    <tr>
                        <td className='col-1'>Password</td>
                        <td className='col-1'>{val.userpassword}</td>
                    </tr>
                </table>
            </div>
        ))}
    </div>
  )
}
