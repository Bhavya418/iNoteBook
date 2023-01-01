import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credentials,setCredentials]=useState({email : "",password : ""}) 
  let Navigate= useNavigate();
  const handleSubmit= async(e)=>{
    e.preventDefault(); 
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM3OGFiOGE0Njc2ODcyYTMwZTZmOTdiIn0sImlhdCI6MTY2ODg2MjcwMn0.ilz-WQB5ZgG3026z_V2bB2_tH6AFjc7Mao32loouDtA",
      },
      body: JSON.stringify({email: credentials.email,password: credentials.password }),
    
    });
    const json = await response.json();
    console.log(json)
    if(json.success){
      localStorage.setItem('token',json.authToken)
      props.showAlert("Logged In successfully","success");
      Navigate("/");
    }
    else{
      
      props.showAlert("Invalid Credentials","danger");
    }

  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3">
      <h2>Login to iNoteBook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={credentials.password}
            name="password"
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login 
        </button>
      </form>
    </div>
  );
};

export default Login;
