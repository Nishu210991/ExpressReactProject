import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credential, setCredential] = useState({ email: "", password: "" })
  let navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: credential.email,
        password: credential.password })
    });
    const json = await response.json()
    console.log(json); 
    if (json.success){
        //Save the auth token and redirect
        localStorage.setItem('token', json.authtoken);
        props.showAlert("Login Successfully", "success")
        navigate("/");

    }
    else{
        props.showAlert("Invalid Credential", "danger")

    }
  }

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value })
  }


  return ( 
  <div className="mt-3">
    <h2 className="my-2">LOGIN to Continue iNoteboo </h2>
      <form onSubmit={handleOnSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email" 
            onChange={onChange}
            className="form-control"
            value={credential.email}
            id="email"
            name="email"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            onChange={onChange}
            className="form-control"
            value={credential.password}
            id="password"
            name="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
