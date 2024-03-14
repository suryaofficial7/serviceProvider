import React, { useEffect, useState } from 'react'
import UserNav from './UserNav'
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';

const Dashboard = () => {

    const cookie = new Cookies()
    const [user, setUser] = useState(null);
const [view, setview] = useState([])
    useEffect(() => {
        // Fetch user details from session storage
        const userDB = cookie.get('user')
        if (userDB) {
         
        } else {
            // If user data is not found, redirect to login page
            window.location.href = '/';
        }

        axios.post('http://localhost:8081/viewAppoints',{"userID":userDB.id}).then(res=>{
            console.log(res.data);
            setview(res.data);
                 }).catch(err => {
            console.log(err);
            setview(null);
            
                 })
    },[]);

  return (
    <>
<UserNav home="active" profile="no" about="no"/>
    
<table className="table w-50 m-auto text-center">
  
        <br />

{view ==null ?  <p className='fs-4 text-primary-emphasis'>No Appointments !</p> :   view.map(item =>(
      <tr key={item.id}>
      <th style={{textAlign:'left',width:'20px',paddingLeft:'10px'}} scope="row">{item.useremail}</th>
      <td style={{textAlign:'left'}}>{item.first_name}</td>
      <td style={{textAlign:'left'}}>{item.role}</td>
      <td style={{textAlign:'center'}}><span className='tint'>{item.services_offered}</span></td>
      <td style={{textAlign:'center'}}><Link to={`/deleteAppoint/${item.AppointmentID}`} className='btn btn-danger'>Reject</Link></td>

    </tr>
    
))}
    
        {/*
  <thead>
    <tr>
      <th scope="col">Sr.no</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Service</th>
      <th scope="col">Action</th>

    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Surya</td>
      <td>Suryaskofficiail7@gmail.com</td>
      <td>Drawing Artist</td>
      <td><button className='btn btn-primary'>Appoint</button></td>

    </tr>
 
  </tbody>
*/}
</table> 

    </>
  )
}

export default Dashboard