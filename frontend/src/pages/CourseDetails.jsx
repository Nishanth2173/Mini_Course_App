import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import Navbar from '../components/Navbar'
import Button from '../components/Button'
import Input from '../components/Input'

function CourseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [course, setCourse] = useState(null)
  const [promo, setPromo] = useState('')
  const [promoValid, setPromoValid] = useState(false)
  const [promoError, setPromoError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    api.get(`/courses/${id}`).then(res => setCourse(res.data))
  }, [id])

  function applyPromo() {
    const code = promo.trim().toUpperCase()

    if (code === 'BFSALE25') {
      setPromoValid(true)
      setPromoError('')
    } else {
      setPromoValid(false)
      setPromoError('Invalid promo code')
    }
  }

  async function subscribe() {
    if (!course) return
    if (course.price > 0 && !promoValid) return

    setLoading(true)
    try {
      const payload = {
        courseId: id
      }
      if (Number(course.price) > 0) {
        payload.promoCode = promo.trim().toUpperCase()
      }
      await api.post('/subscriptions', payload)

      navigate('/my-courses')

    } catch (err) {
      alert(err.response?.data?.msg || 'Subscription failed')
    }

    setLoading(false)
  }

  if (!course) return <p className="p-6">Loading...</p>

  const isFree = Number(course.price) === 0
  const finalPrice = isFree
    ? 0
    : promoValid
      ? course.price / 2
      : course.price

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {course.image && (
          <img
            src={`/assets/courses/${course.image}.png`}
            alt={course.title}
            className="w-auto h-45 object-cover rounded-xl"
          />
        )}
        <h1 className="text-3xl font-bold">
          {course.title}
        </h1>
        <p className="text-gray-600 leading-relaxed">
          {course.description}
        </p>
        <div className="text-xl font-semibold">
          {isFree ? (
            <span className="text-green-600">Free</span>
          ) : promoValid ? (
            <>
              <span className="line-through text-gray-400 mr-2">
                ₹{course.price}
              </span>
              <span className="text-indigo-600">
                ₹{finalPrice}
              </span>
            </>
          ) : (
            <span className="text-indigo-600">
              ₹{course.price}
            </span>
          )}
        </div>
        {!isFree && !promoValid && (
          <div className="max-w-sm space-y-3">
            <Input
              label="Promo Code"
              onChange={e => setPromo(e.target.value)}
            />
            <Button
              text="Apply Promo Code"
              onClick={applyPromo}
              className="w-auto px-4"
            />
            {promoError && (
              <p className="text-sm text-red-500">
                {promoError}
              </p>
            )}
          </div>
        )}
        <Button
          text={loading ? 'Subscribing...' : 'Subscribe'}
          onClick={subscribe}
          disabled={(!isFree && !promoValid) || loading}
          className="w-auto px-8"
        />
      </div>
    </>
  )
}

export default CourseDetail