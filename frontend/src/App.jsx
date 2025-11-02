import React from 'react'
import { Route,Routes } from 'react-router-dom'
import UserLogin from './pages/UserLogin'
import UserSignUp from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignUp from './pages/CaptainSignup'
import Start from './pages/start'
import Home from './pages/home'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import UserLogout from './pages/userLogout'
import CaptainHome from './pages/Captain-home'
function App() {
  

  return (
    <>
    <Routes>
    <Route path='/user-login' element={<UserLogin/>}/>
    <Route path='/' element={<Start/>}/>
    <Route path='/user-signup' element={<UserSignUp/>}/>
    <Route path='/captain-login' element={<CaptainLogin/>}/>
    <Route path='/captain-signup' element={<CaptainSignUp/>}/>
    <Route path='/home' element={
      <UserProtectedWrapper>
          <Home/>
      </UserProtectedWrapper>
      }/>
     
     <Route path='/captain-home' element={
      <UserProtectedWrapper>
          <CaptainHome/>
      </UserProtectedWrapper>
      }/>

      <Route path='/users/logout' element={<UserLogout/>}/>

    <Route path='*' element={<h1>404</h1>}/>
    </Routes>
    </>
  )
}

export default App
