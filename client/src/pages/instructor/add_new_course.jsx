import React, { lazy, Suspense, useContext, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TabsContent } from '@radix-ui/react-tabs'
import { Loader } from 'lucide-react'
import { InstructorContext } from '@/context/instructor_context'
import { addNewCourse, handleFetchCourseDetails, updateCourseDetails } from '@/services/instructor_services/inedx'
import { useNavigate, useParams } from 'react-router-dom'
import { courseCurriculumInitialFormData, courseLandingInitialFormData } from '@/config'
import CourseLanding from '@/components/instructor_view/add_new_courses/course_landing'

// Lazy loaded components
const LazyCourseLanding = lazy(() => import('@/components/instructor_view/add_new_courses/course_landing'))
const LazyCourseSetting = lazy(() => import('@/components/instructor_view/add_new_courses/course_setting'))
const LazyCourseCurriculum = lazy(() => import('@/components/instructor_view/add_new_courses/curriculum'))

const AddNewCoursePage = () => {

  const navigate = useNavigate()

  const { courseLandingFormData, setCourseLandingFormData } = useContext(InstructorContext)
  const { courseCurriculumFormData, setCourseCurriculumFormData } = useContext(InstructorContext)

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0
    }

    return value === "" || value === null || value === undefined

  }

  function validFormDate() {

    for (const key in courseLandingFormData) {
      if (isEmpty(courseLandingFormData[key])) {
        return false
      }
    }

    let isFreePreview = false

    for (const item of courseCurriculumFormData) {
      if (isEmpty(item.title) || isEmpty(item.videoUrl) || isEmpty(item.public_id)) {
        return false
      }

      if (item.freePreview) {
        isFreePreview = true
      }
    }

    return true
  }



  const handleSubmit = (id) => {

    console.log("submit ")
    console.log("ID in handle submit :", id)
    console.log("Curr : ", courseCurriculumFormData)
    const submit_Data = {
      ...courseLandingFormData,
      Lecture: [...courseCurriculumFormData]
    }

    console.log("Submit data:", submit_Data)
    id ? updateCourseDetails({ id, submit_Data }) : addNewCourse(submit_Data)

    navigate(-1)

  }



  const New_Course_Items = [
    {
      label: 'Curriculum',
      value: 'curriculum',
      component: LazyCourseCurriculum
    },
    {
      label: 'Course Landing Page',
      value: 'courseLanding',
      component: LazyCourseLanding
    },
    {
      label: 'Setting',
      value: 'courseSetting',
      component: LazyCourseSetting
    }
  ]



  const { id } = useParams();

  useEffect(() => {
    if (id && id !== "undefined") {
      handleFetchCourseDetails({ id, setCourseCurriculumFormData, setCourseLandingFormData });
    }
    else {
      setCourseCurriculumFormData(courseCurriculumInitialFormData);
      setCourseLandingFormData(courseLandingInitialFormData);
    }
  }, [id]); // add id as dependency

  return (
    <div className='container px-6 pt-3 '>
      <header className='flex p-5 justify-between items-center border-t'>
        <h1 className='text-3xl font-bold'>Create New Course</h1>
        <Button disabled={!validFormDate()} onClick={() => handleSubmit(id)} className='px-10 tracking-wider'>SUBMIT</Button>
      </header>

      <Card className='mt-3'>
        <CardContent>
          <Tabs defaultValue='curriculum' className='w-full'>
            <TabsList>
              {New_Course_Items.map((Item) => (
                <TabsTrigger key={Item.value} value={Item.value}>
                  {Item.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {New_Course_Items.map((Item) => (
              <TabsContent value={Item.value} key={Item.value}>
                <Suspense fallback={<Loader />}>
                  <Item.component />
                </Suspense>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default AddNewCoursePage
