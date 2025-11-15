import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loader from './Loader';
// import axios from 'axios'
import { useState } from 'react';

const Databox = ({ setinput, setauthenticated, fetchdata, fetch }) => {

    const navigate = useNavigate();

    const [isloading, setisloading] = useState(null);

    const [signupData, setsignupData] = useState([]);

    const editf = (country, state, number, dob, company, designation, experience, salary, id) => {
        setinput({
            country,
            state,
            number,
            dob,
            company,
            designation,
            experience,
            salary,
            id
        })
    }

    const deletef = (id) => {
        setisloading(id);
        setTimeout(async () => {
            try {
                let res = await axios.delete(`http://localhost:3000/api/data/delete/${id}`);
                if (res.data.success) {
                    await fetchdata();
                    toast.success(res.data.message);
                }
            }
            catch (err) {
                if (err.response) {
                    console.log("/todo/delete error -");
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
        }, 2000)
    }

    let signup_data_fetch = async () => {
        try {
            let res = await axios.get(`http://localhost:3000/api/user/fetch/${localStorage.getItem("email")}`);
            if (res.data.success) {
                setsignupData(res.data.signupdata);
            }
        }
        catch (err) {
            if (err.response) {
                console.log("user/fetch error -");
                console.log(err.response);
                toast.error(err.response.data.message);
            }
        }
    }

    let database_fetching = async () => {
        await signup_data_fetch();
        fetchdata();
    }

    useEffect(() => {
        database_fetching();
    }, [])

    return (
        <>
            <div className='flex-6 overflow-auto flex flex-col items-center'>
                <h1 className='mt-[50px] mb-[10px] text-xl font-bold'>Data Table</h1>
                <div>
                    <div>
                        <strong>Your Name : </strong>
                        <span>{signupData.name}</span>
                    </div>
                    <div>
                        <strong>Your Email : </strong>
                        <span>{signupData.email}</span>
                    </div>
                </div>
                <table className="border-separate">
                    <tr className=''>
                        <th className="border-[1px] px-[4px]">Country</th>
                        <th className="border-[1px] px-[4px]">State</th>
                        <th className="border-[1px] px-[4px]">Number</th>
                        <th className="border-[1px] px-[4px]">Dob</th>
                        <th className="border-[1px] px-[4px]">Company</th>
                        <th className="border-[1px] px-[4px]">Designation</th>
                        <th className="border-[1px] px-[4px]">Experience</th>
                        <th className="border-[1px] px-[4px]">Salary</th>
                        <th className="border-[1px] px-[4px]">Action</th>
                    </tr>
                    {/* <tr>
                        <td className='text-center border-[1px] px-[4px]'>Aman Prasad</td>
                        <td className='text-center border-[1px] px-[4px]'>amanprasad3030@gmail.com</td>
                        <td className='text-center border-[1px] px-[4px]'>8582884500</td>
                        <td className='text-center border-[1px] px-[4px]'>Bharat</td>
                        <td className='text-center border-[1px] px-[4px]'>21</td>
                        <td className='text-center border-[1px] px-[4px]'><button className='mr-[5px] hover:text-yellow-500 hover:bg-black'>Edit</button><button className='hover:text-red-600 hover:bg-black'>Delete</button></td>
                    </tr> */}

                    {fetch.length > 0 ? (fetch.map((data) => {
                        return (
                            <tr>
                                <td className='text-center border-[1px] px-[4px]'>{data.country}</td>
                                <td className='text-center border-[1px] px-[4px]'>{data.state}</td>
                                <td className='text-center border-[1px] px-[4px]'>{data.number}</td>
                                <td className='text-center border-[1px] px-[4px]'>{data.dob}</td>
                                <td className='text-center border-[1px] px-[4px]'>{data.company}</td>
                                <td className='text-center border-[1px] px-[4px]'>{data.designation}</td>
                                <td className='text-center border-[1px] px-[4px]'>{data.experience}</td>
                                <td className='text-center border-[1px] px-[4px]'>{data.salary}</td>
                                <td className='text-center border-[1px] px-[4px]'>
                                    <button onClick={() => { editf(data.country, data.state, data.number, data.dob, data.company, data.designation, data.experience, data.salary, data._id) }} className='mr-[5px] hover:text-yellow-500 hover:bg-black'>Edit</button>
                                    <button disabled={isloading} onClick={() => { deletef(data._id) }} className='hover:text-red-600 hover:bg-black w-[46px] flex justify-center items-center disabled:cursor-not-allowed'>{isloading === data._id ? <Loader width={15} height={15} /> : "Delete"}</button>
                                </td>
                            </tr>
                        )
                    })) : (
                        <tr>
                            <td colSpan={9} className='border-[1px] text-center py-[10px] '>No Data Found</td>
                        </tr>
                    )}

                </table>
            </div>
        </>
    )
}

export default Databox



{/* c - bg-gray-50 flex-6 min-w-0 flex flex-col items-center justify-evenly */ }
// <div className='c w-full md:w-8/12 bg-gray-50 flex flex-col items-center justify-start p-4'>
//     <h2 className='bg-[#c56c37] rounded px-[5px]'>Data Table</h2>
//     <h2 className='bg-[#e26113] px-[5px]'>Welcome Aman , here is your Data</h2>
{/* d - h-[60%] bg-white overflow-hidden hover:overflow-auto p-[10px] */ }
// <div className='d w-full overflow-x-auto bg-white p-2 mt-4 rounded'>
{/* e - bg-gray-100 border-separate border-spacing-[10px] */ }
// <table className='e min-w-[600px] w-full bg-gray-100 border-separate border-spacing-2 text-sm md:text-base'>
// <tr className='bg-blue-300'>
{/* w - border-2 text-center */ }
//     <th className="w border-2 text-center px-2 sm:px-4">Name</th>
//     <th className="w border-2 text-center px-2 sm:px-4">Email</th>
//     <th className="w border-2 text-center px-2 sm:px-4">Number</th>
//     <th className="w border-2 text-center px-2 sm:px-4">Country</th>
//     <th className="w border-2 text-center px-2 sm:px-4">Age</th>
//     <th className="w border-2 text-center px-2 sm:px-4">Action</th>
// </tr>

{/* {
                            fetch.map((data)=>{
                                return (
                                    <tr>
                                    <td>{data.name}</td>
                                    <td>{data.email}</td>
                                    <td>{data.number}</td>
                                    <td>{data.age}</td>
                                    <td>{data.dob}</td>
                                    <td>
                                        <button>Edit</button>
                                        <button>Delete</button>
                                    </td>
                                </tr>
                                )
                            })
                        } */}

{/* <tr>
                            <td>Aman Prasad</td>
                            <td>aman@gmail.com</td>
                            <td>1234567891</td>
                            <td>india</td>
                            <td>20</td>
                            <td>
                                <button onClick={() => editf(data.name, data.email, data.number, data.country, data.age, data._id)}>Edit</button>
                                <button onClick={() => deletef(data._id)}>Delete</button>
                            </td>
                        </tr> */}


{/* <tr>
                            <td className={styles.td}>Aman Prasad</td>
                            <td className={styles.td}>amanprasad3030@gmail.com</td>
                            <td className={styles.td}>8582884500</td>
                            <td className={styles.td}>21</td>
                            <td className={styles.td}>30-11-2001</td>
                            <td className={styles.td}>
                                <button className={styles.edit}>Edit</button>
                                <button className={styles.delete} >Delete</button>
                            </td>
                        </tr> */}

{/* {userdata.length === 0 ? <No_data_flag /> : 
                        userdata.map((data) => {
                            return (
                                <tr>
                                    <td className={styles.td}>{data.name}</td>
                                    <td className={styles.td}>{data.email}</td>
                                    <td className={styles.td}>{data.number}</td>
                                    <td className={styles.td}>{data.age}</td>
                                    <td className={styles.td}>{data.dob}</td>
                                    <td className={styles.td}>
                                        <button className={styles.edit} onClick={() => { onedit(data._id, data.name, data.email, data.number, data.age, data.dob) }}>Edit</button>
                                        <button className={styles.delete} onClick={() => { ondelete(data._id) }}>Delete</button>
                                    </td>
                                </tr>
                            );
                        })
                    } */}

{/* </table>
                </div>
                <button className="mt-4 px-4 py-2 bg-red-400 rounded w-full md:w-auto" onClick={logout}>Logout</button>
            </div> */}