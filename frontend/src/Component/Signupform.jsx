import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import signup_img from "../images/signup.png"
import axios from 'axios'
import { toast } from 'react-toastify'

const Signupform = () => {

    const navigate = useNavigate();

    const [input, setinput] = useState({
        name: "",
        email: "",
        password: ""
    })

    const changeinput = (e) => {
        let inputCopy = { ...input };
        inputCopy[e.target.name] = e.target.value;
        setinput(inputCopy);
    }

    const submit = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.post("http://localhost:3000/api/user/signup", input);
            if (res.data.success) {
                setTimeout(() => {
                    navigate("/login");
                }, 2000)
                toast.success(res.data.message);
            }
            setinput({
                name: "",
                email: "",
                password: ""
            })
        }
        catch (err) {
            if (err.response) {
                console.log("user/signup error-");
                console.log(err.response);
                toast.error(err.response.data.message);
                if (err.response.status === 409) {
                    setinput({
                        name: "",
                        email: "",
                        password: ""
                    })
                }
            }
            else {
                toast.warn("server error");
                setinput({
                    name: "",
                    email: "",
                    password: ""
                })
            }
        }
    }

    return (
        <>
            <div className="w-screen min-h-screen flex justify-center items-center 
                    bg-gradient-to-br from-indigo-100 to-blue-200 p-4">

                <form
                    onSubmit={submit}
                    className="w-full max-w-sm bg-white shadow-lg rounded-xl p-6 flex flex-col 
                   items-center space-y-5"
                >
                    <h1 className="text-2xl font-semibold text-gray-800">Signup Form</h1>

                    <div className="w-2/3 sm:w-1/2 rounded-2xl overflow-hidden shadow">
                        <img src={signup_img} alt="signup" className="w-full h-auto rounded-2xl" />
                    </div>

                    <input
                        className="py-2 px-4 rounded-lg w-4/5 bg-indigo-50 border border-indigo-200
                     outline-none focus:ring-2 focus:ring-indigo-300 transition"
                        name="name"
                        placeholder="Enter name"
                        required
                        value={input.name}
                        onInput={changeinput}
                    />

                    <input
                        className="py-2 px-4 rounded-lg w-4/5 bg-indigo-50 border border-indigo-200
                     outline-none focus:ring-2 focus:ring-indigo-300 transition"
                        name="email"
                        placeholder="Enter email"
                        required
                        value={input.email}
                        onInput={changeinput}
                    />

                    <input
                        className="py-2 px-4 rounded-lg w-4/5 bg-indigo-50 border border-indigo-200
                     outline-none focus:ring-2 focus:ring-indigo-300 transition"
                        name="password"
                        placeholder="Enter password"
                        required
                        value={input.password}
                        onInput={changeinput}
                        type="password"
                    />

                    <button
                        className="bg-indigo-600 text-white py-2 rounded-md w-4/5 font-medium
                     hover:bg-indigo-700 transition"
                    >
                        Register
                    </button>

                    <p className="text-sm text-gray-700 text-center">
                        Already have an account?{" "}
                        <Link to="/login" className="text-indigo-700 font-medium hover:underline">
                            Login here
                        </Link>
                    </p>
                </form>
            </div>
        </>
    );

}

export default Signupform