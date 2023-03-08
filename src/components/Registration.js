import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Registration = () => {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    conPassword: "",
  });

  const [formError, setFormError] = useState({});
  const [submit, issubmit] = useState(false);
  const { fName, lName, email, password, conPassword } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (Object.keys(formError).length === 0 && submit) {
      console.log(user);
    }
  }, [formError]);

  const onSubmit = async (e) => {
    e.preventDefault();

    setFormError(validate(user));
    issubmit(true);
    if (Object.keys(formError).length === 0 && submit) {
      await axios.post("https://my-json-server.typicode.com/saurabhpacharne/Db/db", user);
      alert("you have successfully registered");
      navigate("/login");
    }
  };

  const validate = (values) => {
    const error = {};
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!values.fName) {
      error.fName = "First name is required !";
    }
    if (!values.lName) {
      error.lName = "Last name is required !";
    }
    if (!values.email) {
      error.email = "Email is required !";
    } else if (!regex.test(values.email)) {
      error.email = "This is not a valid email !";
    }
    if (!values.password) {
      error.password = "Password is required !";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
        values.password
      )
    ) {
      error.password =
        "Password must contain one capital letter, one small letter, one special character, one digit!";
    }
    if (!values.conPassword) {
      error.conPassword = "Confirm password is required !";
    } else if (values.password !== values.conPassword) {
      error.conPassword = "Password does not match !";
    }
    return error;
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary sticky-top ">
        <div className="container-fluid">
          <a className="navbar-brand text-warning fw-bold" href="/">
            SPKart
          </a>
          <ul className="navbar-nav me-3 ">
            <li className="nav-item ">
              <li className="nav-item ">
                <NavLink
                  className="nav-link active text-white "
                  aria-current="page"
                  to="/login"
                >
                  Login
                </NavLink>
              </li>
            </li>
          </ul>
        </div>
      </nav>
      <h1 className="text-center mt-2 text-primary">Register</h1>
      <br />

      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto shadow-lg bg-light p-5">
            <form onSubmit={(e) => onSubmit(e)} >
              <div className=" form-group">
                <label htmlFor="user" />
                First Name <label />
                <input
                  type="text"
                  name="fName"
                  id="user1"
                  value={fName}
                  autoComplete="off"
                  className="form-control "
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <p className="text-danger">{formError.fName}</p>
              <div className="  form-group">
                <label htmlFor="user" />
                Last Name <label />
                <input
                  type="text"
                  name="lName"
                  id="user2"
                  value={lName}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <p className="text-danger">{formError.lName}</p>
              <div className=" form-group">
                <label htmlFor="email" />
                Email <label />
                <input
                  type="email"
                  name="email"
                  id="user3"
                  value={email}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <p className="text-danger">{formError.email}</p>
              <div className="  form-group">
                <label htmlFor="user" /> Password
                <label />
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <p className="text-danger">{formError.password}</p>
              <div className="  form-group">
                <label htmlFor="user" />
                Confirm Password
                <label />
                <input
                  type="password"
                  name="conPassword"
                  id="users"
                  value={conPassword}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <p className="text-danger">{formError.conPassword}</p>
              <div className="text-center mt-2">
                <button className="btn btn-primary mt-2">REGISTER</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Registration;
