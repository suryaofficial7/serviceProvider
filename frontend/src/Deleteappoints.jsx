import axios from 'axios';
import React, { useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const Deleteappoints = () => {
    const {id} = useParams()
    const navigate = useNavigate();


    useEffect(() => {
        // const [first, setfirst] = useState(second)
        // Fetch user details from session storage
        const consumerData = sessionStorage.getItem('consumer');
        const userData = sessionStorage.getItem('user');


        if (consumerData || userData) {
            const parsedUser = JSON.parse(consumerData);
            // setConsumer(parsedUser);

        } else {
            //! If user data is not found, redirect to login page
            window.location.href = '/';
        }
        

        axios.post('http://localhost:8081/delete',{"id":id})
        .then(res => {
          if (res.data.success) {
              console.log(res.data.success);
              alert("Deleted")
              navigate(`/dashboard`);


              
              
            //   console.log("No User Found !!!")
          }
            
        })
        .catch(err =>  {console.log(err)}); 
    },[]);
  return (
    <div>Deleteappoints</div>
  )
}

export default Deleteappoints