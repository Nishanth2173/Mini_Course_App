import React, { useState } from 'react'
import api from '../api/axios'
import Navbar from '../components/Navbar'
import Button from '../components/Button'
import Input from '../components/Input'

function ChangePassword() {
  const [f, setF] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [err, setErr] = useState({})
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  function validate() {
    const e = {}

    if (!f.currentPassword)
      e.currentPassword = 'Current password required'

    if (!f.newPassword)
      e.newPassword = 'New password required'
    else if (f.newPassword.length < 6)
      e.newPassword = 'Minimum 6 characters'

    if (!f.confirmPassword)
      e.confirmPassword = 'Confirm your password'
    else if (f.newPassword !== f.confirmPassword)
      e.confirmPassword = 'Passwords do not match'

    setErr(e)
    return Object.keys(e).length === 0
  }

  async function submit() {
    if (!validate()) return

    setLoading(true)
    setMsg('')

    try {
      await api.put('/auth/change-password', {
        currentPassword: f.currentPassword,
        newPassword: f.newPassword
      })

      setMsg('Password updated successfully ✅')
      setF({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
    } catch (error) {
      setMsg(
        error.response?.data?.msg || 'Password update failed'
      )
    }

    setLoading(false)
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow p-8 w-full max-w-md space-y-6">

          <h1 className="text-2xl font-bold text-center">
            Change Password
          </h1>

          <Input
            label="Current Password"
            type="password"
            error={err.currentPassword}
            onChange={e =>
              setF({ ...f, currentPassword: e.target.value })
            }
          />

          <Input
            label="New Password"
            type="password"
            error={err.newPassword}
            onChange={e =>
              setF({ ...f, newPassword: e.target.value })
            }
          />

          <Input
            label="Confirm Password"
            type="password"
            error={err.confirmPassword}
            onChange={e =>
              setF({ ...f, confirmPassword: e.target.value })
            }
          />

          {msg && (
            <p
              className={`text-sm text-center ${
                msg.includes('success')
                  ? 'text-green-600'
                  : 'text-red-500'
              }`}
            >
              {msg}
            </p>
          )}

          <Button
            text={loading ? 'Updating...' : 'Update Password'}
            onClick={submit}
            full
            disabled={loading}
          />
        </div>
      </div>
    </>
  )
}

export default ChangePassword