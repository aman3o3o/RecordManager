import React from 'react'
import axios from "axios"
import { toast } from 'react-toastify'
import { useState } from "react"
import Backtologin from './Backtologin'

const ForgotPassword = () => {

    const [input, setinput] = useState({
        email: ""
    })

    const change = (e) => {
        let copy = { ...input };
        copy[e.target.name] = e.target.value;
        setinput(copy);
    }

    const submit = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.post("http://localhost:3000/api/forgotpassword", input);
            if (res.data.success) {
                setinput({
                    email: ""
                })
                toast.success(res.data.message);
            }
        }
        catch (err) {
            if (err.response) {
                toast.error(err.response.data.message);
                console.log("forgot password error -");
                console.log(err.response);
            }
            else {
                toast.error("server error");
            }
        }
    }
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-200 p-4">
                <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
                        Forgot Password
                    </h1>

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <input
                                name="email"
                                type="email"
                                placeholder="Enter email"
                                value={input.email}
                                onInput={change}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
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

export default ForgotPassword