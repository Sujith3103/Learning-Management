import React, { useContext, useEffect } from 'react'
import banner from '../../../../public/banner-img.png'
import { courseCategories } from '@/config'
import { Button } from '@/components/ui/button'
import { StudentContext } from '@/context/student_context'

const StudentHomePage = () => {
  return (
    <>
      <div className='flex justify-evenly items-center mt-5 min-h-fit'>
        <div className='flex flex-col justify-center text-center'>
          <h1 className='text-5xl font-bold'>Learning that gets you</h1>
          <p className='text-2xl mt-7'>Skills for your present and your future.</p>
          <p className='text-2xl mt-2'>Get started with us</p>
        </div>
        <div className='w-[900px]'>
          <img src={banner} alt="" className='rounded-2xl w-full h-full object-cover' />
        </div>

      </div>

      <div className='bg-gray-100 w-full min-h-fit mt-20'>
        <h3 className='text-2xl font-bold ml-3'>Curse Categories</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-10 pb-8 ml-3">
          {
            courseCategories.map(item =>
              <Button key={item.id} variant="outline">{item.label}</Button>
            )
          }
        </div>
      </div>

      <div className='h-40'>
      </div>
    </>

  )
}

export default StudentHomePage
