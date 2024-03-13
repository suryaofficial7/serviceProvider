import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const [values, setValues] = useState({
    firstName: '',
    email: '',
    password: '',
    role: '',
    needsService: '',
    servicesOffered: '',
    locations: '',
    price: '',
    companyName: '',
    experience: ''
  });

  const navigate  = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleRoleChange = (e) => {
    setValues({ ...values, role: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Form is valid, you can submit it
      axios.post('http://localhost:8081/signup', values)
        .then(res => {
          alert("You are Successfully Registerd !");
          navigate('/')
        })
        .catch(err => console.log(err.response.data.error)); // Handle errors properly
      console.log('Form submitted:', values);
    } else {
      console.log('Form has errors:', validationErrors);
    }
  };

  const validate = (values) => {
    let errors = {};

    // Validate required fields
    if (!values.firstName.trim()) {
      errors.firstName = 'First Name is required';
    }
    if (!values.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email is invalid';
    }
    if (!values.password.trim()) {
      errors.password = 'Password is required';
    }

    // Validate role-specific fields
    if (values.role === 'consumer' && !values.needsService.trim()) {
      errors.needsService = 'Needs Service is required';
    }
    if (values.role === 'service-provider') {
      if (!values.servicesOffered.trim()) {
        errors.servicesOffered = 'Services Offered is required';
      }
      if (!values.locations.trim()) {
        errors.locations = 'Locations of Service is required';
      }
      if (!values.price.trim()) {
        errors.price = 'Price of Service is required';
      }
      if (!values.companyName.trim()) {
        errors.companyName = 'Company Name is required';
      }
      if (!values.experience.trim()) {
        errors.experience = 'Experience is required';
      }
    }

    return errors;
  };

  return (
    <div className='d-flex justify-content-center align-items-center gradient-bg' style={{ minHeight: '100vh' }}>
      <div className='bg-white p-5 rounded w-50'>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='firstname' className='form-label'>First Name:</label>
            <input type='text' className='form-control' id='firstname' name='firstName' value={values.firstName} onChange={handleInputChange} placeholder='Enter First Name' />
            {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
          </div>
          <div className='mb-4'>
            <label htmlFor='email' className='form-label'>Email:</label>
            <input type='email' className='form-control' id='email' name='email' value={values.email} onChange={handleInputChange} placeholder='Enter Email' />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>
          <div className='mb-4'>
            <label htmlFor='password' className='form-label'>Password:</label>
            <input type='password' className='form-control' id='password' name='password' value={values.password} onChange={handleInputChange} placeholder='Enter Password' />
            {errors.password && <div className="text-danger">{errors.password}</div>}
          </div>
          <div className='mb-4'>
            <label htmlFor='role' className='form-label' required >Role:</label>
            <select className='form-select' id='role' onChange={handleRoleChange} value={values.role} name='role'>
              <option value=''>Select Role</option>
              <option value='consumer'>Consumer</option>
              <option value='service-provider'>Service Provider</option>
            </select>
          </div>
          {values.role === 'consumer' && (
            <div className='mb-4'>
              <label htmlFor='needsService' className='form-label'>Needs Service:</label>
              <input type='text' className='form-control' id='needsService' name='needsService' value={values.needsService} onChange={handleInputChange} placeholder='Enter Service Needed' />
              {errors.needsService && <div className="text-danger">{errors.needsService}</div>}
            </div>
          )}
          {values.role === 'service-provider' && (
            <div>
              <div className='mb-4'>
                <label htmlFor='servicesOffered' className='form-label'>Services Offered:</label>
                <input type='text' className='form-control' id='servicesOffered' name='servicesOffered' value={values.servicesOffered} onChange={handleInputChange} placeholder='Enter Services Offered' />
                {errors.servicesOffered && <div className="text-danger">{errors.servicesOffered}</div>}
              </div>
              <div className='mb-4'>
                <label htmlFor='locations' className='form-label'>Locations of Service:</label>
                <input type='text' className='form-control' id='locations' name='locations' value={values.locations} onChange={handleInputChange} placeholder='Enter Locations of Service' />
                {errors.locations && <div className="text-danger">{errors.locations}</div>}
              </div>
              <div className='mb-4'>
                <label htmlFor='price' className='form-label'>Price of Service:</label>
                <input type='text' className='form-control' id='price' name='price' value={values.price} onChange={handleInputChange} placeholder='Enter Price of Service' />
                {errors.price && <div className="text-danger">{errors.price}</div>}
              </div>
              <div className='mb-4'>
                <label htmlFor='companyName' className='form-label'>Company Name:</label>
                <input type='text' className='form-control' id='companyName' name='companyName' value={values.companyName} onChange={handleInputChange} placeholder='Enter Company Name' />
                {errors.companyName && <div className="text-danger">{errors.companyName}</div>}
              </div>
              <div className='mb-4'>
                <label htmlFor='experience' className='form-label'>Experience (Years):</label>
                <input type='number' className='form-control' id='experience' name='experience' value={values.experience} onChange={handleInputChange} placeholder='Enter Years of Experience' />
                {errors.experience && <div className="text-danger">{errors.experience}</div>}
              </div>
            </div>
          )}
          <button type='submit' className='btn btn-success btn-lg'>Sign Up</button>
          <p className="mt-4 upscale-text">All Ready Have an Account! <Link to='/' className='text-decoration-none'><span>Login</span></Link></p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
