import server from '@/api/axiosInstance'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { InstructorContext } from '@/context/instructor_context'
import React, { useContext } from 'react'
import { toast } from 'react-toastify'

const CourseCurriculum = () => {


  const { courseCurriculumFormData, setCourseCurriculumFormData } = useContext(InstructorContext)

  // const handleInput = (event,index) =>{
  //   const updatedData = [...courseCurriculumFormData];

  //   updatedData[index] = {
  //     ...updatedData[index],
  //     title: event.target.value
  //   }

  //   setCourseCurriculumFormData(updatedData)


  // }

  const handleInput = (index, field, event) => {

    const updatedData = [...courseCurriculumFormData];

    updatedData[index] = {
      ...updatedData[index],
      [field]: event,
    }

    console.log("updated Data: ", updatedData)

    setCourseCurriculumFormData(updatedData)

  }

  const updateLectureFields = (index, value) => {
    setCourseCurriculumFormData(prev => {
      const updated = [...prev]

      updated[index] = {
        ...updated[index],
        ...value
      }

      return updated
    })
  }

  const handleVideoInput = async (event, index) => {
    const selectedFile = event.target.files[0]

    if (selectedFile) {
      const videoFormData = new FormData
      videoFormData.append('file', selectedFile)

      const toastId = toast.info('Uploading...', {
        progress: 0,
        autoClose: false,
        closeOnClick: false,
        draggable: false
      })

      try {

        const response = await server.post('/media/upload', videoFormData, {
          onUploadProgress: (ProgressEvent) => {
            const percent = Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
            toast.update(toastId, {
              render: `Uploading... ${percent}%`,
              // the progress bar
              progress: percent / 100
            })
          }
        })

        if (response.data.success) {
          updateLectureFields(index, {
            public_id: response.data.data.public_id,
            videoUrl: response.data.data.url
          })
          toast.success('Upload successful ✅')
          toast.dismiss(toastId)
        }


      } catch (err) {
        console.log(err)
        toast.update(toastId, {
          render: 'Upload failed ❌',
          type: toast.TYPE.ERROR,
          autoClose: 3000
        })
      }
    }
  }

  console.log(courseCurriculumFormData)

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
                  <Input placeholder='Enter Lecture Title' className='max-w-90' onChange={event => handleInput(index, "title", event.target.value)} value={courseCurriculumFormData[index]?.title} />
                  <Switch id={`freePreview-${index + 1}`} onCheckedChange={event => handleInput(index, "freePreview", event)} value={courseCurriculumFormData[index]?.freePreview} />
                  <Label htmlFor={`freePreview-${index + 1}`}>Free Preview</Label>
                </CardHeader>
              </CardTitle>
              <CardContent>

                <Input type='file' accept='video/*' onChange={event => handleVideoInput(event, index)} />

              </CardContent>
            </Card>)
          }

        </CardContent>
      </Card>
    </div>
  )
}

export default CourseCurriculum
