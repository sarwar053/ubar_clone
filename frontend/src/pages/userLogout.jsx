
import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function UserLogout() {

    const token=localStorage.getItem('token')
    const navigate=useNavigate()

    axios.get('http://localhost:4000/users/logout',{
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).then((res)=>{
     if(res.status===200){
        localStorage.removeItem('token')
        navigate('/user-login')
     }
    })
  return (
    <div>
      UserLogout
    </div>
  )
}

export default UserLogout
