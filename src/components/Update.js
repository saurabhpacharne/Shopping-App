import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Update = () => {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    conPassword: "",
  });
  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    getUserData();
  }, []);
  const { fName, lName, email, password, conPassword } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(
      `https://my-json-server.typicode.com/saurabhpacharne/Db/db/${userData.map((val) => val.id)}`,
      user
    );
  };

  const getUserData = async () => {
    const res = await axios.get(
      `https://my-json-server.typicode.com/saurabhpacharne/Db/db/${userData.map((val) => val.id)}`
    );
    setUser(res.data);
  };

  return (
    <>
      <h1 className="text-center mt-4 text-primary bg-dark p-3 fw-bold">
        User Profile
      </h1>
      <hr />

      <div className="container mt-4 mb-2">
        <div className="row">
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="row mb-3">
              <label
                for="inputEmail3"
                className="col-sm-2 col-form-label fw-bold"
              >
                First Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control fw-bold"
                  name="fName"
                  value={fName}
                  id="fname"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label
                for="inputEmail3"
                className="col-sm-2 col-form-label fw-bold"
              >
                Last Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  name="lName"
                  value={lName}
                  className="form-control fw-bold"
                  id="lname"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label
                for="inputEmail3"
                className="col-sm-2 col-form-label fw-bold"
              >
                Email 
              </label>
              <div className="col-sm-10">
                <input
                  type="email"
                  className="form-control fw-bold"
                  name="email"
                  value={email}
                  id="email"
                  onChange={(e) => onInputChange(e)}
                  disabled
                />
              </div>
            </div>
            <div className="row mb-3">
              <label
                for="inputEmail3"
                className="col-sm-2 col-form-label fw-bold"
              >
               Change Password 
              </label>
              <div className="col-sm-10">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label
                for="inputPassword3"
                className="col-sm-2 col-form-label fw-bold"
              >
                Confirm Password
              </label>
              <div className="col-sm-10">
                <input
                  type="password"
                  className="form-control"
                  id="input"
                  name="conPassword"
                  value={conPassword}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="text-center mt-2">
              <button
                className="btn btn-primary mt-2"
                onClick={() => {
                  setTimeout(() => {
                    navigate("/login");
                  }, 100);
                  alert("Your Profile has been updated !");
                }}
              >
                UPDATE
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Update;
