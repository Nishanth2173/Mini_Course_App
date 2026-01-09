import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import Navbar from '../components/Navbar'

function MyCourses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/my-courses')
      .then(res => setCourses(res.data))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 px-6 py-8">

        <h1 className="text-3xl font-bold mb-6">
          My Courses
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : courses.length === 0 ? (
          <p className="text-gray-600">
            You haven’t subscribed to any courses yet.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {courses.map(c => (
              <div
                key={c.id}
                className="bg-white rounded-xl shadow overflow-hidden"
              >

                <div className="p-4 space-y-2">
                  <h2 className="text-lg font-semibold">
                    {c.title}
                  </h2>

                  <p className="text-sm text-gray-600">
                    Price Paid:{' '}
                    <span className="font-medium text-indigo-600">
                      ₹{Number(c.price_paid).toFixed(2)}
                    </span>
                  </p>

                  <p className="text-sm text-gray-500">
                    Subscribed on:{' '}
                    {new Date(c.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </>
  )
}

export default MyCourses