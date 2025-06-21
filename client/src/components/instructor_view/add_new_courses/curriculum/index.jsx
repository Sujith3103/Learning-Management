import server from '@/api/axiosInstance'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import VideoPlayer from '@/components/video_player'
import { courseCurriculumInitialFormData } from '@/config'
import { InstructorContext } from '@/context/instructor_context'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const CourseCurriculum = () => {


  const { courseCurriculumFormData, setCourseCurriculumFormData } = useContext(InstructorContext)
  const {courseLandingFormData, setCourseLandingFormData} = useContext(InstructorContext)
  const [isDisabled, setIsDisabled] = useState(true)

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

  const handleClick = () => {
    console.log("curriculum before adding lecture",courseCurriculumFormData)
    setCourseCurriculumFormData([
      ...courseCurriculumFormData,
      {
        ...courseCurriculumInitialFormData[0]
      }
    ])
    
  }

  const handleReplace = async (public_id, index) => {

    try {
      const response = await server.delete(`/media/delete/${public_id}`)
      // console.log("response for replace :", response)
      if (response.data.success) {
        console.log("Success")
        const updated = [...courseCurriculumFormData]
        updated[index] = {
          ...updated[index],
          videoUrl: ""
        }
        // console.log(updated, 'updated')
        setCourseCurriculumFormData(updated)
      }
    } catch (err) {
      console.log("error is deleting the file")
    }
  }

  const handleDeleteLecture = async(indexToRemove,public_id) => {

    courseCurriculumFormData[indexToRemove].videoUrl? await handleReplace(public_id,indexToRemove) : null;

    // console.log("Replaced")
    const updated = courseCurriculumFormData.filter((_,index) => index !==indexToRemove)
    // console.log("updated filter: ", updated)
    setCourseCurriculumFormData(updated)
  }

  useEffect(() => {
    const lastLecture = courseCurriculumFormData.at(-1)
    const isLastLectureVideoUploaded = !!lastLecture?.videoUrl
    setIsDisabled(!isLastLectureVideoUploaded)
  }, [courseCurriculumFormData])

  return (
    <div>
      <Card>
        <CardTitle>
          <CardHeader>Create Course Curriculumn</CardHeader>
        </CardTitle>
        <CardContent>
          <Button onClick={handleClick} disabled={isDisabled}>Add Lecture</Button>

          {
            courseCurriculumFormData.map((data, index) => <Card key={index} className='mt-5'>
              <CardTitle>
                <CardHeader className='flex items-center gap-3'>
                  <span className='font-semibold '>Lecture {index + 1}</span>
                  <Input placeholder='Enter Lecture Title' className='max-w-90' onChange={event => handleInput(index, "title", event.target.value)} value={courseCurriculumFormData[index]?.title || ""} />
                  <Switch id={`freePreview-${index + 1}`} onCheckedChange={event => handleInput(index, "freePreview", event)} value={courseCurriculumFormData[index]?.freePreview} />
                  <Label htmlFor={`freePreview-${index + 1}`}>Free Preview</Label>
                  {/* DELETE LECTURE */}
                  {
                    index?<Button variant="destructive" onClick={() => handleDeleteLecture(index,courseCurriculumFormData[index]?.public_id)} className="ml-19">Delete Lecture</Button>:null
                  }
                </CardHeader>
              </CardTitle>
              <CardContent>

                {
                  courseCurriculumFormData[index]?.videoUrl ?
                    <div className="flex items-start">
                      <div className="w-[50%]">
                        <VideoPlayer url={courseCurriculumFormData[index]?.videoUrl} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" onClick={() => handleReplace(courseCurriculumFormData[index]?.public_id, index)}>Replace Video</Button>
                      </div>
                    </div>
                    :
                    <Input type='file' accept='video/*' onChange={event => handleVideoInput(event, index)} />
                }


              </CardContent>
            </Card>)
          }

        </CardContent>
      </Card>
    </div>
  )
}

export default CourseCurriculum
