import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Databox from './Databox'
import { useNavigate } from 'react-router-dom'
import Loader from "./Loader"


const Todoform = ({ setauthenticated , pingdata, fetch,fetchdata}) => {

    const navigate = useNavigate();

    const [isloading, setisloading] = useState(null);

    const [input, setinput] = useState({
        email: "",
        experience: "",
        salary: "",
        state: "",
        designation: "",
        number: "",
        country: "",
        dob: "",
        company: "",
        id: ""
    })

    const changeinput = (e) => {
        let inputCopy = { ...input };
        inputCopy[e.target.name] = e.target.value;
        setinput(inputCopy);
    }

    const submit = async (e) => {
        e.preventDefault();
        setisloading("submit");
        if (input.id) {
            try {
                let res = await axios.patch(`http://localhost:3000/api/data/update/${input.id}`,input,{headers:{authorization:localStorage.getItem("token")}});
                if (res.data.success) {
                    await fetchdata();
                    toast.success(res.data.message);
                    setinput({
                        experience: "",
                        salary: "",
                        state: "",
                        designation: "",
                        number: "",
                        country: "",
                        dob: "",
                        company: "",
                        id: ""
                    })
                }
            }
            catch (err) {
                if (err.response) {
                    console.log("/todo/update error -");
                    console.log(err.response);
                    toast.error(err.response.data.message);
                }
                else {
                    toast.warn("server error");
                }
            }
            finally {
                setisloading(null);
            }
        }
        else {
            try {
                let res = await axios.post(`http://localhost:3000/api/data/insert`,input,{headers : {authorization : localStorage.getItem("token")}});
                if (res.data.success) {
                    await fetchdata();
                    toast.success(res.data.message);
                    setinput({
                        experience: "",
                        salary: "",
                        state: "",
                        designation: "",
                        number: "",
                        country: "",
                        dob: "",
                        company: "",
                        id: ""
                    })
                }
            }
            catch (err) {
                if (err.response) {
                    console.log("/todo/insert error -");
                    console.log(err.response);
                    toast.error(err.response.data.message);
                }
                else {
                    toast.warn("server error");
                }
            }
            finally {
                setisloading(null);
            }
        }
    }

    const logout = () => {
        setisloading("logout");
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        setTimeout(() => {
            toast.success("you are successfully logged out");
            setTimeout(() => {
                setauthenticated(false);
                navigate("/");
                setisloading(null);
            }, 1000)
        }, 2000)
    }

    // const fetchdata = async () => {
    //     try {
    //         let res = await axios.post("http://localhost:3000/api/data/fetch",{},{headers : {authorization : localStorage.getItem("token")}});
    //         if (res.data.success) {
    //             setfetch(res.data.data);
    //             toast.success(res.data.message);
    //         }
    //     }
    //     catch (err) {
    //         if (err.response) {
    //             console.log("/todo/fetch error -");
    //             console.log(err.response);
    //             toast.error(err.response.data.message);
    //         }
    //         else {
    //             toast.warn("server error");
    //         }
    //     }
    // }

    return (
        <>
            <div className='flex h-[100vh] overflow-hidden border-[20px] border-indigo-200 bg-[#f8fbff]'>
                <form onSubmit={submit} className='flex-4 flex flex-col justify-center items-center text-gray-800'>
                    <h1 className='text-xl font-bold mb-[10px] text-indigo-600'>Input Table</h1>
                    <div className='w-full h-[60%] flex flex-col justify-evenly items-center'>

                        <div className='w-[80%] ml-[10px]'>
                            {/* <label htmlFor='country' className='cursor-pointer text-indigo-600'>Country : </label> */}
                            <input
                                className="bg-white text-gray-900 border border-indigo-300 px-2 rounded w-full"
                                placeholder="Enter country"
                                value={input.country}
                                name="country"
                                onInput={changeinput}
                                id="country"
                                required />
                        </div>

                        <div className='w-[80%] ml-[10px]'>
                            {/* <label htmlFor='state' className='cursor-pointer text-indigo-600'>State : </label> */}
                            <input
                                className="bg-white text-gray-900 border border-indigo-300 px-2 rounded w-full"
                                placeholder="Enter state"
                                value={input.state}
                                name="state"
                                onInput={changeinput}
                                id="state"
                                required />
                        </div>

                        <div className='w-[80%] ml-[10px]'>
                            {/* <label htmlFor='dob' className='cursor-pointer text-indigo-600'>Dob : </label> */}
                            <input
                                type="date"
                                className="bg-white text-gray-900 border border-indigo-300 px-2 rounded w-full"
                                placeholder="Enter date of birth"
                                value={input.dob}
                                name="dob"
                                onInput={changeinput}
                                id="dob"
                                required />
                        </div>

                        <div className='w-[80%] ml-[10px]'>
                            {/* <label htmlFor='number' className='cursor-pointer text-indigo-600'>Number : </label> */}
                            <input
                                className="bg-white text-gray-900 border border-indigo-300 px-2 rounded w-full"
                                placeholder="Enter number"
                                value={input.number}
                                name="number"
                                onInput={changeinput}
                                id="number"
                                required />
                        </div>

                        <div className='w-[80%] ml-[10px]'>
                            {/* <label htmlFor='company' className='cursor-pointer text-indigo-600'>Company : </label> */}
                            <input
                                className="bg-white text-gray-900 border border-indigo-300 px-2 rounded w-full"
                                placeholder="Enter company"
                                value={input.company}
                                name="company"
                                onInput={changeinput}
                                id="company"
                                required />
                        </div>

                        <div className='w-[80%] ml-[10px]'>
                            {/* <label htmlFor='designation' className='cursor-pointer text-indigo-600'>Designation : </label> */}
                            <input
                                className="bg-white text-gray-900 border border-indigo-300 px-2 rounded w-full"
                                placeholder="Enter designation"
                                value={input.designation}
                                name="designation"
                                onInput={changeinput}
                                id="designation"
                                required />
                        </div>

                        <div className='w-[80%] ml-[10px]'>
                            {/* <label htmlFor='salary' className='cursor-pointer text-indigo-600'>Salary : </label> */}
                            <input
                                className="bg-white text-gray-900 border border-indigo-300 px-2 rounded w-full"
                                placeholder="Enter salary"
                                value={input.salary}
                                name="salary"
                                onInput={changeinput}
                                id="salary"
                                required />
                        </div>

                        <div className='w-[80%] ml-[10px]'>
                            {/* <label htmlFor='experience' className='cursor-pointer text-indigo-600'>Experience : </label> */}
                            <input
                                className="bg-white text-gray-900 border border-indigo-300 px-2 rounded w-full"
                                placeholder="Enter experience"
                                value={input.experience}
                                name="experience"
                                onInput={changeinput}
                                id="experience"
                                required />
                        </div>

                    </div>

                    <div className='flex items-center mt-[5px]'>

                        <button
                            disabled={isloading}
                            type="submit"
                            className='mr-[50px] cursor-pointer disabled:cursor-not-allowed hover:text-green-600 text-[20px] w-[75px] rounded'
                        >
                            {isloading === "submit" ? <Loader width={25} height={25} /> : (input.id ? "Update" : "Submit")}
                        </button>

                        <button
                            disabled={isloading}
                            type="button"
                            onClick={logout}
                            className='cursor-pointer hover:text-red-600 inline-flex justify-center items-center w-[60px] disabled:cursor-not-allowed text-[20px] bg-white border-red-400 rounded'
                        >
                            {isloading === "logout" ? <Loader width={22} height={22} /> : "Logout"}
                        </button>

                    </div>
                </form>
                <Databox setinput={setinput} setauthenticated={setauthenticated} fetch={fetch} pingdata={pingdata} fetchdata={fetchdata}/>
            </div>
        </>
    )
}

