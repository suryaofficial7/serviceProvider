import React, { useEffect, useState } from 'react'
import UserNav from './UserNav'
import axios from 'axios';
import { Cookies } from 'react-cookie';

const Dashboard = () => {

    const cookie = new Cookies()
    const [user, setUser] = useState(null);
    const [getServices, setGetServices] = useState("");
    const [prevAppoints, setprevAppoints] = useState(null)
    const customerDB = cookie.get('customer');

    useEffect(() => {
        // Fetch user details from session storage
        const userDB = cookie.get('user')
        if (userDB) {
         
        } else {
            // If user data is not found, redirect to login page
            window.location.href = '/';
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
<UserNav home="active" profile="no" about="no"/>
    
    </>
  )
}

export default Dashboard