import { InstructorContext } from '@/context/instructor_context'
import { RotateCcw, RotateCw } from 'lucide-react'
import React, { useContext, useRef, useState } from 'react'
import ReactPlayer from 'react-player'

const VideoPlayer = ({ url }) => {

  const {courseLandingFormData, setCourseLandingFormData} = useContext(InstructorContext)

  const [progressValue, setProgressValue] = useState({})
  const playerRef = useRef()

  const handleRewind = () => {
    const current = progressValue.playedSeconds || 0
    const rewindTo = current <= 5 ? 0 : current - 5

    playerRef.current?.seekTo(rewindTo)
  }

  return (
    <div  className="w-[100%] h-full rounded-md overflow-hidden">
      <ReactPlayer
        className={"rounded-2xl"}
        ref={playerRef}
        url={url}
        width={"100%"}
        height={"100%"}
        controls
        onProgress={(progress) => {
          setProgressValue(progress)
        }}

      // style={

      // }
      />
      <div className='absolute flex top-164 left-57 gap-3 '>
        {/* <RotateCcw className='text-amber-50 w-5 cursor-pointer transition-transform duration-100 hover:scale-110' onClick={handleRewind} />
        <RotateCw className='text-amber-50 w-5 cursor-pointer transition-transform duration-100 hover:scale-110'
          onClick={() => {
            const current = progressValue.playedSeconds || 0
            playerRef.current?.seekTo(current + 5)
          }}
        /> */}
      </div>
    </div>
  )
}

export default VideoPlayer
