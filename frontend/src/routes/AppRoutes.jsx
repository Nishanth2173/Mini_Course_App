import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Signup from '../pages/SignUp'
import NotFound from '../pages/NotFound'
import ForgotPassword from '../pages/ForgotPassword'
import Home from '../pages/Home'
import CourseDetail from '../pages/CourseDetails'
import MyCourses from '../pages/MyCourses'
import ChangePassword from '../pages/ChangePassword'
import ProtectedRoute from './ProtectedRoutes'

function AppRoutes() {
    return (
        <Routes>
            <Route>
                <Route path='/' element={<Login />} />
                <Route path='*' element={<NotFound />} />
            </Route>
            <Route>
                <Route path='/signup' element={<Signup />} />
                <Route path='*' element={<NotFound />} />
            </Route>
            <Route >
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='*' element={<NotFound />} />
            </Route>
            <Route>
                <Route path='/courses' element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path='*' element={<NotFound />} />
            </Route>
            <Route>
                <Route path='/course/:id' element={<ProtectedRoute><CourseDetail /></ProtectedRoute>} />
                <Route path='*' element={<NotFound />} />
            </Route>
            <Route>
                <Route path='/my-courses' element={<ProtectedRoute><MyCourses /></ProtectedRoute>} />
                <Route path='*' element={<NotFound />} />
            </Route>
            <Route path='/change-password' element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
        </Routes>
        
    )
}

export default AppRoutes
