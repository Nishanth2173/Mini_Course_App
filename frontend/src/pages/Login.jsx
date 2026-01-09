import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import Button from '../components/Button'
import Input from '../components/Input'
import AuthCard from '../components/AuthCard'
import Popup from '../components/Popup'

function Login() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [err,setErr]=useState({})
  const [popup,setPopup]=useState('')
  const nav = useNavigate()

  async function submit() {
  let e={}
  if (!email) e.email='Email is required'
  if (!password) e.password='Password is required'
  if (Object.keys(e).length) return setErr(e)

  setErr({})

  try {
    const { data } = await api.post('/auth/login',{email,password})
    localStorage.setItem('token',data.token)
    nav('/courses')
    } catch (err) {
      const msg =
        err.response?.data?.msg ||
        'Email or password is incorrect. Please try again.'
      setPopup(msg)
    }
  }

  return (
    <>
      <Popup msg={popup} onClose={()=>setPopup('')} />

      <div className="min-h-screen grid md:grid-cols-2">
        <div className="hidden md:flex items-center justify-center
          bg-linear-to-br from-indigo-600 to-purple-600 text-white p-12">
          <div>
            <h1 className="text-5xl font-extrabold leading-tight">
              Welcome Back
            </h1>
            <p className="mt-4 text-indigo-100">
              Learn • Build • Grow with us
            </p>
         </div>
        </div>

        <div className="flex items-center justify-center bg-gray-50 p-6">
          <AuthCard title="Login" subtitle="Access your dashboard">
            <div className="space-y-4">
              <Input label="Email" error={err.email}
                onChange={e=>setEmail(e.target.value)} />

              <Input label="Password" type="password"
                error={err.password}
                onChange={e=>setPassword(e.target.value)} />
              <p className="text-sm text-right">
                  <Link to="/forgot-password" className="text-indigo-600">
                    Forgot password?
                  </Link>
              </p>  

              <Button text="Login" full onClick={submit} />

              <p className="text-sm text-center text-gray-600">
                New here?
                <Link to="/signup" className="text-indigo-600 font-medium">
                  {' '}Create account
                </Link>
              </p>
            </div>
          </AuthCard>
        </div>
      </div>
    </>
  )
}

export default Login
