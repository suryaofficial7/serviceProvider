import React from 'react'
import Login from './Login'
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './SignUp'
import Home from './Home'
import Profile from './Profile'
import Aboutus from './Aboutus'
import Logout from './Logout'
import NotFoundPage from './NotFoundPage'
import Apply from './Apply'
import Delete from './Delete'
import Dashboard from './Dashboard'
import UserProfile from './UserProfile'
import Deleteappoints from './Deleteappoints'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/signup' element={<SignUp/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>
      <Route path='/aboutus' element={<Aboutus/>}></Route>
      <Route path='/logout' element={<Logout/>}></Route>
      <Route path='/apply/:id' element={<Apply/>}></Route>
      <Route path='/delete/:id' element={<Delete/>}></Route>
      <Route path='/deleteAppoint/:id' element={<Deleteappoints/>}></Route>

      <Route path='/dashboard' element={<Dashboard/>}></Route>
      <Route path='/userprofile' element={<UserProfile/>}></Route>


      <Route path='*' element={<NotFoundPage/>}></Route>




    </Routes>
    </BrowserRouter>
  )
}

export default App
