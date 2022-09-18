import React, {useEffect, useState} from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import Rating from "./Rating";


const  Detail= () => {
    const[product,setProduct] = useState([]);
   
    const {id} = useParams();
    
    useEffect(()=>{
        loadAllProduct();
    },[])

    const loadAllProduct = async ()=>{
      const response = await axios.get(`http://localhost:3005/products/${id}`);  
      setProduct(response.data);   
    }


  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary  sticky-top">
    <div className="container-fluid">
      <a className="navbar-brand text-warning fw-bold" href="/home">SPKart</a> 
      <ul className="navbar-nav me-3 ">
      <li className="nav-item ">
      </li> 
      <li className="nav-item ">
      <li className="nav-item ">
        <NavLink className="nav-link active text-white " aria-current="page"to="/cart">Cart</NavLink>
      </li> 
      </li> 
    </ul>      
    </div> 
  </nav> 
    <div className="container">
    <h1 className="text-warning text-center mt-4">Item Details</h1>
    <br/>
    <div className="row">
      <div className="col-md-6 mx-auto">
    <div className="card h-100 shadow-sm" >
  <img src={product.image} className="card-img-top h-50 p-5 " alt="img"/>
  <div className="card-body text-center">
    <h3 className="card-title">Title : {product.title} </h3>
    <p className="card-text">{product.description}</p>
  </div>
  <ul className="list-group list-group-flush text-center">
    <li className="list-group-item"><h6>Category : {product.category}</h6></li>
    <li className="list-group-item"><h6>Price : ₹ {product.price}</h6></li>
    <li className="list-group-item"><h6><Rating value={ product.rate}/></h6></li>
    <div className="rating"> </div>
    <li className="list-group-item"><h6>Count : {product.count} </h6></li>
  </ul>
  <div className="card-body">
 <div className="text-center"> <a href="#" className="btn btn-primary">Add To Cart</a></div>
    
  </div>
   </div>
 </div>
</div>  
    {/* <div className="card mb-3" >
  <div className="row g-0">
    <div className="col-md-4">
      <img src={product.image} className="img-fluid rounded-start h-100 p-5 shadow-lg" alt="img"/>
</div>
<div className="col-md-8">
  <div className="card-body">
    <h2 className="card-title">  Title : {product.title}</h2>
    <h3 > Category : {product.category}</h3>
    <h4 > Price : {product.price} </h4>
<p className="card-text"><h6>Product description:</h6> {product.description}</p>
<Link  to="" className="btn btn-primary  ">Buy Now</Link >
<Link  to="/home" className="btn btn-danger ms-4 ">Back</Link >
  </div>
     
    </div>
  </div>
</div> */}
   </div>
    </>
   
  )
}

export default Detail