import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Auth from './Auth'

const Aboutus = () => {
    const consumerData = sessionStorage.getItem('consumer');
    const userData = sessionStorage.getItem('user');

    if (userData) {
        const parsedUser = JSON.parse(userData);
        // setUser(parsedUser);
    
    }
        
  
  return (
    <>
    {
 consumerData && (
<nav className='navbar1'>
      <label for="check" class="checkbtn">
        <i class="fas fa-bars"></i>
      </label>
      <label class="logo">DesignX</label>
      <ul>
        <li><Link to="/home"  >Home</Link></li>
        <li><Link to="/profile" >Profile</Link></li>
        <li><Link to="/aboutus" class="active">About</Link></li>
        <li><Link to="/logout">Logout</Link></li>
      </ul>
    </nav>
)

    }
      
      {
userData && (
<nav className='navbar1'>
      <label for="check" class="checkbtn">
        <i class="fas fa-bars"></i>
      </label>
      <label class="logo">DesignX</label>
      <ul>
        <li><Link to="/dashboard"  >Dashboard</Link></li>
        <li><Link to="/profile" >Profile</Link></li>
        <li><Link to="/aboutus" class="active">About</Link></li>
        <li><Link to="/logout">Logout</Link></li>
      </ul>
    </nav>
)

    }
     <hr className='m-0 w-100' />

    <div className='container'>
    <div class="container mt-5">
        <section id="about">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <h2 class="section-heading text-uppercase">About Us</h2>
                    <p class="text-muted">Your service management partner for efficiency and reliability.</p>
                </div>
            </div>

            <div class="row ">
                <div class="col-lg-12" style={{textAlign:'justify'}}>
                    <br />
                    <p>At Service Management Solutions, we are dedicated to providing top-notch service management
                        solutions tailored to meet the unique needs of your business. Our team of experts is committed
                        to ensuring the efficiency and reliability of your services, allowing you to focus on what you
                        do best – running your business.</p>
                    <p>With years of experience in the industry, we understand the challenges you face in service
                        management. Whether it's optimizing workflows, improving customer satisfaction, or enhancing
                        overall service delivery, we have the expertise to make a positive impact on your operations.</p>
                    <p>Our mission is to empower businesses with cutting-edge service management tools and strategies.
                        We believe in building long-term partnerships with our clients, providing ongoing support and
                        guidance to help them succeed in today's competitive landscape.</p>
                </div>
            </div>
        </section>
        <center >@ All Reserved to Developer!</center>
    </div>
    </div>

    </>
  )
}

export default Aboutus