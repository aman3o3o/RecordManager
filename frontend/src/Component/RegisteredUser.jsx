import axios from 'axios';
import React from 'react'

const RegisteredUser = () => {

  const tokenvalidate = async () => {
    try{
      let res = await axios.post("http://localhost:3000/api/tokenvalidate",{},{headers : {authorization : localStorage.getItem("token")}})
      if(res.data.success && res.data.admin){
        
      }
    }
    catch{

    }
  }

  let totaluser = [1];
  return (
    <>
      <div className='h-screen flex flex-col items-center overflow-hidden'>
        <h1 className='font-bold text-xl'>List of registered users</h1>
        <table>
          <thead>
            <tr>
              <th className='px-1'>Id</th>
              <th className='px-1'>Email</th>
              <th className='px-1'>Count</th>
            </tr>
          </thead>
          {totaluser.map((data) => {
            return (
              <tbody className='overflow-auto'>
                <tr>
                  <td className='px-1'>id</td>
                  <td className='px-1'>email</td>
                  <td className='px-1'>count</td>
                </tr>
                <tr>
                  <td className='px-1'>id</td>
                  <td className='px-1'>email</td>
                  <td className='px-1'>count</td>
                </tr>
                <tr>
                  <td className='px-1'>id</td>
                  <td className='px-1'>email</td>
                  <td className='px-1'>count</td>
                </tr>
                        
              </tbody>
            );
          })
          }
        </table>
      </div>
    </>
  )
}

export default RegisteredUser