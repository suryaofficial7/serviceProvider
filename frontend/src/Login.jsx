import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import Auth from './Auth';
import { Cookies, CookiesProvider, useCookies } from 'react-cookie'


function Login() {

    const cookies = new Cookies();
// cookies.set('myCat', 'Pacman', { path: '/' });
// console.log(cookies.get('myCat')); // Pacman

    const [values, setValues] = useState({
        userType: '', // Added user type state
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [mess, setMess] = useState("");


    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value}));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validate(values);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            axios.post('http://localhost:8081/login', values)
              .then(res => {
                if (res.data.error) {
                    console.log(res.data.error);
                    setMess("No User Found !!!")
                } else {
                    // alert("hi");
                    setMess("No User Found !!!")
                    if(res.data.user.role=="consumer"){

cookies.set('customer',JSON.stringify(res.data.user), { path: '/' });


                        sessionStorage.setItem('consumer', JSON.stringify(res.data.user));
                        navigate(`/home`);
                    }
                    else if(res.data.user.role=="service-provider"){
                        sessionStorage.setItem('user', JSON.stringify(res.data.user));

                        cookies.set('user',JSON.stringify(res.data.user), { path: '/' });

                        navigate(`/dashboard`);

                    }
                    else{
                        navigate(`/error`);

                    }
                }
              })
              .catch(err =>  setMess("No User Found !!!")); 
        } else {
            console.log('Login Form has errors:', validationErrors);
        }
    };

    const validate = (values) => {
        let errors = {};

        if (!values.userType) {
            errors.userType = 'User type is required';
        }

        if (!values.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = 'Email is invalid';
        }

        if (!values.password) {
            errors.password = 'Password is required';
        }

        return errors;
    };

    return (
          <div className='d-flex justify-content-center align-items-center gradient-bg' style={{ height: '100vh' }}>
            <div className='bg-white p-5 rounded w-50'>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label htmlFor='userType' className='form-label'>User Type:</label>
                        <select className='form-select' onChange={handleInput} name='userType' id='userType' value={values.userType}>
                            <option value=''>Select User Type</option>
                            <option value='consumer'>Consumer</option>
                            <option value='serviceProvider'>Service Provider</option>
                        </select>
                        {errors.userType && <div className="text-danger">{errors.userType}</div>}
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='email' className='form-label'>Email:</label>
                        <input type='email' className='form-control' onChange={handleInput} name='email' id='email' placeholder='Enter Email' />
                        {errors.email && <div className="text-danger">{errors.email}</div>}
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='password' className='form-label'>Password:</label>
                        <input type='password' className='form-control' onChange={handleInput} name='password' id='password' placeholder='Enter Password' />
                        {errors.password && <div className="text-danger">{errors.password}</div>}
                    </div>
                    <button type='submit' className='btn btn-success btn-lg'>Login</button>
                    <br />
                    <span className='text-danger fw-bold'>{mess}</span>
                    <p className="mt-4 upscale-text">Don't Have an Account! <Link to='/signup' className='text-decoration-none'><span>Create Account</span></Link></p>
                </form>
            </div>
        </div>
    );
}

export default Login;
