import CourseLanding from '@/components/instructor_view/add_new_courses/course_landing'
import CourseSetting from '@/components/instructor_view/add_new_courses/course_setting'
import CourseCurriculum from '@/components/instructor_view/add_new_courses/curriculum'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TabsContent } from '@radix-ui/react-tabs'
import React from 'react'

const AddNewCoursePage = () => {

    const New_Course_Items = [
        {
            label: 'Curriculum',
            value: 'curriculum',
            component: <CourseCurriculum />
        },
        {
            label: 'Course Landing Page',
            value: 'courseLanding',
            // component: React.lazy(() => import('@/components/instructor_view/add_new_courses/course_landing'))
            component: <CourseLanding />
        },
        {
            label: 'Setting',
            value: 'courseSetting',
            component: <CourseSetting />
        }
    ]

  return (
    <div className='container px-6 pt-3 '>
      <header className='flex p-5 justify-between items-center border-t'>
        <h1 className='text-3xl font-bold'>Create New Course</h1>
        <Button className='px-10 tracking-wider '>SUBMIT</Button>
      </header>
      <Card className='mt-3'>
        <CardContent>
            <Tabs defaultValue='curriculum' className='w-full'>
                <TabsList >
                    {New_Course_Items.map((Item) => <TabsTrigger key={Item.value} value={Item.value}>
                      {Item.label}
                    </TabsTrigger>)}
                </TabsList >
                {
                  New_Course_Items.map((Item) => <TabsContent value={Item.value} key={Item.value}>
                    {Item.component}
                  </TabsContent>)
                }
            </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default AddNewCoursePage
