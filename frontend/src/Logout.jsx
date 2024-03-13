import React, { useEffect, useState } from 'react'
import { Cookies } from 'react-cookie';
import { Container, Button } from 'react-bootstrap';
// import { useSprin, animated } from 'react-spring';

const Logout = () => {
const cookie = new Cookies()
    useEffect(() => {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('consumer');
cookie.remove('customer');

setTimeout(() => {
  window.location.href = '/';

}, 1000);
   
    }, [])

    const [fadeOut, setFadeOut] = useState(false);

 
  
    const handleLogout = () => {
      setFadeOut(true);
      // Perform your logout logic here, such as clearing session data
      setTimeout(() => {
        // Redirect the user to the login page after the animation completes
        // For demo purposes, we'll just log a message
        console.log('User logged out');
      }, 500); // Wait for the animation duration
    };
    

  return (
    <div> <Container className="d-flex justify-content-center align-items-center vh-100">
    <div >
      <div className="text-center">
        <h1>Logging Out....</h1>
    <img src="https://i.pinimg.com/originals/fa/6d/c1/fa6dc135745b95f5cb9125669f638349.gif" alt="" />
      </div>
    </div>
  </Container></div>
  )
}

export default Logout