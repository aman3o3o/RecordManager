import React from 'react'
import Loginform from './Component/Loginform'
import Signupform from './Component/Signupform'
import { Routes, Route, Navigate } from 'react-router-dom'
import Todoform from './Component/Todoform'
import Databox from './Component/Databox'
import WrongRoute from './Component/WrongRoute'
import { ToastContainer , Bounce} from 'react-toastify'
import { useState } from 'react'
import Refreshhandler from './Component/Refreshhandler'
import Unauthenticated from './Component/Unauthenticated'
import Data from './Component/Data'
import ForgotPassword from './Component/Forgotpassword'
import Resetpassword from './Component/Resetpassword'
import Loader from './Component/Loader'

const App = () => {

    const [authenticated, setauthenticated] = useState(localStorage.getItem("token") ? true : false);
    return (
        <>
        {authenticated ? <Refreshhandler/> : null}
            <Routes>
                <Route path="/" element={authenticated?null:<Navigate to="/login" />} />
                <Route path="/login" element={<Loginform setauthenticated = {setauthenticated}/>} />
                <Route path="/signup" element={<Signupform />} />
                <Route path="/data" element={authenticated ? <Data setauthenticated={setauthenticated}/> : <Unauthenticated/>} />
                <Route path="*" element={<WrongRoute />} />
                <Route path="/forgotpassword" element={<ForgotPassword/>}/>
                <Route path="/resetpassword/:token" element={<Resetpassword/>}/>
            </Routes>
        </>
    )
}

export default App