export default Todoform



{/* a - flex-4 flex flex-col items-center justify-evenly */ }
// <form onSubmit={submit} className='a w-full md:w-4/12 flex flex-col items-center justify-start p-4'>
//     <div className='bg-[#c56c37] text-center rounded-[5px] px-[5px]'>Input Table</div>
{/* b - bg-gray-100 w-[80%] h-[60%] flex flex-col justify-evenly p-[20px] */ }
// <div className="b bg-gray-100 w-full md:w-[80%] h-auto flex flex-col p-4 space-y-4 mt-4">
//     <div className=''>
//         <label className='' htmlFor='name'>Name : </label>
//         <input name="name" placeholder="Enter Name" value={input.name} onInput={changeinput} required className='py-[5px] px-[10px] appearance-auto outline' />
//     </div>
//     <div className=''>
//         <label htmlFor='email'>Email : </label>
//         <input name="email" placeholder="Enter Email" value={input.email} onInput={changeinput} required className='py-[5px] px-[10px] outline' />
//     </div>
//     <div className=''>
//         <label htmlFor='number'>Number : </label>
//         <input name="number" placeholder="Enter Number" value={input.number} onInput={changeinput} required className='py-[5px] px-[10px] outline' />
//     </div>
//     <div className=''>
//         <label htmlFor='country'>Country : </label>
//         <input name="country" placeholder="Enter Age" value={input.country} onInput={changeinput} required className='py-[5px] px-[10px] outline' />
//     </div>
//     <div className=''>
//         <label htmlFor='age'>Age : </label>
//         <input name="age" placeholder="Enter DOB" value={input.age} onInput={changeinput} required className='py-[5px] px-[10px] outline' />
//     </div>
// </div>
{/* m - bg-green-400 , n - 28a745 */ }
// <button className='m bg-green-400 mt-4 px-4 py-2 rounded w-full md:w-auto'>Update</button>
{/* : <button className='n bg-[#28a745] mt-4 px-4 py-2 rounded w-full md:w-auto'>Submit</button> */ }
// </form>