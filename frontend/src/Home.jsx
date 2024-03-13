import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import ConsumerNav from './ConsumerNav';

function Home() {

  const cookies = new Cookies();

    const [searchdata, setSearchDAta] = useState([]);
    const [user, setUser] = useState("");
const [results, setresults] = useState("");
    const [searchTerm, setSearchTerm] = useState('');

    
    useEffect(() => {
      const customerDB = cookies.get('customer');
        // Fetch user details from session storage
        const userData = sessionStorage.getItem('consumer');
        if (userData) {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
            console.log("---");
        } else {
            //! If user data is not found, redirect to login page
            window.location.href = '/';
        }
    },[]);

    useEffect(() => {
     axios.post('http://localhost:8081/getServices',{"val":searchTerm}).then(res=>{
// console.log(res.data);
setresults("");
setSearchDAta(res.data);
     }).catch(err => {
console.log();
setresults(null);

     })
        // alert("H");
    }, [searchTerm]);

   
    return (
        <>
   <ConsumerNav home="active" propfile="no" about="no"/>

        <div className=" p-5 w-100 m-auto">
        <div className="search-bar">
      <input className='inputs '
        type="text"
        placeholder="Search Services..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
    <table className="table w-50 m-auto text-center">
        <br />

{results ==null ?  <p className='fs-4 text-primary-emphasis'>No services Found !</p> : searchdata.map(item =>(
      <tr key={item.id}>
      <th style={{textAlign:'left',width:'20px',paddingLeft:'10px'}} scope="row">{item.email}</th>
      <td style={{textAlign:'left'}}>{item.first_name}</td>
      <td style={{textAlign:'left'}}>{item.locations}</td>
      <td style={{textAlign:'center'}}><span className='tint'>{item.services_offered}</span></td>
      <td style={{textAlign:'center'}}><Link to={`/apply/${item.id}`} className='btn btn-primary'>Appoint</Link></td>

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
        </div>
        </>
    );
}

export default Home;
