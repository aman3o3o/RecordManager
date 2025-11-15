import React from 'react'

const Loader = ({width,height}) => {
  return (
    <>
    <div className='border-gray-300 border-[2px] border-t-black rounded-[50%] animate-spin' style={{width:`${width}px`,height:`${height}px`}}></div>
    </>
  )
}

export default Loader