import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from './Button'

function CourseCard({ course }) {
  const nav = useNavigate()
  const free = course.price === 0 || course.price === '0'

  const img = course.image
        ? `/assets/courses/${course.image}.png`
        : `/assets/courses/default.png`

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"> 
      <img
        src={img}
        alt={course.title}
        className="h-45 w-full object-cover"
        onError={e => {
            e.target.src = '../assests/courses/default.png'
        }}
      />

      <div className="p-5 space-y-3">
        <h3 className="text-lg font-semibold">{course.title}</h3>

        <p className="text-sm text-gray-600 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center justify-between">
          <span className={`text-sm font-medium
            ${free ? 'text-green-600' : 'text-indigo-600'}`}>
            {free ? 'Free' : `₹${course.price}`}
          </span>

          <Button
            className="px-10 py-2 text-sm"
            text="View"
            onClick={() => nav(`/course/${course.id}`)}
          />
        </div>
      </div>
    </div>
  )
}

export default CourseCard
