import React ,{useState}from "react";
import { useNavigate } from "react-router-dom";
const SignUp = (props) => {
  const [credentials,setCredentials]=useState({name:"",email : "",password : "",cpassword : ""}) 
  let Navigate= useNavigate();
  const handleSubmit= async(e)=>{
    e.preventDefault(); 
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM3OGFiOGE0Njc2ODcyYTMwZTZmOTdiIn0sImlhdCI6MTY2ODg2MjcwMn0.ilz-WQB5ZgG3026z_V2bB2_tH6AFjc7Mao32loouDtA",
      },
      body: JSON.stringify({name: credentials.name,email: credentials.email,password: credentials.password}),
    
    });
    const json = await response.json();
    console.log(json)
    if(json.success){
      localStorage.setItem('token',json.authtoken)
      Navigate("/");
      props.showAlert("Account created successfully","success");
    }
    else{
      props.showAlert("Invalid Details","danger");
      
    }

  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3">
      <h2 >Sign Up  to iNoteBook</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Name
          </label>
          <input
            type="name"
            className="form-control"
            id="name"
            value={credentials.name}
            name="name"
            onChange={onChange}
            
          />
        </div>
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
            required
            minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            value={credentials.cpassword}
            name="cpassword"
            onChange={onChange}
            required
            minLength={5}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          SignUp
        </button>
      </form>
    </div>
  );
};

export default SignUp;
