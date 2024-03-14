import React, { useEffect, useState } from 'react'
import UserNav from './UserNav'
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';

const UserProfile = () => {

    const cookie = new Cookies()
    const [user, setUser] = useState([]);
    const [getServices, setGetServices] = useState("");
    const [prevAppoints, setprevAppoints] = useState(null)
    const customerDB = cookie.get('user');

    useEffect(() => {
        // Fetch user details from session storage
        const userDB = cookie.get('user')
        if (userDB) {
         
        } else {
            // If user data is not found, redirect to login page
            window.location.href = '/';
        }

        const userData = sessionStorage.getItem('user');
        if (userData) {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
        }

        axios.post('http://localhost:8081/getAllAppoints',{"CID":userDB.id}).then(res=>{
            console.log(res.data);
            setGetServices(res.data);
            setprevAppoints("");
                 }).catch(err => {
            console.log(err);
            
                 })
    },[]);
  return (
    <>
<UserNav home="no" profile="active" about="no"/>
    
    <div className='container  d-flex m-auto  w-100 justify-content-center '>

<div className='p-5'>
    <img style={{borderRadius:'50%'}} src="https://www.shutterstock.com/image-vector/call-center-online-customer-support-600nw-2221786753.jpg" width={180} height={180} alt="" />
</div>
<div className='p-5'>
            {/* <h1>Welcome to the Home Page</h1> */}
            {user && (
                <div className='pt-2'>
                    <p className='text-Dark text-capitalize fs-1'>Service Provider Details:</p>
                    <p className='fs-6'><span className='fw-bold'>Company Name: </span>{user.company_name}</p>
                    <p className='fs-6'><span className='fw-bold'>Name: </span>{user.first_name}</p>
                    <p className='fs-6'><span className='fw-bold'>Email: </span>{user.email}</p>
                    <p className='fs-6'><span className='fw-bold'>Location: </span>{user.locations}</p>

                    <p className='fs-6'><span className='fw-bold'>Price: </span>{user.price}</p>
                    <p className='fs-6'><span className='fw-bold'>User Type: </span>{user.role}</p> 
                    <p className='fs-6'><span className='fw-bold'>Service Offered : </span > <span className='tint'>{user.services_offered}</span></p> 

                    {/* Add other user details as needed */}
                </div>
            )}
            </div>
        </div>
        <hr className='m-0 w-100' />
        <br />
        {/* <center className='m-0 p-0'>
            <h3>All your Appointment</h3>
        </center> */}

     <br /><br /><br /> 
    </>
  )
}

export default UserProfile