import React from 'react'
import Todoform from './Todoform';
import Accessdenied from './Accessdenied';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

const Data = ({setauthenticated}) => {

    const [showdata, setshowdata] = useState(false);

    const getdata = async () => {
        try{
            let res = await axios.post("http://localhost:3000/api/tokenvalidate",{},{headers:{authorization:localStorage.getItem("token")}})
            if(res.data.success){
                setshowdata(true);
                toast.success(res.data.message);
            }
        }
        catch(err){
            if(err.response){
                console.log("tokenvalidate error -");
                console.log(err.response);
                toast.error(err.response.data.message);
            }
            else{
                toast.error("server error");
            }
        }
    }

    useEffect(()=>{
        getdata();
    },[])
  return (
    <>
    {showdata ? <Todoform setauthenticated={setauthenticated}/> : <Accessdenied/>}
    </>
  )
}

export default Data