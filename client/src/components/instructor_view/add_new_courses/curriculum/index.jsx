import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { InstructorContext } from '@/context/instructor_context'
import React, { useContext } from 'react'

const CourseCurriculum = () => {


  const { courseCurriculumFormData, setCourseCurriculumFormData } = useContext(InstructorContext)

  const handleClick = () => {
    setCourseCurriculumFormData([
      ...courseCurriculumFormData,
      {
        ...courseCurriculumFormData[0]
      }
    ])
  }

  return (
    <div>
      <Card>
        <CardTitle>
          <CardHeader>Create Course Curriculumn</CardHeader>
        </CardTitle>
        <CardContent>
          <Button onClick={handleClick}>Add Lecture</Button>

          {
            courseCurriculumFormData.map((data, index) => <Card key={index} className='mt-5'>
              <CardTitle>
                <CardHeader className='flex items-center gap-3'>
                  <span className='font-semibold '>Lecture {index + 1}</span>
                  <Input placeholder='Enter Lecture Title' className='max-w-90' />
                  <Switch id={`freePreview-${index+1}`} />
                  <Label htmlFor={`freePreview-${index+1}`}>Free Preview</Label>
                </CardHeader>
              </CardTitle>
              <CardContent>

              <Input type='file' accept='video/*' />

            </CardContent>
            </Card>)
          }

        </CardContent>
      </Card>
    </div>
  )
}

export default CourseCurriculum
