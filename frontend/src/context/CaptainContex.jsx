


import { CaptainDataContext } from "./context"
import { useState } from "react"

const CaptainContext=({children})=>{


    const [captain,setCaptain]=useState({
        
        email:"",
        fullName:{
         firstName:"",
         lastName:""
        },
        password:"",
        vehicle: {
            color: "",
            plate: "",
            capacity: "",
            vehicleType: ""
        }
    })



    return (
        <CaptainDataContext.Provider value={{captain,setCaptain}}>
        {children}
        </CaptainDataContext.Provider>
        
    )
}

export default CaptainContext