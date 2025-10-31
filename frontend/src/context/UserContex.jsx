import React, { useState } from 'react'

import { UserDataContext } from './context'


const UserContext = ({children}) => {
 
const [user,setUser]=useState({
  
   email:"",
   fullName:{
    firstName:"",
    lastName:""
   }
  
})

  return (
        <UserDataContext.Provider value={{user,setUser}}>
        {children}
        </UserDataContext.Provider>
    
  )
}

export default UserContext
