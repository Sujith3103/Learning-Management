
import { DisplayCourseData } from '@/components/student_view/display_courses'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Skeleton } from '@/components/ui/skeleton'
import { courseCategories, courseLevelOptions, initialFilterOptions, languageOptions } from '@/config'
import { StudentContext } from '@/context/student_context'
import { getAllCourses } from '@/services'

import { ArrowUpDownIcon, FilterIcon } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const StudentViewCourses = () => {

    const {studentBoughtCoursesData , setstudentBoughtCoursesData} = useContext(StudentContext)

    const [courseData, setCourseData] = useState([])
    const [selectedCategories, setSelectedCategories] = useState(initialFilterOptions)
    const [searchParams, setSearchParams] = useSearchParams()

    const handleCheck = ({ checked, value = "", filterType = "", }) => {

        // console.log("value : ",value)
        let updatedCategory = [...selectedCategories[filterType]]

        if (checked) {
            updatedCategory = [...updatedCategory, value]
        }
        else {
            updatedCategory = updatedCategory.filter(c => c !== value)
        }
        // console.log("updated cat : ",updatedCategory)
        setSelectedCategories(prev => ({
            ...prev,
            [filterType]: updatedCategory
        }))

        searchParams.set(`${filterType}`, updatedCategory.join(','))
        setSearchParams(searchParams)
    }

    useEffect(() => {
        async function fetchFilteredCourses() {
            const response = await getAllCourses(searchParams); // or your query object
            setCourseData(response.courses);
            // setstudentBoughtCoursesData(response.boughtCourses)
            console.log(response)
        }

        fetchFilteredCourses();
    }, [searchParams]);


    useEffect(() => {
        const categoryQuery = searchParams.get("category")?.split(',') || []
        const levelQuery = searchParams.get("level")?.split(',') || []
        const languageQuery = searchParams.get("language")?.split(',') || []

        setSelectedCategories({
            category: categoryQuery,
            level: levelQuery,
            language: languageQuery
        })
    }, [searchParams])


    // useEffect(() => {
    //     console.log("selected checkbox :", selectedCategories)
    // }, [selectedCategories])

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
                <div >
                    <div>
                        <h1>CATEGORY</h1>
                        {
                            courseCategories.map(category => (
                                <div key={category.id} className='flex items-center'>
                                    <Checkbox id={category.id} className='h-5 w-5 mr-2 border border-b-blue-200 rounded-sm shadow-[0_2px_6px_rgba(0,0,0,0.2)]'
                                        checked={selectedCategories.category.includes(category.id)}
                                        onCheckedChange={checked => handleCheck({ checked, filterType: "category", value: category.id })}
                                    />
                                    {category.label}
                                </div>

                            ))
                        }
                    </div>
                    <div>
                        <h1>LEVEL</h1>
                        {
                            courseLevelOptions.map((category, index) => (
                                <div key={index}>
                                    <Checkbox id={category.id} className='h-5 w-5 mr-2 border border-b-blue-200 rounded-sm shadow-[0_2px_6px_rgba(0,0,0,0.2)]'
                                        checked={selectedCategories.level.includes(category.id)}
                                        onCheckedChange={checked => handleCheck({ checked, filterType: "level", value: category.id })}
                                    />
                                    {category.label}
                                </div>
                            ))
                        }
                    </div>
                    <div>
                        <h1>PRIMARY LANGUAGE</h1>
                        {
                            languageOptions.map((category, index) => (
                                <div key={index}>
                                    <Checkbox id={category.id} className='h-5 w-5 mr-2 border border-b-blue-200 rounded-sm shadow-[0_2px_6px_rgba(0,0,0,0.2)]'
                                        checked={selectedCategories.language.includes(category.id)}
                                        onCheckedChange={checked => handleCheck({ checked, filterType: "language", value: category.id })}
                                    />
                                    {category.label}
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div>
                    {
                        courseData && courseData.length > 0 ? (
                            courseData.map((data, index) => (
                                <DisplayCourseData courseData={data} key={index} />
                            ))
                        ) : (
                            // fallback skeleton cards
                            <div className="flex flex-col gap-5 w-full p-5" >
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="rounded-xl shadow p-4 border flex flex-col gap-2 w-[300px]"
                                    >
                                        <Skeleton className="h-36 w-full" />
                                        <Skeleton className="h-4 w-3/4" />
                                        <Skeleton className="h-4 w-1/2" />
                                        <Skeleton className="h-4 w-1/4" />
                                    </div>
                                ))}
                            </div>
                        )
                    }

                </div>
            </div>
        </div>


    )
}

export default StudentViewCourses
