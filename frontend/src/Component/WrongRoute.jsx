import React from 'react'
import { useNavigate } from 'react-router-dom'

const WrongRoute = () => {

  const navigate = useNavigate();

  setTimeout(() => {
    navigate("/login");
  }, 1000);
  return (
    <div>Route not found</div>
  )
}

export default WrongRoute