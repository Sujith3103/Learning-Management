import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

const CourseSetting = () => {
  return (
    <Card>
      <CardHeader className='font-semibold !gap-0'>
        Course Settings
      </CardHeader>
      <CardContent>
        <div className='flex flex-col gap-3'>
          <Label>Upload Course Image</Label>
          <Input type="file" accept='image/*' />
        </div>
        

      </CardContent>
    </Card>
  )
}

export default CourseSetting
