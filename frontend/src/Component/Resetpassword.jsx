import React from 'react'
import axios from "axios"
import { useState } from "react"
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Backtologin from './Backtologin'

const Resetpassword = () => {

    let { token } = useParams();

    const [input, setinput] = useState({
        password: "",
        confirmpass: ""
    })

    let change = (e) => {
        let copy = { ...input };
        copy[e.target.name] = e.target.value;
        setinput(copy);
    }

    const submit = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.post(`http://localhost:3000/api/resetpassword/${token}`, input);
            if (res.data.success) {
                toast.success(res.data.message);
                setinput({
                    password: "",
                    confirmpass: ""
                })
            }
        }
        catch (err) {
            if (err.response) {
                console.log("resetpassword error -");
                console.log(err.response);
                toast.error(err.response.data.message);
            }
            else {
                toast.error("server error");
            }
        }
    }
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-200 p-4">
        <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">

            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Reset Password
            </h1>

            <form onSubmit={submit} className="space-y-5">

                <div>
                    <label
                        htmlFor="newpass"
                        className="block mb-1 font-medium text-gray-700"
                    >
                        New Password:
                    </label>

                    <input
                        type="password"
                        id="newpass"
                        name="password"
                        placeholder="Enter new password"
                        value={input.password}
                        onInput={change}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md 
                        focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    />
                </div>

                <div>
                    <label
                        htmlFor="confirmpass"
                        className="block mb-1 font-medium text-gray-700"
                    >
                        Confirm Password:
                    </label>

                    <input
                        type="password"
                        id="confirmpass"
                        name="confirmpass"
                        placeholder="Confirm password"
                        value={input.confirmpass}
                        onInput={change}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md 
                        focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold 
                    hover:bg-indigo-700 transition duration-200"
                >
                    Submit
                </button>
            </form>

            <div className="mt-6 text-center">
                <Backtologin />
            </div>

        </div>
    </div>
        </>
    )
}

export default Resetpassword
