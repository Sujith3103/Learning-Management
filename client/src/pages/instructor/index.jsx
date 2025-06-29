import InstructorDashBoard from '@/components/instructor_view/dashboard'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs'
import { AuthContext } from '@/context/auth_context'
import { BarChart, Book, LogOut, Loader } from 'lucide-react'
import React, { lazy, Suspense, useContext, useState } from 'react'

// Lazy loaded component
const LazyInstructorCourses = lazy(() => import('@/components/instructor_view/courses'))

const InstructorDashBoardPage = () => {

  const [activeTab, setActiveTab] = useState('dashboard')

  const { auth, setAuth } = useContext(AuthContext)

  const menuItems = [
    {
      icon: BarChart,
      label: 'Dashboard',
      value: 'dashboard',
      render: () => <InstructorDashBoard />
    },
    {
      icon: Book,
      label: 'Courses',
      value: 'courses',
      render: () => (
        <Suspense fallback={<div className="p-5 text-gray-500"><Loader className="animate-spin inline-block mr-2" />Loading Courses...</div>}>
          <LazyInstructorCourses />

        </Suspense>
      )
    },
    {
      icon: LogOut,
      label: 'Logout',
      value: 'logout',
      render: () => null
    }
  ]

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    setAuth({isAuthenticated: false,
      user: null,
      accessToken: null})
  }

  return (
    <div className='flex h-full min-h-screen bg-gray-100'>

      {/* Sidebar */}
      <aside className='w-64 bg-white shadow-md invisible md:visible'>
        <div className='p-4'>
          <h2 className='text-2xl font-bold mb-4'>Instructor View</h2>
          <nav>
            {
              menuItems.map(menuItem => (
                <Button
                  key={menuItem.value}
                  className="w-full justify-start mb-2"
                  onClick={menuItem.value === 'logout' ? handleLogout : () => setActiveTab(menuItem.value)}
                  variant={activeTab === menuItem.value ? 'muted' : 'ghost'}
                >
                  <menuItem.icon className='mr-2 h-4 w-4' />
                  {menuItem.label}
                </Button>
              ))
            }
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className='flex-1 p-8 overflow-y-auto'>
        <div className='max-w-7xl mx-auto'>
          <h1 className='text-3xl font-bold mb-8'>Dashboard</h1>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {
              menuItems.map(menuItem => (
                <TabsContent value={menuItem.value} key={menuItem.value}>
                  {menuItem.render()}
                </TabsContent>
              ))
            }
          </Tabs>
        </div>
      </main>

    </div>
  )
}

export default InstructorDashBoardPage
