

import { Route, Routes } from 'react-router-dom'

import AuthPage from './pages/auth'
import RouteGuard from './components/route_guard'
import StudentViewCommonLayout from './components/student_view/common_layout'
import StudentHomePage from './pages/student/home'
import NotFound from './pages/notfound'
import InstructorDashBoardPage from './pages/instructor'
import AddNewCoursePage from './pages/instructor/add_new_course'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import StudentViewCourses from './pages/student/courses'
import CourseDetails from './pages/student/course_details'
import PaypalCapturePage from './pages/student/paypal_capture_page'
import PaypalPaymentReturnPage from './pages/student/payment-return'

function App() {


  return (
    <>
      <Routes>
        <Route path='/auth' element={<RouteGuard element={<AuthPage />} />} />
        <Route path='/instructor' element={<RouteGuard element={<InstructorDashBoardPage />} />} />
        <Route path='/instructor/create-new-course' element={<RouteGuard element={<AddNewCoursePage />} />} />
        <Route path='/instructor/edit-course/:id' element={<RouteGuard element={<AddNewCoursePage />} />} />
        <Route path='/' element={<RouteGuard element={<StudentViewCommonLayout />} />}>
          <Route path="" element={<StudentHomePage />} />
          <Route path="home" element={<StudentHomePage />} />
          <Route path="courses" element={<StudentViewCourses />} />
          <Route path="courses/details/:id" element={<CourseDetails />} />
          <Route path="payment-return" element={<PaypalPaymentReturnPage />} />
          {/* <Route path="student-courses" element={<StudentCoursesPage />} /> */}
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
      <ToastContainer
        // toastClassName={() => 'primary'}
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
      />
    </>
  )
}

export default App
