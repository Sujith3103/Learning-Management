

import { Route, Routes } from 'react-router-dom'

import AuthPage from './pages/auth'
import RouteGuard from './components/route_guard'
import InstructorView from './pages/instructor'
import StudentViewCommonLayout from './components/student_view/common_layout'
import StudentHomePage from './pages/student/home'
import NotFound from './pages/notfound'

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
        <Route path='*' element={<NotFound />} />
      </Routes>

    </>
  )
}

export default App
