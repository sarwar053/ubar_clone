import React from 'react'
import {Link} from 'react-router-dom'

function Start() {
  return (
    <div>
        <div className='bg-cover bg-center bg-[url(https://images.pexels.com/photos/4543112/pexels-photo-4543112.jpeg)] h-screen pt-5  flex justify-between flex-col w-full bg-red-400'>
            <img className='w-16 ml-8' src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png" alt="missing image uber image logo" />
            <div className='bg-white py-4 px-4 pb-7'>
                <h2 className='text-2xl font-bold'>get Started with Uber</h2>
                <Link to='/user-login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Start