import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Edit, Trash, Trash2 } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const InstructorCourses = () => {

  const navigate = useNavigate()

  return (
    <div>
        <Card className=''>
          <CardHeader className='flex justify-between items-center'>
            <h1 className='text-3xl font-bold mb-8'>All Courses</h1>
            <Button onClick={() => navigate('/instructor/create-new-course')}>Create New Course</Button>
          </CardHeader>
          
         <CardContent>
           <Table className=''>
            <TableHeader>
              <TableRow>
                <TableHead >Course</TableHead>
                <TableHead >Students</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>React JS full course 2025</TableCell>
                <TableCell className='pl-5'>10</TableCell>
                <TableCell className='pl-5'>$300</TableCell>
                <TableCell className='flex justify-end space-x-3 '>
                  <Trash2 />
                  <Edit />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
         </CardContent>
          
        </Card>
    </div>
  )
}

export default InstructorCourses
