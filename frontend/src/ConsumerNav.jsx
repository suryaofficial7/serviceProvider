import React from 'react'
import { Link } from 'react-router-dom'

const ConsumerNav = (props) => {
  return (
    <>  <nav className='navbar1'>
    <label for="check" class="checkbtn">
      <i class="fas fa-bars"></i>
    </label>
    <label class="logo">DesignX</label>
    <ul>
      <li><Link to="/home" class={props.home} >home</Link></li>
      <li><Link to="/profile" class={props.profile}>Profile</Link></li>
      <li><Link to="/aboutus" class={props.about}>About</Link></li>
      <li><Link to="/logout" >Logout</Link></li>
    </ul>
      </nav>
  <hr className='m-0 w-100' /></>
  )
}

export default ConsumerNav