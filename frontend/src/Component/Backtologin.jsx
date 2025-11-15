import React from 'react'
import { useNavigate } from 'react-router-dom';

const Backtologin = () => {

    let navigate = useNavigate();

    const back = () => {
        navigate("/login");
    }
  return (
    <>
    <button className="cursor-pointer hover:underline text-[12px]" onClick={back}>Back To Login</button>
    </>
  )
}

export default Backtologin