import { useState } from 'react'

import { Button } from './components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     
     <Button className='ml-5 mt-5 cursor-pointer' >Click</Button>
     
    </>
  )
}

export default App
