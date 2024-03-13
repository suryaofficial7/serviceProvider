import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

const Delete = () => {

    
    const {id} = useParams()
    const navigate = useNavigate();
    const [consumer, setConsumer] = useState("");

    
    useEffect(() => {
        // Fetch user details from session storage
        const consumerData = sessionStorage.getItem('consumer');

        if (consumerData) {
            const parsedUser = JSON.parse(consumerData);
            setConsumer(parsedUser);

        } else {
            //! If user data is not found, redirect to login page
            window.location.href = '/';
        }

        axios.post('http://localhost:8081/delete',{"id":id})
        .then(res => {
          if (res.data.success) {
              console.log(res.data.success);
              alert("Deleted")
              navigate(`/profile`);
              
              
            //   console.log("No User Found !!!")
          }
            
        })
        .catch(err =>  {console.log(err)}); 
    },[]);
  return (
    <div></div>
  )
}

export default Delete