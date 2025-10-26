import React from 'react'
import { Link } from 'react-router-dom'

function CaptainLogin() {


  const [email,setEmail]=React.useState('')
  const [password,setPassword]=React.useState('')
  const [captaindata,setcaptainData]=React.useState({})
  
  const submitHandle=(e)=>{
    e.preventDefault()
    setcaptainData({email,password})
    setEmail('')
    setPassword('')
    console.log(captaindata)
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

          <p className='text-center'>New here?<Link to='/captain-signup' className='text-blue-600'>Regester as captain</Link></p>

        </form>
      </div>
      <div>
        <Link to='/user-login'
          className='bg-[#f3c164] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 border-0 w-full text-lg placeholder:text-base'
        >Sign in as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin