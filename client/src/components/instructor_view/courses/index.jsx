import server from '@/api/axiosInstance'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { InstructorContext } from '@/context/instructor_context'
import { Edit, Trash, Trash2 } from 'lucide-react'
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const InstructorCourses = () => {

  const { courseData, setCourseData,courseLandingFormData, setCourseLandingFormData,courseCurriculumFormData, setCourseCurriculumFormData } = useContext(InstructorContext)

  const navigate = useNavigate()

  const handleGetCourse = async () => {
    try {
      const response = await server.get('/course/get')
      if (response.data.success) {
        setCourseData(response.data.data)
        console.log(courseData)
      }

    } catch (err) {
      console.log("something wrong in fetching the courses : ", err)
    }

  }

  const handleEdit = async(id) => {
    navigate(`/instructor/edit-course/${id}`)

    const response = await server.get(`/course/get/details/${id}`)
    console.log(response.data)
    if(response.data.success){
      const curriculumData = response.data.data.lectures;

      // for(const key in courseCurriculumFormData){
      //   courseCurriculumFormData[key] = curriculumData[key]
      // } 

      setCourseLandingFormData(response.data.data)

      setCourseCurriculumFormData(curriculumData)
    }
  }

  useEffect(() => {
    handleGetCourse()
  }, [])
               
  return (
    <div>
      <Card className=''>
        <CardHeader className='flex justify-between items-center'>
          <h1 className='text-3xl font-bold mb-8'>All Courses</h1>
          <Button onClick={() => navigate('/instructor/create-new-course')}>Create New Course</Button>
        </CardHeader>

        <CardContent>
          <Table className=''>
            <TableHeader>
              <TableRow>
                <TableHead >Course</TableHead>
                <TableHead >Students</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courseData.map((course, index) => (
                <TableRow key={course._id || index}>
                  <TableCell>{course.title}</TableCell>
                  <TableCell className='pl-5'>{course.students?.length || 0}</TableCell>
                  <TableCell className='pl-5'>${course.pricing}</TableCell>
                  <TableCell className='flex justify-end space-x-3 '>
                  <Trash2 />
                  <Edit onClick={() => handleEdit(course.id)}/>
                </TableCell>
                </TableRow>
              ))}

            </TableBody>
          </Table>
        </CardContent>

      </Card>
    </div>
  )
}

export default InstructorCourses
