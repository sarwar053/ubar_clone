import React, { useEffect } from 'react'


import { Navigate } from 'react-router-dom'

const UserProtectedWrapper = ({ children }) => {

    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!token) {
            return <Navigate to="/user-login" />;
        }
    }, [token])



    return (
        <>
            {children}
        </>
    )
}


export default UserProtectedWrapper
