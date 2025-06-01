

import { Route, Routes } from 'react-router-dom'

import AuthPage from './pages/auth'
import RouteGuard from './components/route_guard'
import InstructorView from './pages/instructor'
import StudentViewCommonLayout from './components/student_view/common_layout'
import StudentHomePage from './pages/student/home'

function App() {


  return (
    <>
      <Routes>
        <Route path='/auth' element={<RouteGuard element={<AuthPage />} />} />
        <Route path='/instructor' element={<RouteGuard element={<InstructorView />} />} />
        <Route path='/' element={<RouteGuard element={<StudentViewCommonLayout />} />}>
          <Route path="" element={<StudentHomePage />} />
          <Route path="home" element={<StudentHomePage />} />
        </Route>
      </Routes>

    </>
  )
}

export default App
