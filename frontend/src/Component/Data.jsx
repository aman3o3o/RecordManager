import React from 'react'
import Todoform from './Todoform';
import Accessdenied from './Accessdenied';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';

const Data = ({ setauthenticated }) => {

    console.log("Data jsx -");

    let {email} = useParams();

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
            if(email){
                var res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/data/fetchE/${email}`,{headers:{authorization:localStorage.getItem("token")}});
            }
            // if(localStorage.getItem("email")){
            //     var email = localStorage.getItem("email");
            //     var res = await axios.post("http://localhost:3000/api/data/fetchE",{email},{headers:{authorization:localStorage.getItem("token")}});
            // }
            else{
                var res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/data/fetch`,{headers:{authorization:localStorage.getItem("token")}});
            }
            if (res.data.success) {
                setverified(true);
                setfetch(res.data.data);
                setpingdata({ name: res.data.name, email: res.data.email })
                toast.success(res.data.message);
            }
        }
        catch (err) {
            if (err.response) {
                console.log("/data/fetch error -");
                console.log(err.response);
                toast.error(err.response.data.message);
            }
            else {
                toast.warn("server error");
            }
        }
    }

    useEffect(() => {
        console.log("Data component useeffect");
        // getdata();
        fetchdata();
    },[])
    return (
        <>
            {verified ? <Todoform setauthenticated={setauthenticated} pingdata={pingdata} fetch={fetch} fetchdata={fetchdata}/> : <Accessdenied />}
        </>
    )
}

export default Data









// const showData = (email) => { navigate("/data",{state:{email}}) } /data route - component - const fetchdata = async () => { try { if(location.state?.email){ console.log("email"); var res = await axios.get(http://localhost:3000/api/data/fetchE/${location.state.email},{headers:{authorization:localStorage.getItem("token")}}); } // if(localStorage.getItem("email")){ // var email = localStorage.getItem("email"); // var res = await axios.post("http://localhost:3000/api/data/fetchE",{email},{headers:{authorization:localStorage.getItem("token")}}); // } else{ console.log("token"); var res = await axios.get("http://localhost:3000/api/data/fetch",{headers:{authorization:localStorage.getItem("token")}}); } if (res.data.success) { setverified(true); setfetch(res.data.data); setpingdata({ name: res.data.name, email: res.data.email }) toast.success(res.data.message); } } catch (err) { if (err.response) { console.log("/data/fetch error -"); console.log(err.response); toast.error(err.response.data.message); } else { toast.warn("server error"); } } } useEffect(() => { console.log("Data component useeffect"); // getdata(); fetchdata(); },[]) bhai yaha sirf second wala data/fetch api kyu run ho raha hai ? console me sirf token print ho raha hai ? kuch samaj nahi aaya bhai