import server from '@/api/axiosInstance'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { InstructorContext } from '@/context/instructor_context'
import React, { useContext } from 'react'

const CourseSetting = () => {

  const { courseLandingFormData, setCourseLandingFormData } = useContext(InstructorContext)


  const handleInput = async (event) => {

    const file = event.target.files[0]
    const formData = new FormData
    formData.append('file', file);

    try {
      const response = await server.post('/media/upload', formData);
      console.log(response)

      if(response.data.success){
        setCourseLandingFormData({
          ...courseLandingFormData,
          image : response.data.data.url
        })
      }
    } catch (err) {
      console.log(err, "error in uplaoding the image")
    }

  }
  console.log(courseLandingFormData)

  return (
    <Card>
      <CardHeader className='font-semibold !gap-0'>
        Course Settings
      </CardHeader>
      <CardContent>
        {
          courseLandingFormData.image? <img src={courseLandingFormData.image}/>:
          <div className='flex flex-col gap-3'>
          <Label>Upload Course Image</Label>
          <Input type="file" accept='image/*' onChange={event => handleInput(event)} />
        </div>
        }
      </CardContent>
    </Card>
  )
}

export default CourseSetting
