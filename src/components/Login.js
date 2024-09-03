import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
const Login = (props) => {
    const host="http://localhost:5000/api/auth/login";
    const [credentials,setCredentials]=useState({email:"",password:""});
    let navigate=useNavigate();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response =await fetch(host, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
          });

          const json = await response.json();
          console.log(json);
          if(json.success){
            localStorage.setItem('token',json.authToken);
            localStorage.setItem('userName', json.name);
            props.showAlert(`${json.name} Logged in Successfully`,"success");
            navigate("/");
          }
          else{
            props.showAlert("User not found or Invalid Credentials","danger")
          }
    }
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

    return (
        <div className='container w-75 bg-light rounded shadow p-5' style={{marginBottom:"40px"}}>
            <h2 className='text-center'><strong>Please Login to continue</strong></h2>
            <p className='text-center' style={{fontSize:"13px",color:'gray'}}>Create a new account? <Link to="/signup"><span>Sign Up</span></Link></p>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={credentials.email} onChange={onChange}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-dark" >Login</button>
            </form>
        </div>
    )
}

export default Login
