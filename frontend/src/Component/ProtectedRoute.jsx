import React from 'react'
import Unauthenticated from './Unauthenticated'

const ProtectedRoute = ({ authenticated, children }) => {
    return (
        <>
            {authenticated ? children : <Unauthenticated/>}
        </>
    )
}

export default ProtectedRoute