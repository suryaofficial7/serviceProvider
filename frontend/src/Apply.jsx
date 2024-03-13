import axios from "axios";
import React, { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const Apply = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [consumer, setConsumer] = useState("");
  const cookies = new Cookies();

  useEffect(() => {
    // Fetch user details from session storage
    const consumerData = sessionStorage.getItem("consumer");
      const customerDB = cookies.get('customer');
    if (consumerData) {
      const parsedUser = JSON.parse(consumerData);
      setConsumer(parsedUser);
      console.log(consumer);
    } else {
      //! If user data is not found, redirect to login page
      window.location.href = "/";
    }

    axios.post("http://localhost:8081/apply", { "userID": id,"customerID":customerDB.id })
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.success);
          alert("Appointed");
            navigate(`/home`);

          //   console.log("No User Found !!!")
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <div>{id}</div>;
};

export default Apply;
