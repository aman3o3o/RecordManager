import React from 'react'
import Accessdenied from './Accessdenied'

const ProtectedRoute = ({ authenticated, children }) => {
    return (
        <>
            {authenticated ? children : <Accessdenied />}
        </>
    )
}

export default ProtectedRoute