
import React from 'react'
import { Navigate } from 'react-router-dom';

const PublicPage = ({ children }: { children: React.ReactNode }) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn'); 
    if (isLoggedIn === "true") {
        return <Navigate to={'/'} />
    }
    return children
}

export default PublicPage