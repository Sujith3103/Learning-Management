import FormControls from '@/components/common_form/form_controls'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { courseLandingPageFormControls } from '@/config'
import { InstructorContext } from '@/context/instructor_context'
import React, { useContext, useEffect } from 'react'

const CourseLanding = () => {

  const { courseLandingFormData, setCourseLandingFormData } = useContext(InstructorContext)

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className='text-1xl'>Course Landing Page</CardTitle>
        </CardHeader>
        <CardContent>
          <FormControls formControls={courseLandingPageFormControls} formData={courseLandingFormData} setFormData={setCourseLandingFormData}/>
        </CardContent>
      </Card>
    </div>
  )
}

export default CourseLanding
