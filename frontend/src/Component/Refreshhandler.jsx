import React from 'react'
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'

const Refreshhandler = () => {

    let location = useLocation();
    let navigate = useNavigate();

    useEffect(() => {
        if (["/",'/login', '/signup'].includes(location.pathname)) {
            navigate("/data");
        }
    },[])
    return (
        null
    )
}

export default Refreshhandler