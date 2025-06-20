import { courseCurriculumInitialFormData, courseLandingInitialFormData, initialCourseData } from '@/config'
import React, { createContext, useState } from 'react'

export const InstructorContext = createContext(null)

export default function InstructorProvider({ children }) {

    const [courseLandingFormData, setCourseLandingFormData] = useState(courseLandingInitialFormData)

    const [courseCurriculumFormData, setCourseCurriculumFormData] = useState(courseCurriculumInitialFormData)

    const [courseData, setCourseData] = useState(initialCourseData)


    return <InstructorContext.Provider value={{ courseLandingFormData, setCourseLandingFormData, courseCurriculumFormData, setCourseCurriculumFormData,courseData, setCourseData }}>{children}</InstructorContext.Provider>

}