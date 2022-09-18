import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Protected = ({Component}) => {
    const navigate = useNavigate()
    useEffect(()=>{
        const login = JSON.parse(localStorage.getItem("userData"));
        if(login==null){
            navigate("/login");
        }
    })

  return (
   <>
   <Component/>
   </>
  )
}

export default Protected