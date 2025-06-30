import { GraduationCap, TvMinimalPlay } from 'lucide-react'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Button } from '../ui/button'

const StudentViewCommonLayout = () => {
  return (
    <div>
      <div className='w-full h-20 flex justify-between border-b-3 border-t-3 mt-2 sticky'>
        <div className='flex gap-6 items-center ml-5'>
          <GraduationCap className='h-8 w-8' />
          <Link className='font-extrabold text-2xl' to={"/home"}>LMS LEARN</Link>                                       
          <Link to="/courses" className="font-semibold hover:underline">
            Explore Courses
          </Link>

        </div>
        <div className='flex gap-6 items-center mr-5'>
          <span className='font-extrabold text-2xl'>My Courses</span>
          <TvMinimalPlay className='h-8 w-8' />
          <Button className="hover:bg-gray-500 transition">Sign Out</Button>
        </div>

      </div>
      <Outlet />
    </div>

  )
}

export default StudentViewCommonLayout
