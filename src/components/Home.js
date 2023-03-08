import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Rating from "./Rating";
import "./Home.css";

const Home = () => {
  const [product, setProduct] = useState([]);
  const [count, setCount] = useState(0);
  const [sort, setsort] = useState(" Sort By");
  const [user, setUser] = useState([]);

  useEffect(() => {
    getAllProduct();

    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) {
      setUser(user);
    }
    setCount(
      JSON.parse(localStorage.getItem("data")) == null
        ? 0
        : JSON.parse(localStorage.getItem("data")).length
    );
  }, []);

  const getAllProduct = async () => {
    const response = await axios.get("https://my-json-server.typicode.com/saurabhpacharne/Db/db");
    setProduct(response.data);
  };

  const ascSort = async () => {
    const response = await axios.get("https://my-json-server.typicode.com/saurabhpacharne/Db/db");
    const data = response.data.sort((a, b) => a.price - b.price);
    setProduct(data);
    setsort(" LOW TO HIGH");
  };

  const dscSort = async () => {
    const response = await axios.get("https://my-json-server.typicode.com/saurabhpacharne/Db/db");
    const data = response.data.sort((a, b) => b.price - a.price);
    setProduct(data);
    setsort(" HIGH TO LOW");
  };

  const rateSort = async () => {
    const response = await axios.get("https://my-json-server.typicode.com/saurabhpacharne/Db/db");
    const data = response.data.sort((a, b) => b.rate - a.rate);
    setProduct(data);
    setsort("MOST RATED");
  };

  const setDataToLocal = (value) => {
    const data = JSON.parse(localStorage.getItem("data"));
    if (data != null && data.find((data) => data.id == value.id)) {
      data.find((data) => data.id == value.id)["quantity"]++;
      localStorage.setItem("data", JSON.stringify(data));
    } else {
      value["quantity"] = 1;
      if (data == null) {
        localStorage.setItem("data", JSON.stringify([value]));
      } else {
        localStorage.setItem("data", JSON.stringify([...data, ...[value]]));
      }
    }
    setCount(
      JSON.parse(localStorage.getItem("data")) == null
        ? 0
        : JSON.parse(localStorage.getItem("data")).length
    );
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand text-warning fw-bold" to="/home">
            SPKart
          </a>
        </div>
        <ul className="navbar-nav me-3 ">
          <li className="nav-item ">
            <li className="nav-item ">
              <NavLink
                className="nav-link active text-white fw-bold"
                aria-current="page"
                to="/order"
              >
                Orders
              </NavLink>
            </li>
          </li>
          <li className="nav-item ">
            <li className="nav-item ">
              <NavLink
                className="nav-link active text-white fw-bold"
                aria-current="page"
                to="/login"
              >
                Logout
              </NavLink>
            </li>
          </li>
          <li className="nav-item ">
            <li className="nav-item ">
              <NavLink
                className="nav-link active text-white fw-bold"
                aria-current="page"
                to="/profile"
              >
                {user.map((val) => val.fName + val.lName)}
                <span
                  className="material-symbols-outlined"
                  style={{
                    padding: "0px",
                    top: "13px",
                    position: "absolute",
                    fontSize: "30px",
                  }}
                >
                  account_circle
                </span>
              </NavLink>
            </li>
          </li>
          <li className="nav-item ">
            <li className="nav-item ">
              <NavLink
                className="nav-link active text-white "
                aria-current="page"
                to="/cart"
              >
                {count !== 0 ? (
                  <span
                    className="material-symbols-outlined badge"
                    style={{
                      fontSize: "30px",
                      padding: "0px",
                      marginLeft: "25px",
                    }}
                    data-count={count}
                  >
                    shopping_cart
                  </span>
                ) : (
                  <span
                    className="material-symbols-outlined "
                    style={{ fontSize: "30px", marginLeft: "25px" }}
                  >
                    shopping_cart
                  </span>
                )}
              </NavLink>
            </li>
          </li>
        </ul>
      </nav>
      <div className="container ">
        <h1 className="text-center bg-light text-info mt-4 fw-bold">
          Product List
        </h1>
        <br />
        <div className="dropdown text-end">
          <button
            className="btn btn-warning dropdown-toggle fw-bold"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {sort}
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <a
                className="dropdown-item fw-normal"
                type="button"
                onClick={() => ascSort()}
              >
                LOW TO HIGH
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                type="button"
                onClick={() => dscSort()}
              >
                HIGH TO LOW
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                type="button"
                onClick={() => rateSort()}
              >
                MOST RATED
              </a>
            </li>
          </ul>
          <h6 className="text-start ">Total Products : {product.length}</h6>
        </div>
        <div className="row">
          {product.map((val) => {
            return (
              <div key={val.id} className="col-md-3 col-sm-6 col-12 p-4">
                <div className="card h-100 shadow-sm ">
                  <NavLink
                    to={`/detail/${val.id}`}
                    className=" card-img-top h-100 p-2"
                  >
                    <img
                      src={val.image}
                      className="card-img-top p-4 bg-light"
                      alt="img"
                      height="250px"
                    />
                  </NavLink>
                  <div className="card-body text-center p-1">
                    <h6 className="card-title ">{val.title}</h6>
                    <p className="card-text">{val.category.toUpperCase()}</p>
                    <h6 className="card-text  "> ₹ {Math.ceil(val.price)} </h6>
                    <div className="rating">
                      <Rating value={val.rate} />
                    </div>
                    <div className="text-center mb-3 mt-3">
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => setDataToLocal(val)}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Home;
