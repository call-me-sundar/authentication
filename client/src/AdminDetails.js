import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function AdminDetails() {
    const [details, setDetails] = useState([]);
    let username = localStorage.getItem('username');
    let getAdminDetails = async () =>{
        let res = await axios.post('http://localhost:5000/getadmin',{
            username: username
        })
        setDetails(res.data)
        console.log(res.data);
    }
    useEffect(()=>{
        getAdminDetails();
    },[])
  return (
    <div>
        <h1>New</h1>
        {details?.map((val) => (
            <p key={val.id}>{val.id}</p>
        ))}
    </div>
  )
}
