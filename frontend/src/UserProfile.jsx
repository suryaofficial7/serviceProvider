import React, { useEffect, useState } from 'react'
import UserNav from './UserNav'
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';

const UserProfile = () => {

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
    
    <div className='container  d-flex m-auto  w-100 justify-content-center '>

<div className='p-5'>
    <img style={{borderRadius:'40%'}} src="https://as2.ftcdn.net/v2/jpg/05/42/36/37/1000_F_542363724_DNvkX4zxgpVvtfXu5Dgq0xkMV2MaKLmG.jpg" width={230} alt="" />
</div>
<div className='p-5'>
            {/* <h1>Welcome to the Home Page</h1> */}
            {user && (
                <div className='pt-2'>
                    <p className='text-Dark text-capitalize fs-1'>User Details:</p>
                    <p className='fs-6'><span className='fw-bold'>Name: </span>{user.first_name}</p>
                    <p className='fs-6'><span className='fw-bold'>Email: </span>{user.email}</p>
                    <p className='fs-6'><span className='fw-bold'>User Type: </span>{user.role}</p> 
                    <p className='fs-6'><span className='fw-bold'>Account Created on : </span>{Date(user.created_at)}</p> 

                    {/* Add other user details as needed */}
                </div>
            )}
            </div>
        </div>
        <hr className='m-0 w-100' />
        <br />
        <center className='m-0 p-0'>
            <h3>All your Appointment</h3>
        </center>

<div className="p-1 w-100 m-auto">
<table className="table w-50 m-auto text-center">
<thead>
<tr>
<th scope="col">Provider Name</th>
<th scope="col">Email</th>
<th scope="col">Service</th>
<th scope="col">Location</th>
<th scope="col">Amount</th>

<th scope="col">Date</th>

<th scope="col">Action</th>

</tr>
</thead>
<tbody>

    {
        prevAppoints == null ? <th colSpan={7}><p className='fs-5 text-danger fst-fst-normal text-center'>No Appointments Found !</p></th> :

getServices.map(item =>(
    <tr key={item.AppointmentID}>
    <td>{item.first_name}</td>
    <td>{item.email}</td>
    <td><span className='tint'>{item.service}</span></td>
    <td>{item.locations}</td>
    <td>{`₹`+item.price}</td>


    <td>{item.dates}</td>

    <td><Link to={`/delete/${item.AppointmentID}`} className='btn btn-danger'>Delete</Link></td>

    
    </tr>
))
        
    }
{/* <tr>
<th scope="row">1</th>
<td>Surya</td>
<td>Suryaskofficiail7@gmail.com</td>
<td>Drawing Artist</td>
<td><button className='btn btn-danger'>Delete</button></td>

</tr> */}

</tbody>
</table>
</div>
     <br /><br /><br /> 
    </>
  )
}

export default UserProfile