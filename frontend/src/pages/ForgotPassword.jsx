import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Input from '../components/Input'
import AuthCard from '../components/AuthCard'

function ForgotPassword() {
  const [email,setEmail]=useState('')
  const [msg,setMsg]=useState('')
  const [err,setErr]=useState('')

  function submit() {
    if (!email) return setErr('Email is required')
    setErr('')
    setMsg('If this email exists, a reset link will be sent.')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <AuthCard
        title="Forgot password?"
        subtitle="We’ll help you get back in"
      >
        <div className="space-y-4">
          <Input
            label="Email"
            error={err}
            onChange={e=>setEmail(e.target.value)}
          />

          {msg && (
            <p className="text-sm text-green-600">{msg}</p>
          )}

          <Button text="Send reset link" onClick={submit} />

          <p className="text-sm text-center">
            <Link to="/" className="text-indigo-600">
              Back to login
            </Link>
          </p>
        </div>
      </AuthCard>
    </div>
  )
}

export default ForgotPassword