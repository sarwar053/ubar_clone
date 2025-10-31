import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { UserDataContext } from '../context/context'

function UserSignUp() {
  const [email,setEmail]=React.useState('')
  const [password,setPassword]=React.useState('')
  const [firstname,setFirstName]=React.useState('')
  const [lastname,setLastName]=React.useState('')
  

  const navigate=useNavigate()
  
  const {setUser}=React.useContext(UserDataContext)
  
  const submitHandle= async(e)=>{
    e.preventDefault()

    const newUser={
      email,
      password,
      fullname: {
        firstname,
        lastname
      }
    }
    
    const response=await axios.post('http://localhost:4000/users/register',newUser)

    if(response.status===201){
      
      setUser(response.data.user) 
      localStorage.setItem('token',response.data.token)
      navigate('/home')
    }
    
    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')
  }



  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-8' src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png" alt="" />
        <form onSubmit={(e)=>submitHandle(e)} >

<h3 className='text-base mb-2 font-medium'>what is your name</h3>
          <div className='flex gap-2 mb-5'>
          <input
            className='bg-[#eeeeee]  w-1/2 rounded px-4 py-2 border-0  text-lg placeholder:text-base'
            required
            value={firstname}
            onChange={(e)=>setFirstName(e.target.value)}
            type='text'
            placeholder='first name'
            />
            
          <input
            className='bg-[#eeeeee] w-1/2  rounded px-4 py-2 border-0  text-lg placeholder:text-base'
            required
            value={lastname}
            onChange={(e)=>setLastName(e.target.value)}
            type='text'
            placeholder='last name' />

          </div>
          <h3 className='text-base mb-2 font-medium'>Enter your email</h3>
          <input
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border-0 w-full text-lg placeholder:text-base'
            required
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            type="email"
            placeholder="email@example.com" />
          
          <h3 className=' mb-2 text-base font-medium'>Enter password</h3>
          <input
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border-0 w-full text-lg placeholder:text-base'
            required
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            type="password"
            placeholder="password" />
          <button type='submit'
            className='bg-[#111] text-white font-semibold mb-5 rounded px-4 py-2 border-0 w-full text-lg placeholder:text-base'
          >Sign up</button>

          <p className='text-center'>already have an account?<Link to='/user-login' className='text-blue-600'>Login</Link></p>

        </form>
      </div>
      <div>
        <p className='text-xs'>By proceeding,you consent to get calls,whatsApp or sms message, including by automated means from uber and its affiliates to the number provided</p>
      </div>
    </div>
  )
}

export default UserSignUp