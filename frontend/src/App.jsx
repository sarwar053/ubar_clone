import React from 'react'
import { Route,Routes } from 'react-router-dom'
import UserLogin from './pages/UserLogin'
import Home from './pages/home'
import UserSignUp from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignUp from './pages/CaptainSignup'
import { UserDataContext } from './context/context'
function App() {
  

  return (
    <>
    <Routes>
    <Route path='/user-login' element={<UserLogin/>}/>
    <Route path='/' element={<Home/>}/>
    <Route path='/signup' element={<UserSignUp/>}/>
    <Route path='/captain-login' element={<CaptainLogin/>}/>
    <Route path='/captain-signup' element={<CaptainSignUp/>}/>

    <Route path='*' element={<h1>404</h1>}/>
    </Routes>
    </>
  )
}

export default App
