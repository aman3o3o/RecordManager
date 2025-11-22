import React from 'react'
import Loginform from './Component/Loginform'
import Signupform from './Component/Signupform'
import { Routes, Route, Navigate } from 'react-router-dom'
import Todoform from './Component/Todoform'
import Databox from './Component/Databox'
import WrongRoute from './Component/WrongRoute'
import { ToastContainer, Bounce } from 'react-toastify'
import { useState } from 'react'
import Unauthenticated from './Component/Unauthenticated'
import Data from './Component/Data'
import ForgotPassword from './Component/Forgotpassword'
import Resetpassword from './Component/Resetpassword'
import Loader from './Component/Loader'
import RegisteredUser from './Component/RegisteredUser'
import ProtectedRoute from "./Component/ProtectedRoute"

const App = () => {

    const [authenticated, setauthenticated] = useState(localStorage.getItem("token") ? true : false);
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={authenticated ? <ProtectedRoute authenticated={authenticated}>
                    <Data setauthenticated={setauthenticated} />
                </ProtectedRoute>
                    : <Loginform setauthenticated={setauthenticated} />} />
                <Route path="/signup" element={authenticated ? <ProtectedRoute authenticated={authenticated} children={<Data />} /> : <Signupform />} />
                <Route path="/data" element={<ProtectedRoute authenticated={authenticated}>
                    <Data setauthenticated={setauthenticated} />
                </ProtectedRoute>} />
                <Route path="*" element={<WrongRoute />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/resetpassword/:token" element={<Resetpassword />} />
                <Route path="/totaluser" element={<ProtectedRoute authenticated={authenticated}>
                    <RegisteredUser setauthenticated={setauthenticated} />
                </ProtectedRoute>} />
            </Routes>
        </>
    )
}

export default App

