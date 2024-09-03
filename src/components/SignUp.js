import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const SignUp = (props) => {
    const host="http://localhost:5000/api/auth/createuser";
    const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""});
    let navigate=useNavigate();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response =await fetch(host, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
          });

          const json = await response.json();
          console.log(json);
          if(json.success){
            localStorage.setItem('token',json.authToken);
            props.showAlert("Account created Successfully","success");
            navigate("/login");
          }
          else{
            props.showAlert("Invalid Credentials","danger")
          }
    }
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      };
    return (
        <div className='container w-75 bg-light rounded shadow p-5' style={{marginBottom: "40px" }}>
            <h2 className='text-center'><strong>Sign Up</strong></h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Enter your name</label>
                    <input type="text" className="form-control" id="name" name='name' aria-describedby="nameHelp" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Enter your email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Enter your password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={8} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label"> Confirm password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} minLength={8} required/>
                </div>
                <button type="submit" className="btn btn-dark" onClick={scrollToTop}>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp
