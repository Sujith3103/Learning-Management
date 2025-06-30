
import { DisplayCourseData } from '@/components/student_view/display_courses'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { courseCategories, initialFilterOptions } from '@/config'
import { getAllCourses } from '@/services'

import { ArrowUpDownIcon, FilterIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const StudentViewCourses = () => {

    const [courseData, setCourseData] = useState([])
    const [selectedCategories, setSelectedCategories] = useState(initialFilterOptions)
    const [searchParams, setSearchParams] = useSearchParams()


    useEffect(() => {
        async function fetchFilteredCourses() {
            // let query = "";

            // if (selectedCategories.length > 0) {
            //     // for multi-category, repeat the key
            //     query = selectedCategories.map(c => `category=${encodeURIComponent(c)}`).join("&");
            // }

            const response = await getAllCourses(selectedCategories);
            setCourseData(response);

        }

        fetchFilteredCourses();

    }, [selectedCategories]);

    useEffect(()=>{
        const categoryQuery = searchParams.get("category").split(',') || []
        // const Query = 
        // const Query = 

        setSelectedCategories(prev => ({
            ...prev,
            category: categoryQuery
        }))
    },[])
    
    useEffect(() => {
        console.log("selected checkbox :", selectedCategories)
    }, [selectedCategories])

    return (
        <div className='px-10 flex flex-col gap-y-5'>
            <h1 className='text-3xl font-bold mt-2'>All Courses</h1>
            <div className='flex w-full h-11'>
                <div className='flex flex-col w-full'>
                    <div className='flex justify-between items-center'>
                        <Button variant={"outline"}><FilterIcon /> Filter</Button>
                        <div className='flex items-center gap-5'>
                            <Button variant="outline">
                                <ArrowUpDownIcon /> Sort By
                            </Button>
                            <span className=''>Results</span>

                        </div>
                    </div>
                </div>
            </div>
            <div className='flex'>
                <div>
                    <h1>CATEGORY</h1>
                    {
                        courseCategories.map(category => (
                            <div key={category.id} className='flex items-center'>
                                <Checkbox id={category.id} className='h-5 w-5 mr-2 border border-b-blue-200 rounded-sm shadow-[0_2px_6px_rgba(0,0,0,0.2)]'
                                    checked={selectedCategories.category.includes(category.id)}
                                    onCheckedChange={(checked) => {
                                        let updatedCategory = [...selectedCategories.category]
                                        if (checked) {
                                            updatedCategory = [...updatedCategory, category.id]
                                            console.log("updatedCategory : ", updatedCategory)
                                        }
                                        else {
                                            updatedCategory = updatedCategory.filter(c => c !== category.id)
                                            console.log("updatedCategory : ", updatedCategory)
                                        }

                                        setSelectedCategories(prev => ({
                                            ...prev,
                                            category: updatedCategory
                                        }))

                                        searchParams.set("category",updatedCategory.join(','))
                                        setSearchParams(searchParams);
                                    }}
                                />
                                {category.label}
                            </div>

                        ))
                    }
                </div>
                <div>
                    {
                        courseData?.map((data, index) => (
                            <DisplayCourseData courseData={data} key={index} />
                        ))
                    }
                </div>
            </div>
        </div>


    )
}

export default StudentViewCourses
