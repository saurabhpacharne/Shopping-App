import React, { useState, useEffect } from "react";

function Checkout() {
 
 
const [data ,setData]= useState([]);

useEffect(()=>{
const user = JSON.parse(localStorage.getItem("sum"))
if(user){
  setData(user)
}
},[]) 
  
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary sticky-top ">
        <div className="container-fluid">
          <a className="navbar-brand text-warning fw-bold" href="/home">
            SPKart
          </a>
        </div>
      </nav>
      <h1 className=" container text-center text-success mt-4 bg-light fw-bold">
        Order Summary
      </h1>
    <table className="table table-striped mt-4 text-center">
  <thead>
    <tr>
      <th scope="col">SL No.</th>
      <th scope="col">Order ID</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">No. Of items purchased</th>
      <th scope="col">Price</th>
      <th scope="col">Date</th>
    </tr>
  </thead>
  <tbody>
    {data.map((val,index)=>{return(
       <tr key={val.orderId}>
       <th scope="row" >{index+1}</th>
       <td>{val.orderId}</td>
       <td>{val.name.toUpperCase()}</td>
       <td>{val.email}</td>
       <td>{val.item}</td>
       <td>₹ {val.price}</td>
       <td>{val.date}</td>
     </tr>
    )})}
   
  </tbody>
</table>
    
    </>
  );
}

export default Checkout;
