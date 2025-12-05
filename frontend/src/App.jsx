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
import { lazy, Suspense } from 'react';
const RegisteredUser = lazy(() => import('./Component/RegisteredUser'));
import ProtectedRoute from "./Component/ProtectedRoute"
import { useLocation } from 'react-router-dom'

const App = () => {

    const location = useLocation();

    const [authenticated, setauthenticated] = useState(localStorage.getItem("token") ? true : false);
    console.log("current location -", location);
    console.log(authenticated);
    return (
        <>
            <Suspense fallback={<h2>Loading...</h2>}>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={authenticated ? <Navigate to="/data" /> : <Loginform setauthenticated={setauthenticated} />} />
                    <Route path="/signup" element={authenticated ? <Navigate to="/data" /> : <Signupform />} />
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
            </Suspense>
        </>
    )
}

export default App

