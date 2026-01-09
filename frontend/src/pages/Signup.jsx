import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import Button from '../components/Button'
import Input from '../components/Input'
import AuthCard from '../components/AuthCard'
import { passwordOk } from '../utils/passwordStrength'


function Signup() {
  const [f,setF]=useState({name:'',email:'',password:''})
  const [err,setErr]=useState({})
  const nav = useNavigate()

  const level = passwordOk(f.password)

  async function submit() {
    let e = {}
    if (!f.name) e.name = 'Name is required'
    if (!f.email) e.email = 'Email is required'
    if (!f.password) e.password = 'Password is required'
    if (level === 'weak')
      e.password = 'Password must be at least 6 characters'

    if (Object.keys(e).length) return setErr(e)

    setErr({})

  try {
        await api.post('/auth/signup',f)
        nav('/')
      } catch (err) {
        if (err.response?.data?.msg?.includes('exists')) {
          setErr({ email: 'Email already registered' })
        }
      }
    }

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      
      <div className="hidden md:flex items-center justify-center
        bg-linear-to-br from-purple-600 to-indigo-600 text-white p-12">
        <div>
          <h1 className="text-5xl font-extrabold">
            Join Us 🚀
          </h1>
          <p className="mt-4 text-purple-100">
            Start your learning journey today
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center bg-gray-50 p-6">
        <AuthCard
          title="Create account"
          subtitle="It takes less than a minute"
        >
          <div className="space-y-4">

            <Input
              label="Name"
              error={err.name}
              onChange={e=>setF({...f,name:e.target.value})}
            />

            <Input
              label="Email"
              error={err.email}
              onChange={e=>setF({...f,email:e.target.value})}
            />

            <Input
              label="Password"
              type="password"
              error={err.password}
              onChange={e=>setF({...f,password:e.target.value})}
            />
            {f.password && (
              <p className={`text-sm font-medium
                ${level==='weak' && 'text-red-500'}
                ${level==='medium' && 'text-yellow-500'}
                ${level==='strong' && 'text-green-600'}`}>
                Password strength: {level}
              </p>
            )}

            <Button text="Sign Up" full onClick={submit} />

            <p className="text-sm text-center text-gray-600">
              Already have an account?
              <Link to="/" className="text-indigo-600 font-medium">
                {' '}Login
              </Link>
            </p>

          </div>
        </AuthCard>
      </div>
    </div>
  )
}

export default Signup
