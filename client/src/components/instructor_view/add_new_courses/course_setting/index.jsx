import server from '@/api/axiosInstance'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { InstructorContext } from '@/context/instructor_context'
import { UploadingToast } from '@/services/instructor_services/uploading_toast'
import React, { useContext } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Toaster } from 'sonner'

const CourseSetting = () => {
  const { courseLandingFormData, setCourseLandingFormData } = useContext(InstructorContext)

  const handleInput = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file) 

    // Show "Uploading…" toast
    const toastId = toast.info(<UploadingToast />, {
      progress: 0,
      autoClose: false,
      closeOnClick: false,
      draggable: false
    })

    try {
      const response = await server.post('/media/upload', formData)

      if (response.data.success) {
        setCourseLandingFormData({
          ...courseLandingFormData,
          image: response.data.data.url
        })

        // Show success toast stacked above
        toast.success('Upload successful ✅')
        toast.dismiss(toastId)
      }
    } catch (err) {
      console.log(err, "error in uploading the image")
      toast.update(toastId, {
        render: 'Upload failed ❌',
        type: toast.TYPE.ERROR,
        autoClose: 3000
      })
    }
  }

  return (
    <Card>
      <CardHeader className='font-semibold !gap-0'>
        Course Settings
      </CardHeader>
      <CardContent>
        {courseLandingFormData.image ? (
          <img src={courseLandingFormData.image} className="rounded-md w-150" />
        ) : (
          <div className='flex flex-col gap-3'>
            <Label>Upload Course Image</Label>
            <Input type="file" accept='image/*' onChange={handleInput} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default CourseSetting
