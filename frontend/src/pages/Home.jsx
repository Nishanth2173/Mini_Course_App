import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import Navbar from '../components/Navbar'
import CourseCard from '../components/CourseCard'

function Home() {
  const [courses,setCourses]=useState([])
  const [q,setQ]=useState('')
  const [type,setType]=useState('all')

  useEffect(() => {
    api.get('/courses').then(res => setCourses(res.data))
  }, [])

  const filtered = courses.filter(c => {
    const match = c.title.toLowerCase().includes(q.toLowerCase())
    const price = Number(c.price)
    const priceMatch =
      type === 'all' ||
      (type === 'free' && price === 0) ||
      (type === 'paid' && price > 0)
    return match && priceMatch
  })

  return (
    <>
      <Navbar />

      <div className="bg-gray-50 min-h-screen px-6 py-8">

        <div className="flex flex-col sm:flex-row gap-6 mb-6 items-center">
          <h1 className="px-4 py-2 text-3xl font-bold mb-6">Available Courses</h1>
          <input
            placeholder="Search courses..."
            className="px-4 py-2 rounded-xl border w-1/2 "
            onChange={e=>setQ(e.target.value)}
          />

          <select
            className="px-4 py-2 rounded-xl border"
            onChange={e=>setType(e.target.value)}
          >
            <option value="all">All</option>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map(c => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>

      </div>
    </>
  )
}

export default Home
