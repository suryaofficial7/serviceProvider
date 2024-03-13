import React, { useEffect, useState } from 'react'

const Auth = () => {

    const [user, setUser] = useState("");

    useEffect(() => {
        // Fetch user details from session storage
        const userData = sessionStorage.getItem('user');

        if (userData) {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
            console.log("---");
        } else {
            //! If user data is not found, redirect to login page
            window.location.href = '/';
        }
    },[]);
  return (
    <></>
  )
}

export default Auth