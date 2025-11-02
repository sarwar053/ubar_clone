import React from "react";

export const UserDataContext = React.createContext(
    {
    user:null,
    loading:false
    }
);
export const CaptainDataContext = React.createContext(
    {
    captain:null,
    loading:false
    }
);