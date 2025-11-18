import axios from 'axios';
import React from 'react'
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import Accessdenied from './Accessdenied';

const RegisteredUser = ({ setauthenticated }) => {

  let navigate = useNavigate();

  const [alluser, setalluser] = useState([]);

  const [admin, setadmin] = useState(false);

  const tokenvalidate = async () => {
    try {
      let res = await axios.post("http://localhost:3000/api/tokenvalidate", {}, { headers: { authorization: localStorage.getItem("token") } })
      if (res.data.success && res.data.admin) {
        setadmin(true);
        toast.success(res.data.message);
      }
    }
    catch (err) {
      if (err.response) {
        console.log("api/tokenvalidate error -");
        console.log(err.response);
        toast.err(err.response.data.message);
      }
      else {
        toast.error("server error");
      }
    }
  }

  const get_alluser = async () => {
    try {
      let res = await axios.get("http://localhost:3000/api/alluser");
      if (res.data.success && res.data.data.length > 0) {
        setalluser(res.data.data);
      }
    }
    catch (err) {
      if (err.response) {
        console.log("api/alluser err -");
        console.log(err.response);
        toast.error(err.response.data.message);
      }
      else {
        toast.error("server error");
      }
    }
  }

  useEffect(() => {
    let validation = async () => {
      await tokenvalidate();
      await get_alluser();
    }
    validation();
  }, [])

  const logout = () => {
    localStorage.clear();
    setTimeout(() => {
      toast.success("you are successfully logged out");
      setTimeout(() => {
        setauthenticated(false);
        navigate("/");
      }, 1000)
    }, 200)
  }

  return (
    <>
      {admin ? <div className='h-screen flex flex-col items-center overflow-hidden'>
        <h1 className='font-bold text-xl'>List of registered users</h1>
        <table>
          <thead>
            <tr>
              <th className='px-1'>Id</th>
              <th className='px-1'>Email</th>
              <th className='px-1'>Count</th>
            </tr>
          </thead>
          <tbody className='overflow-auto'>
            {alluser.length > 0 ? (alluser.map((data, index) => {
              return (
                <tr>
                  <td className='px-1'>{index + 1}</td>
                  <td className='px-1'>{data._id}</td>
                  <td className='px-1'>{data.count}</td>
                </tr>
              );
            })) : (
              <tr>
                <td className='colSpan={3} flex justify-center items-center'>No Data Found</td>
              </tr>
            )
            }
          </tbody>
        </table>
        <div onClick={logout} className='hover:text-red-600 hover:cursor-pointer'>Logout</div>
      </div>
        : <Accessdenied />}
    </>
  )
}

export default RegisteredUser