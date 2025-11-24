import React from 'react'
import Todoform from './Todoform';
import Accessdenied from './Accessdenied';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

const Data = ({ setauthenticated }) => {

    const [verified, setverified] = useState(false);

    const [fetch, setfetch] = useState([]);

    const [pingdata, setpingdata] = useState({});

    // const getdata = async () => {
    //     try{
    //         let res = await axios.post("http://localhost:3000/api/tokenvalidate",{},{headers:{authorization:localStorage.getItem("token")}})
    //         if(res.data.success){
    //             setpingdata(res.data.data);
    //             setshowdata(true);
    //             toast.success(res.data.message);
    //         }
    //     }
    //     catch(err){
    //         if(err.response){
    //             console.log("tokenvalidate error -");
    //             console.log(err.response);
    //             toast.error(err.response.data.message);
    //         }
    //         else{
    //             toast.error("server error");
    //         }
    //     }
    // }

    const fetchdata = async () => {
        try {
            let res = await axios.get("http://localhost:3000/api/data/fetch",{headers:{authorization:localStorage.getItem("token")}});
            if (res.data.success) {
                setverified(true);
                setfetch(res.data.data);
                setpingdata({ name: res.data.name, email: res.data.email })
                toast.success(res.data.message);
            }
        }
        catch (err) {
            if (err.response) {
                console.log("/todo/fetch error -");
                console.log(err.response);
                toast.error(err.response.data.message);
            }
            else {
                toast.warn("server error");
            }
        }
    }

    useEffect(() => {
        // getdata();
        fetchdata();
    }, [])
    return (
        <>
            {verified ? <Todoform setauthenticated={setauthenticated} pingdata={pingdata} fetch={fetch} fetchdata={fetchdata}/> : <Accessdenied />}
        </>
    )
}

export default Data