import { getBoughtCourses } from "@/indexedDB/indexedDB";
import { createContext, useEffect, useState } from "react";

export const StudentContext = createContext(null)

export default function StudentProvider({ children }) {

    const [studentBoughtCoursesData, setstudentBoughtCoursesData] = useState([])

    useEffect(() => {
        async function fetchCourseData() {
            const response = await getBoughtCourses()
            console.log("RES: ", response)
            setstudentBoughtCoursesData(response)
        }
        fetchCourseData()
    }, [])
    return <StudentContext.Provider value={{ studentBoughtCoursesData, setstudentBoughtCoursesData }}>{children}</StudentContext.Provider>
}