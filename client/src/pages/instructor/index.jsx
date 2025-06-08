import InstructorCourses from '@/components/instructor_view/courses'
import InstructorDashBoard from '@/components/instructor_view/dashboard'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs'
import { BarChart, Book, LogOut } from 'lucide-react'
import React, { useState } from 'react'

const InstructorDashBoardPage = () => {


  const menuItems = [
    {
      icon: BarChart,
      label: 'Dashboard',
      value: 'dashboard',
      component: <InstructorDashBoard />
    },
    {
      icon: Book,
      label: 'Courses', 
      value: 'courses',
      component: <InstructorCourses />,
    },
    {
      icon: LogOut,
      label: 'Logout',
      value: 'logout',
      component: null
    }

  ]

  const [activeTab, setActiveTab] = useState('dashboard');

  function handleLogout() {

  }

  return (
    <div className='flex h-full min-h-screen bg-gray-100'>

      <aside className='w-64 bg-white shadow-md invisible md:visible'>
        <div className='p-4'>

          <h2 className='text-2xl font-bold mb-4'>Instructor view</h2>
          <nav>
            {
              menuItems.map((menuItem) => (<Button 
              key={menuItem.value} className="w-full justify-start mb-2" onClick={menuItem.value === 'logout' ? handleLogout : () => setActiveTab(menuItem.value)}
              variant={activeTab === menuItem.value ? 'muted' : 'ghost'}
              >
                <menuItem.icon className='mr-2 h-4 w-4' />
                {menuItem.label}
              </Button>))
            }
          </nav>

        </div>
      </aside>
      <main className='flex-1 p-8 overflow-y-auto'>
        <div className='max-w-7xl mx-auto'>
          <h1 className='text-3xl font-bold mb-8'>
            DashBoard
          </h1>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {
              menuItems.map((menuItem) => <TabsContent value={menuItem.value} key={menuItem.value}>
                {
                  menuItem.component !== null ? menuItem.component : null
                }
              </TabsContent>)
            }
          </Tabs>
        </div>
      </main>
    </div>
  )
}

export default InstructorDashBoardPage
