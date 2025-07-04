import { Button } from '@/components/ui/button'
import { StudentContext } from '@/context/student_context'
import { userBoughtCourses } from '@/services'
import { PlayIcon } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'

const StudentCourses = () => {

  const { studentBoughtCoursesData, setstudentBoughtCoursesData } = useContext(StudentContext)

  useEffect(() => {
    async function fetchCourses() {
      const response = await userBoughtCourses()

      console.log("response :", response)
      setstudentBoughtCoursesData(response)
      // setStudentBoughtCourses(response.data.user_Courses)
    }

    fetchCourses()
  }, [])
  return (
    <div>
      <h1 className='text-3xl font-bold'>My Courses</h1>

      <div className="flex flex-wrap gap-4 mt-5 ml-2">
        {studentBoughtCoursesData.courses?.map(course => (
          <div
            key={course._id}
            className="w-64 bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col"
          >
            <img
              src={course.courseImage}
              alt={course.title}
              className="h-40 object-cover rounded mb-2 cursor-pointer"
            />
            <h3 className="font-bold text-lg mb-1">{course.title}</h3>
            <span className="text-sm text-gray-600 mb-4">{course.instructorName}</span>
            <Button className="w-full mt-auto flex items-center justify-center gap-2 cursor-pointer">
              <PlayIcon className="w-4 h-4 " />
              Start Watching
            </Button>
          </div>
        ))}
      </div>

    </div>
  )
}

export default StudentCourses
