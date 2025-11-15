import React from 'react'
import { useState } from "react"
import { useNavigate, Link, Navigate } from 'react-router-dom'
import axios from "axios"
import { toast } from 'react-toastify'

const Loginform = ({ setauthenticated }) => {

  let navigate = useNavigate();

  const [input, setinput] = useState({
    email: "",
    password: ""
  })

  let changeinput = (e) => {
    let inputCopy = { ...input };
    inputCopy[e.target.name] = e.target.value;
    setinput(inputCopy);
  }

  const submit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post("http://localhost:3000/api/user/login", input);
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("email", res.data.email);
        setauthenticated(true);
        setTimeout(() => {
          navigate("/data");
        }, 2000)
        toast.success(res.data.message);
      }
    }
    catch (err) {
      if (err.response) {
        console.log("user/login error -")
        console.log(err.response);
        toast.error(err.response.data.message);
      }
      else {
        toast.warn("server error");
      }
    }
    setinput({
      email: "",
      password: ""
    })
  }

  const forgottask = () => {
    navigate("/forgotpassword");
  }

  return (
    <>
      <div className="min-h-screen w-full flex flex-col justify-center items-center 
                    p-4 bg-gradient-to-br from-indigo-100 to-blue-200">

        <form
          onSubmit={submit}
          className="w-full max-w-[420px] sm:max-w-[380px] md:max-w-[420px] lg:max-w-[450px]
                   bg-white shadow-lg rounded-xl p-6 sm:p-8 flex flex-col gap-6"
        >

          <div className="bg-indigo-200 text-indigo-800 rounded-md px-4 py-1 text-lg font-semibold 
                        text-center">
            Login Form
          </div>

          <div className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-3
                        flex items-center gap-2">
            <label className="text-gray-700 font-medium whitespace-nowrap text-sm sm:text-base">
              Email:
            </label>
            <input
              className="flex-1 bg-transparent outline-none text-sm sm:text-base"
              name="email"
              placeholder="Enter email"
              required
              value={input.email}
              onInput={changeinput}
            />
          </div>

          <div className="w-full bg-purple-50 border border-purple-200 rounded-lg px-4 py-3
                        flex items-center gap-2">
            <label
              htmlFor="password"
              className="text-gray-700 font-medium whitespace-nowrap text-sm sm:text-base"
            >
              Password:
            </label>
            <input
              id="password"
              className="flex-1 bg-transparent outline-none text-sm sm:text-base"
              name="password"
              placeholder="Enter password"
              required
              value={input.password}
              onInput={changeinput}
              type="password"
            />
          </div>

          <button
            className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold
                     hover:bg-indigo-700 transition text-sm sm:text-base"
          >
            Login
          </button>

          <p
            className="text-indigo-700 text-xs sm:text-sm cursor-pointer hover:underline text-right"
            onClick={forgottask}
          >
            Forgot Password?
          </p>

          <p className="text-sm text-center bg-indigo-50 py-2 rounded-md w-full text-gray-700">
            Don't have an account? —{" "}
            <Link to="/signup" className="font-semibold text-indigo-700 hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </div>



      {/* <div className='w-screen h-screen flex flex-col justify-center items-center p-[40px] sm:p-4'>
        <form className='h-[70%] w-[100%] sm:w-[40%] lg:w-[30%] sm:h-[60%] flex flex-col justify-evenly items-center whitespace-nowrap p-4 gap-y-[15px]' onSubmit={onsubmit}>
          <div className='rounded-[3px] px-[5px]'>Login-Form</div>
            <div className='self-start w-full rounded-[50px] px-[15px]'>
              <label>Email : <input className="w-[80%] outline-none" name="email" placeholder="enter email" required onInput={typing} value={login.name} />
              </label>
            </div>
            <div className='self-start w-full rounded-[50px] px-[15px]'>
              <label htmlFor='password'>Password : </label>
              <input className="w-[70%] outline-none" name="password" id="password" placeholder="enter password" required onInput={typing} value={login.password} />
            </div>
            <button className='self-stretch rounded-[3px]'>Login</button>
            <p className='whitespace-normal text-[12px] sm:whitespace-nowrap self-stretch text-center'>Don't have an account? -- <Link to="/signup" className='hover:underline'>Register here</Link></p>
        </form> */}
      {/* <div className='whitespace-nowrap'>Don't have account -- <Link to="/signup">Register here</Link></div> */}
      {/* </div> */}

      {/* <div className="bg-red-500 w-screen min-h-screen flex flex-col justify-center items-center p-4">
  <form 
    className="bg-yellow-500 w-full max-w-md sm:w-1/3 sm:h-auto flex flex-col justify-evenly items-center p-6 rounded-lg shadow-lg"
    onSubmit={onsubmit}
  >
    <div className="bg-pink-500 self-stretch mb-4 p-2 rounded">
      <label className="block mb-1 font-semibold" htmlFor="email">
        Email:
      </label>
      <input 
        type="email"
        name="email"
        id="email"
        placeholder="Enter email"
        required
        onInput={typing}
        value={login.name}
        className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <div className="bg-orange-500 self-stretch mb-6 p-2 rounded">
      <label className="block mb-1 font-semibold" htmlFor="password">
        Password:
      </label>
      <input 
        type="password"
        name="password"
        id="password"
        placeholder="Enter password"
        required
        onInput={typing}
        value={login.password}
        className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <button 
      type="submit" 
      className="bg-red-200 self-stretch py-3 rounded font-semibold hover:bg-red-300 transition"
    >
      Login
    </button>

    <div className="mt-4 text-center text-sm text-white">
      Don't have an account? -- <Link className="text-blue-300 underline" to="/signup">Register here</Link>
    </div>
  </form>
</div> */}

    </>
  )
}

export default Loginform