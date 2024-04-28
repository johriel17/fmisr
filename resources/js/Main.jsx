import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'

import Login from './pages/auth/Login'
import AdminLTE from './AdminLTE'
import { useAuthContext } from './hooks/useAuthContext'

const Main = () => {

  const {user} = useAuthContext()

  return (
    <BrowserRouter>
    <ToastContainer closeOnClick={false} theme='colored' hideProgressBar />
      <Routes>  
        <Route path='/*' element={user? <AdminLTE /> : <Navigate to='/login' /> } />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Main