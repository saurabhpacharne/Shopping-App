import React, { useState, useEffect } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newArr, setNewArr] = useState([]);
  const [loggedIn , setLoggedIn] = useState([])

  const allArr = { email: email, password: password };
  let navigate = useNavigate();

  useEffect(()=>{
    if(loggedIn.length!==0){
    localStorage.setItem("userData",JSON.stringify(loggedIn))
    }
  },[loggedIn])


  const submitForm =async (e) => {
    e.preventDefault();
    const result = await axios.get("http://localhost:3005/users");
    if (email && password) {
      setNewArr([...newArr, allArr]);

      if ((result.data).find((val) =>allArr.email === val.email && allArr.password === val.password)) {
        setLoggedIn((result.data).filter((val) => allArr.email === val.email && allArr.password === val.password));
       setTimeout(() => {
        navigate("/home");
       }, 100);
        
      } else if (
        (result.data).find(
          (val) =>
            allArr.email === val.email && allArr.password !== val.password
        )
      ) {
        alert("password is wrong !");
      } else {
        alert("You have not registered yet,please register");
      }
    } else alert("All field should be filled !");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary ">
        <div className="container-fluid">
          <a className="navbar-brand text-warning fw-bold" href="/">
            SPKart
          </a>
        </div>
      </nav>
      <div id="log-container" className="container ">
        <h1 className="text-primary text-center mt-5">Login</h1>

        <div className="row">
          <div className="col-md-6 mx-auto shadow-lg bg-light p-5">
            <form onSubmit={submitForm}>
              <div className="form-group ">
                <label htmlFor="user" />
                Email
                <label />
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="user" />
                Password
                <label />
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="text-center mt-3">
                <button to="/" className="btn btn-primary mt-2">
                  LOGIN
                </button>
              </div>
            </form>

            <p>
              Have an account?{" "}
              <a
                className="mt-2 text-center"
                type="button"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
