import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/context'
import axios from "axios"
function CaptainSignup() {


  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [firstname, setFirstName] = React.useState('')
  const [lastname, setLastName] = React.useState('')
  const [vehicelColor, setVehicelColor] = React.useState('')
  const [plate, setPlate] = React.useState('')
  const [capacity, setCapacity] = React.useState('')
  const [vehicelType, setVehicelType] = React.useState('')

  const { setCaptain } = React.useContext(CaptainDataContext)



  const navigate = useNavigate()

  const submitHandle = async (e) => {
    e.preventDefault()

    const captainData = {
      email,
      password,
      fullname: {
        firstname,
        lastname
      },
      vehicle: {
        color: vehicelColor,
        plate,
        capacity,
        vehicleType: vehicelType
      }
    }
    
    const response=await axios.post('http://localhost:4000/captains/register',captainData)

    if(response.status===201){
      
      const data=response.data
      setCaptain(data.captain)
      localStorage.setItem('token',data.token)
      navigate('/home')
      
    }
    
    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')
    setVehicelColor('')
    setPlate('')
    setCapacity('')
    setVehicelType('')
  }




  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-8' src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png" alt="" />
        <form onSubmit={(e) => submitHandle(e)} >

          <h3 className='text-base mb-2 font-medium'>what is your captain name</h3>
          <div className='flex gap-2 mb-5'>
            <input
              className='bg-[#eeeeee]  w-1/2 rounded px-4 py-2 border-0  text-lg placeholder:text-base'
              required
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              type='text'
              placeholder='first name'
            />

            <input
              className='bg-[#eeeeee] w-1/2  rounded px-4 py-2 border-0  text-lg placeholder:text-base'
              required
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              type='text'
              placeholder='last name' />

          </div>
          <h3 className='text-base mb-2 font-medium'>Enter your captain email</h3>
          <input
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border-0 w-full text-lg placeholder:text-base'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="email@example.com" />

          <h3 className=' mb-2 text-base font-medium'>Enter password</h3>
          <input
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border-0 w-full text-lg placeholder:text-base'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password" />



          <h3 className=' mb-2 text-base font-medium'>Vehical information</h3>

          <div className='grid grid-cols-2 gap-2 mb-5'>
            <input
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border-0 w-full text-lg placeholder:text-base'
            required
            value={vehicelColor}
            onChange={(e) => setVehicelColor(e.target.value)}
            type="text"
            placeholder="vehicle color" />

          <input
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border-0 w-full text-lg placeholder:text-base'
            required
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
            type="text"
            placeholder="vehicle plate" />

            <input
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border-0 w-full text-lg placeholder:text-base'
            required
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            type="number"
            placeholder="vehicle capacity" />

            <select name="" id="" required
             className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border-0 w-full text-lg placeholder:text-base'
             onChange={(e) => setVehicelType(e.target.value)}
             value={vehicelType}
             > 
             <option value="" disabled>vehicle type</option>
             <option value="car">car</option>
             <option value="van">van</option>
             <option value="bus">bus</option>
            </select>

          </div>

          
          <button type='submit'
            className='bg-[#111] text-white font-semibold mb-5 rounded px-4 py-2 border-0 w-full text-lg placeholder:text-base'
          >create captain account</button>

          <p className='text-center'>already have a captain account?<Link to='/captain-login' className='text-blue-600'>Login</Link></p>

        </form>
      </div>
      <div>
        <p className='text-xs'>By proceeding,you consent to get calls,whatsApp or sms message, including by automated means from uber and its affiliates to the number provided</p>
      </div>
    </div>
  )
}

export default CaptainSignup