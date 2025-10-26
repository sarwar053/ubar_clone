import React from 'react'
import { UserDataContext } from './context'
import { useState } from 'react'
const UserContext = ({children}) => {
 
const [user,setUser]=useState({
   email:"",
   fullName:{
    firstName:"",
    lastName:""
   }
})


  const contextvalue={user}  


  return (
    <div>
        <UserDataContext.Provider value={contextvalue}>
        {children}
        </UserDataContext.Provider>
    
    </div>
  )
}

export default UserContext
