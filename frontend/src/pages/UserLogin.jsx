import React from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import { UserDataContext } from '../context/context'
import { useNavigate } from 'react-router-dom'

function UserLogin() {
  const [email,setEmail]=React.useState('')
  const [password,setPassword]=React.useState('')
  
  

  const navigate=useNavigate()
  
  const {setUser}=React.useContext(UserDataContext)


  const submitHandle=async(e)=>{
    e.preventDefault()
    const userData={email,password}
    setEmail('')
    setPassword('')
    const response=await axios.post('http://localhost:4000/users/login',userData,{withCredentials:true})
    if(response.status===200){
      setUser(response.data.user)
      localStorage.setItem('token',response.data.token)
      navigate('/home')
    }
  }




  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-8' src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png" alt="" />
        <form onSubmit={(e)=>submitHandle(e)} >
          <h3 className='text-xl mb-2'>what is your email</h3>
          <input
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border-0 w-full text-lg placeholder:text-base'
            required
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            type="email"
            placeholder='email@example.com' />
          <h3 className='text-xl mb-2'>Enter password</h3>
          <input
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border-0 w-full text-lg placeholder:text-base'
            required
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            type="password"
            placeholder="password" />
          <button type='submit'
            className='bg-[#111] text-white font-semibold mb-5 rounded px-4 py-2 border-0 w-full text-lg placeholder:text-base'
          >Login</button>

          <p className='text-center'>New here?<Link to='/user-signup' className='text-blue-600'>Create new Account</Link></p>

        </form>
      </div>
      <div>
        <Link to='/captain-login'
          className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 border-0 w-full text-lg placeholder:text-base'
        >Sign in as Captain</Link>
      </div>
    </div>

  )
}

export default UserLogin