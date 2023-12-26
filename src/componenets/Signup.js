import React , {useState}from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credential, setCredential] = useState({name:"", email: "", password: "",cpassword:"" });
  let navigate = useNavigate();

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const {name, email, password} = credential;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4MmM2YTUxZjYwNDA1MTI2OTcyYTg4In0sImlhdCI6MTcwMzA3NzA0Nn0.q1J217y9NiYM2rqTh6uoZC_EaFOKili0W7wRcJcefl4",
      },
      body: JSON.stringify({name, email, password})
    });
    const json = await response.json();
    console.log(json);
    if (json.success){
        //Save the auth token and redirect
        localStorage.setItem('token', json.authtoken);
        navigate("/");
        props.showAlert("Account Created Successfully", "success")

    }
    else{
        props.showAlert("Invalid deatils", "danger")
    }
    
  };

  return (
    <div className="mt-3">
    <h2 className="my-2">Create an Account to use iNotebook</h2>

      <form onSubmit={handleOnSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name{" "}
          </label>
          <input
            type="name"
            className="form-control"
            onChange={onChange}
            id="name"
            name="name"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            onChange={onChange}
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
            className="form-control"
            onChange={onChange} minLength={5} required
            id="password"
            name="password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="cpassword"
            className="form-control" minLength={5} required
            onChange={onChange}
            id="cpassword"
            name="cpassword"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
